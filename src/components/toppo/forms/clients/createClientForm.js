import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Card, Row, Col } from '@themesberg/react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../config/axios';
import { simpleAlert } from "../../../alerts/Alerts";
import { Context } from "../../../../context/Context";

export const CreateClientForm = () => {
    const navigate = useNavigate();
    const [auth] = useContext(Context);
    const [cities, setCities] = useState({});
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [priceList, setPriceList] = useState([]);
    const [selectedPriceList, setSelectedPriceList] = useState('');

    const [seller, setSeller] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
  
    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const [formData, setFormData] = useState({
        user_id: auth.id,
        first_name: '',
        last_name: '',
        identification: '',
        password: '',
        confirm_password: '',
        email: '',
        phone: '',
        address: '',
        department: '',
        city: '',
        price_list_id: '',
        seller_id: ''
    });

    useEffect(() => {
        setPasswordsMatch(formData.password === formData.confirm_password);
    }, [formData.password, formData.confirm_password]);

    useEffect(() => {
        axios.get(`/city/list`).then(({ data }) => {
            setDepartments(Object.keys(data.rows));
            setCities(data.rows);
        }).catch(console.error);
    }, []);

    useEffect(() => {
        axios.get(`/pricelist/list/user/${auth.id}`).then(({ data }) => {
            setPriceList(data.rows); // ✅ Guardamos las listas de precios correctamente
        }).catch(console.error);
    }, []);

    useEffect(() => {
        axios.get(`/seller/list/user/${auth.id}`).then(({ data }) => {
            setSeller(data.rows); // ✅ Guardamos las listas de precios correctamente
        }).catch(console.error);
    }, []);

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

    const handlePriceListChange = ({ target: { value } }) => {
        setSelectedPriceList(value);
        setFormData(prev => ({ ...prev, price_list_id: Number(value) })); // ✅ Convertimos a número
    };

    const handleSellerChange = ({ target: { value } }) => {
        setSelectedSeller(value);
        setFormData(prev => ({ ...prev, seller_id: Number(value) })); // ✅ Convertimos a número
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        if (!passwordsMatch) {
            simpleAlert('Error', 'Las contraseñas no coinciden', 'danger');
            return; // No envía el formulario si las contraseñas no coinciden
        }

        try {
            await axios.post('/client/create', formData);
            simpleAlert('Éxito', 'success', 'Cliente creado con éxito');
            navigate('/dashboard/clients');

        } catch (error) {
            simpleAlert('Error', 'error', 'Hubo un problema al crear el cliente');
        }
    };

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="firstName">
                                <Form.Label>Nombre <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="Ingresa el nombre"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="lastName">
                                <Form.Label>Apellido <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="Ingresa los apellidos"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="identification">
                                <Form.Label>Identificación <span className="text-danger">*</span> </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="identification"
                                    required
                                    placeholder="Ingresa el número de identificación"
                                    value={formData.identification}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="email">
                                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Ingresa el correo electrónico"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="phone">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    placeholder="Ingresa el número telefónico"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="address">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder="Ingresa la dirección"
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
                    {/* Agregamos el Select para listas de precios */}
                    <Row>
                        <Col sm={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>Lista de Precios <span className="text-danger">*</span> </Form.Label>
                                <Form.Select value={selectedPriceList} onChange={handlePriceListChange} required>
                                    <option value="">Seleccione una lista de precios</option>
                                    {priceList.map((price) => (
                                        <option key={price.id} value={price.id}>
                                            {price.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>Vendedores</Form.Label>
                                <Form.Select value={selectedSeller} onChange={handleSellerChange}>
                                    <option value="">Seleccione un vendedor</option>
                                    {seller.map((seller) => (
                                        <option key={seller.id} value={seller.id}>
                                            {seller.billing_first_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="password">
                                <Form.Label>Contraseña <span className="text-danger">*</span></Form.Label>
                                <div className="input-group">
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Ingresa la contraseña"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button variant="outline-secondary" onClick={toggleShowPassword}>
                                        {showPassword ? "Ocultar" : "Mostrar"}
                                    </Button>
                                </div>
                            </Form.Group>
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Group controlId="confirm_password">
                                <Form.Label>Confirmar Contraseña <span className="text-danger">*</span></Form.Label>
                                <div className="input-group">
                                    <Form.Control
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirm_password"
                                        placeholder="Confirma la contraseña"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button variant="outline-secondary" onClick={toggleShowConfirmPassword}>
                                        {showConfirmPassword ? "Ocultar" : "Mostrar"}
                                    </Button>
                                </div>
                                {!passwordsMatch && <Form.Text className="text-danger">Las contraseñas no coinciden</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="mt-3">
                        <Button variant="primary" type="submit" className="w-100">Crear Usuario</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};
