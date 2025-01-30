import React, { useContext, useState, useEffect } from "react";
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import { Context } from "../../../../context/Context";
import axios from '../../../../config/axios';

export const ProfileForm = () => {
  const [auth] = useContext(Context);
  const [cities, setCities] = useState({});
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [formData, setFormData] = useState({
    billing_first_name: '',
    billing_last_name: '',
    billing_email: '',
    billing_id: '',
    billing_phone: '',
    billing_address_1: '',
    department: '',
    city: '',
  });

  // Actualizar formData cuando auth cambie
  useEffect(() => {
    if (auth) {
      setFormData({
        billing_first_name: auth.first_name || '',
        billing_last_name: auth.last_name || '',
        billing_email: auth.email || '',
        billing_id: auth.id || '',
        billing_phone: auth.phone || '',
        billing_address_1: auth.address || '',
        department: auth.department || '',
        city: auth.city || '',
      });
    }
  }, [auth]);

  // Obtener lista de ciudades y departamentos
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`/city/list`);
        const citiesData = response.data;
        setDepartments(Object.keys(citiesData));
        setCities(citiesData);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      //const response = await axios.put(`/wholesale/update/store/${auth.store_id}`, formData);
      //console.log('Datos actualizados:', response.data);
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
                  name="billing_first_name"
                  value={formData.billing_first_name}
                  onChange={handleInputChange}
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
                  name="billing_last_name"
                  value={formData.billing_last_name}
                  onChange={handleInputChange}
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
                  name="billing_email"
                  value={formData.billing_email}
                  onChange={handleInputChange}
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
                  name="billing_phone"
                  value={formData.billing_phone}
                  onChange={handleInputChange}
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
                  name="billing_address_1"
                  value={formData.billing_address_1}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Departamento</Form.Label>
                <Form.Select 
                  id="department" 
                  name="department"
                  value={formData.department} 
                  onChange={handleSelectChange}
                >
                  <option value="">Seleccione un departamento</option>
                  {departments.map((dep, index) => (
                    <option key={index} value={dep}>{dep}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={6} className="mb-3">
              <Form.Group id="city">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control 
                  required 
                  type="text" 
                  placeholder="Ciudad" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
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
