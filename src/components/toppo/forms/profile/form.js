import React, { useContext, useState, useEffect } from "react";
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import { Context } from "../../../../context/Context";
import axios from '../../../../config/axios';
import { simpleAlert } from "../../../alerts/Alerts";

export const ProfileForm = () => {
  const [auth, saveAuth] = useContext(Context);
  const [cities, setCities] = useState({});
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(auth?.department || '');
  const [selectedCity, setSelectedCity] = useState(auth?.city || '');

  const [formData, setFormData] = useState({
    identification: '',
    first_name: auth?.first_name || '',
    last_name: auth?.last_name || '',
    user_id: auth?.userId || '',
    email: auth?.email || '',
    id: auth?.id || '',
    phone: auth?.phone || '',
    address: auth?.address || '',
    department: auth?.department || '',
    city: auth?.city || ''
  });

  
  useEffect(() => {
    axios.get(`/city/list`).then(({ data }) => {
      setDepartments(Object.keys(data.rows));
      setCities(data.rows);
    }).catch(console.error);
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = ({ target: { value } }) => {
    setSelectedDepartment(value);
    setSelectedCity('');
    setFormData(prev => ({ ...prev, department: value, city: '' }));
  };

  const handleCityChange = ({ target: { value } }) => {
    setSelectedCity(value);
    setFormData(prev => ({ ...prev, city: value }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/user/update/user/${auth.id}`, formData);
      saveAuth(prev => ({ ...prev, ...formData }));
      simpleAlert("Guardado", "success", "La tienda se ha actualizado correctamente");
    } catch (error) {
      console.error('Error actualizando los datos:', error);
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Información General</h5>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingresa el nombre"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingresa el apellido"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@company.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="+12-345 678 910"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="phone">
                <Form.Label>Identificación</Form.Label>
                <Form.Control
                  type="text"
                  name="identification"
                  placeholder="Identificación"
                  value={formData.identification || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Dirección</h5>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingresa tu dirección"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Departamento</Form.Label>
                <Form.Select value={selectedDepartment} onChange={handleDepartmentChange}>
                  <option value="">Seleccione un departamento</option>
                  {departments.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Ciudad</Form.Label>
                <Form.Select value={selectedCity} onChange={handleCityChange} disabled={!selectedDepartment}>
                  <option value="">Seleccione una ciudad</option>
                  {selectedDepartment && cities[selectedDepartment]?.map((cityObj, index) => (
                    <option key={index} value={cityObj.city}>
                      {cityObj.city}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit" className="w-100">Guardar</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
