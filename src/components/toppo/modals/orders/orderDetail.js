import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Row, Col, Card, Image } from "@themesberg/react-bootstrap";
import { Context } from "../../../../context/Context";
import axios from "../../../../config/axios";
import { formatDate } from '../../../utils/format-time';

export const OrderDetailModal = ({ show, handleClose, selectedId }) => {
    const { auth } = useContext(Context); // Asegúrate de que el 'auth' venga del contexto
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [totalData, setTotalData] = useState(0); // Agregado para almacenar el total de orderos

    console.log(selectedId);

    useEffect(() => {
        if (selectedId) {
            fetchData();
        }
    }, [selectedId]);

    const fetchData = async () => {
        setLoading(true);

        try {
            const { data: response } = await axios.get(`/order/detail`, {
                params: { order_id: selectedId }
            });
            setData(response.rows || []);
            setTotalData(response.total || 0);
        } catch (error) {
            console.error("Error al recuperar los datos:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles del pedido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div>Cargando...</div>
                ) : (
                    <Row>
                        {data.map((order, index) => (
                            <React.Fragment key={index}>
                                {/* Columna de información del order */}
                                <Col sm={12} md={6}>
                                    <p><strong>ID:</strong> {order.order_id}</p>
                                    <p><strong>Ecommerce:</strong> {order.ecommerce_name}</p>
                                    <p><strong>Fecha:</strong> {formatDate(order.date_create)}</p>
                                    <p><strong>Estado:</strong> {order.status}</p>
                                    <p><strong>Total:</strong> {order.order_total}</p>
                                    <p><strong>Cliente:</strong> {order.billing_first_name}  {order.billing_last_name}</p>
                                    <p><strong>Dirección:</strong> {order.billing_address_1},{order.billing_city}, {order.billing_state}</p>
                                </Col>

                                {/* Columna de items */}
                                <Col sm={12} md={6}>
                                    <h5>Ítems de la Orden</h5>
                                    {order.order_items && order.order_items.length > 0 ? (
                                        order.order_items.map((item) => (
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
                                        <p>No hay variantes para este ordero.</p>
                                    )}
                                </Col>
                            </React.Fragment>
                        ))}
                    </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
