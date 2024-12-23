import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Row, Col, Card, Form } from '@themesberg/react-bootstrap';
import { Context } from "../../../../context/Context";
import axios from "../../../../config/axios";
import { useNavigate, useParams, Link } from 'react-router-dom';

const OrderDetailModal = ({ show, handleClose, selectedId }) => {
    const [auth] = useContext(Context);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            if (selectedId) {
                try {
                    const response = await axios.get(`/order/detail/${selectedId}`);
                    const fetchedDetails = response.data.rows ? response.data.rows[0] : null;
                    fetchedDetails.date_create = new Date(fetchedDetails.date_create)
                        .toLocaleString('en-CA', { timeZone: 'UTC', hour12: false })
                        .replace(',', '');
                    setDetails(fetchedDetails);
                } catch (error) {
                    console.error("Error fetching details:", error);
                }
            }
        };

        fetchDetails();
    }, [selectedId]);

    return (
        <Modal as={Modal.Dialog} centered show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title className="h6">Detalles de la Orden</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={handleClose} />
            </Modal.Header>
            <Modal.Body>
                {details ? (
                    <Row>
                        {/* Columna 1: Información de la orden */}
                        <Col md={6}>
                            <h5>Información de la Orden</h5>
                            <p><strong>ID:</strong> {details.order_id}</p>
                            <p><strong>Ecommerce:</strong> {details.ecommerce_name} ({details.ecommerce_reference})</p>
                            <p><strong>Fecha de Creación:</strong> {details.date_create}</p>
                            <p><strong>Estado del Pago:</strong> {details.payment}</p>
                            <p><strong>Total:</strong> ${details.order_total}</p>
                            <p><strong>Cliente:</strong> {details.billing_first_name} {details.billing_last_name}</p>
                            <p><strong>Dirección:</strong> {details.billing_address_1}, {details.billing_city}, {details.billing_state}</p>
                        </Col>

                        {/* Columna 2: Ítems de la orden */}
                        <Col md={6}>
                            <h5>Ítems de la Orden</h5>
                            {details.order_items && details.order_items.length > 0 ? (
                                details.order_items.map(item => (
                                    <Card key={item.id} className="mb-3 card-highlight">
                                        <Card.Body>
                                            <Card.Title className="text-primary">{item.item_name}</Card.Title>
                                            <Card.Text>
                                                <strong>SKU:</strong> {item.sku}<br />
                                                <strong>Cantidad:</strong> {item.qty}<br />
                                                <strong>Total:</strong> ${item.line_total_2}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p>No hay ítems en esta orden.</p>
                            )}
                        </Col>
                    </Row>
                ) : (
                    <p>Cargando detalles...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                {(auth.role === 'admin' || auth.role === 'seller') && (

                    <Form.Group>
                        <Form.Control as="select">
                            <option value={1}>Aprobada</option>
                            <option value={2}>Rechazada</option>
                            <option value={3}>Pendiente de Corregir</option>
                        </Form.Control>
                    </Form.Group>
                )}
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderDetailModal;
