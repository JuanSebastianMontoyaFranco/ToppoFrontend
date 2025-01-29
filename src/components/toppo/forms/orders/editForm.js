import React, { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col } from '@themesberg/react-bootstrap';
import axios from '../../../../config/axios';
import { simpleAlert } from "../../../alerts/Alerts";
import { useLocation, useNavigate, Link } from "react-router-dom";

export const OrderEditForm = ({ orderId }) => {
    const navigate = useNavigate();
    const [cities, setCities] = useState({});
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedShippingDepartment, setSelectedShippingDepartment] = useState('');
    const [selectedShippingCity, setSelectedShippingCity] = useState('');

    const [orderData, setOrderData] = useState({
        billing_id: '',
        billing_state: '',
        billing_format_city: '',
        shipping_state: '',
        shipping_format_city: '',
        state: 0
    });

    const [updatedOrderData, setUpdatedOrderData] = useState({});

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`order/detail/`,
                    {
                        params: { order_id: orderId }
                    }
                );

                if (response.data.rows.length > 0) {
                    const order = response.data.rows[0];
                    setOrderData(order);
                    setSelectedDepartment(order.billing_state || '');
                    setSelectedCity(order.billing_format_city || '');
                    setSelectedShippingDepartment(order.shipping_state || '');
                    setSelectedShippingCity(order.shipping_format_city || '');
                }
            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        };

        if (orderId) {
            fetchOrderData();
        }
    }, [orderId]);

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

    const handleCityChange = (event, type) => {
        const value = event.target.value;
        if (type === 'billing') {
            setSelectedCity(value);
            setUpdatedOrderData((prev) => ({ ...prev, billing_format_city: value }));
        } else {
            setSelectedShippingCity(value);
            setUpdatedOrderData((prev) => ({ ...prev, shipping_format_city: value }));
        }
    };


    const handleDepartmentChange = (event, type) => {
        const value = event.target.value;
        if (type === 'billing') {
            setSelectedDepartment(value);
            setSelectedCity(''); // Limpiar ciudad al cambiar departamento
            setUpdatedOrderData((prev) => ({ ...prev, billing_state: value, billing_format_city: '' }));
        } else {
            setSelectedShippingDepartment(value);
            setSelectedShippingCity(''); // Limpiar ciudad de envío
            setUpdatedOrderData((prev) => ({ ...prev, shipping_state: value, shipping_format_city: '' }));
        }
    };


    const handleInputChange = (field, value) => {
        setUpdatedOrderData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...updatedOrderData,
                state: 0,
                code: 999,
                message: 'Sin Procesar'
            };
            await axios.put(`/order/modify/${orderId}`, dataToSend);
            console.log("Datos enviados al backend:", dataToSend);
            simpleAlert('Actualizado', 'success', 'Orden correctamente actualizada');
            navigate('/dashboard/orders')
        } catch (error) {
            console.error("Error updating order:", error);
            simpleAlert('Error', 'error', error.response?.data?.message || "Error al actualizar la orden");
        }
    };

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        {/* Columna de Datos Originales */}
                        <Col md={6}>
                            <h4 className="text-center mb-4">Datos Originales</h4>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Identificación</Form.Label>
                                <div className="border p-2 rounded bg-light">
                                    {orderData.billing_id || "Sin datos"}
                                </div>
                            </Form.Group>
                            <h6>Facturación</h6>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Departamento de facturación</Form.Label>
                                <div className="border p-2 rounded bg-light">
                                    {orderData.billing_state || "Sin datos"}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Ciudad de facturación</Form.Label>
                                <div className="border p-2 rounded bg-light">
                                    {orderData.billing_format_city || "Sin datos"}
                                </div>
                            </Form.Group>
                            {/* Mostrar sección de envío solo si los datos están disponibles */}
                            {(orderData.shipping_state || orderData.shipping_city) && (
                                <>
                                    <h6>Envío</h6>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Identificación</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updatedOrderData.shipping_id !== undefined ? updatedOrderData.shipping_id : orderData.shipping_id || ''}
                                            onChange={(e) => handleInputChange('shipping_id', e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Departamento de envío</Form.Label>
                                        <div className="border p-2 rounded bg-light">
                                            {orderData.shipping_state || "Sin datos"}
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Ciudad de envío</Form.Label>
                                        <div className="border p-2 rounded bg-light">
                                            {orderData.shipping_format_city || "Sin datos"}
                                        </div>
                                    </Form.Group>
                                </>
                            )}
                        </Col>

                        {/* Columna de Datos a Cambiar */}
                        <Col md={6}>
                            <h4 className="text-center mb-4">Datos a Cambiar</h4>
                            <Form.Group className="mb-3">
                                <Form.Label>Identificación</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={updatedOrderData.billing_id !== undefined ? updatedOrderData.billing_id : orderData.billing_id || ''}
                                    onChange={(e) => handleInputChange('billing_id', e.target.value)}
                                />

                            </Form.Group>

                            <h6>Facturación</h6>
                            <Form.Group className="mb-3">
                                <Form.Label>Departamento de facturación</Form.Label>
                                <Form.Select value={selectedDepartment} onChange={(e) => handleDepartmentChange(e, 'billing')}>
                                    <option value="">Seleccione un departamento</option>
                                    {departments.map((department, index) => (
                                        <option key={index} value={department}>
                                            {department}
                                        </option>
                                    ))}
                                </Form.Select>

                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Ciudad de facturación</Form.Label>
                                <Form.Select value={selectedCity} onChange={(e) => handleCityChange(e, 'billing')} disabled={!selectedDepartment}>
                                    <option value="">Seleccione una ciudad</option>
                                    {selectedDepartment && cities[selectedDepartment]?.map((cityObj, index) => (
                                        <option key={index} value={cityObj.city}>
                                            {cityObj.city}
                                        </option>
                                    ))}
                                </Form.Select>

                            </Form.Group>
                            {/* Mostrar sección de envío solo si los datos están disponibles */}
                            {(orderData.shipping_state || orderData.shipping_city) && (
                                <>
                                    <h6>Envío</h6>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Identificación de envío</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updatedOrderData.shipping_id !== undefined ? updatedOrderData.shipping_id : orderData.shipping_id || ''}
                                            onChange={(e) => handleInputChange('shipping_id', e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Departamento de envío</Form.Label>
                                        <Form.Select
                                            value={selectedShippingDepartment}
                                            onChange={(e) => handleDepartmentChange(e, 'shipping')}
                                        >
                                            <option value="">Seleccione un departamento</option>
                                            {departments.map((department, index) => (
                                                <option key={index} value={department}>
                                                    {department}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Ciudad de envío</Form.Label>
                                        <Form.Select
                                            value={selectedShippingCity}
                                            onChange={(e) => handleCityChange(e, 'shipping')}
                                            disabled={!selectedShippingDepartment}
                                        >
                                            <option value="">Seleccione una ciudad</option>
                                            {selectedShippingDepartment && cities[selectedShippingDepartment]?.map((cityObj, index) => (
                                                <option key={index} value={cityObj.city}>
                                                    {cityObj.city}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </>
                            )}

                            <div className="text-end">
                                <Button variant="primary" type="submit">Guardar</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};
