import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Row, Col, Card, Image } from "@themesberg/react-bootstrap";
import { Context } from "../../../../context/Context";
import axios from "../../../../config/axios";
import { formatDate } from '../../../utils/format-time';

export const ClientDetailModal = ({ show, handleClose, selectedId }) => {
    const { auth } = useContext(Context); // Asegúrate de que el 'auth' venga del contexto
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [totalData, setTotalData] = useState(0);

    console.log(selectedId);

    useEffect(() => {
        if (selectedId) {
            fetchData();
        }
    }, [selectedId]);

    const fetchData = async () => {
        setLoading(true);

        try {
            const { data: response } = await axios.get(`/client/detail`, {
                params: { client_id: selectedId }
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
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalles del cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div>Cargando...</div>
                ) : (
                    <Row>
                        {data.map((client, index) => (
                            <React.Fragment key={index}>
                                {/* Columna de información del client */}
                                <Col sm={12} md={6}>
                                    <p><strong>Nombre:</strong> {client.billing_first_name}</p>
                                    <p><strong>Email:</strong> {client.billing_email}</p>
                                    <p><strong>Dirección:</strong> {client.billing_address_1}</p>
                                    <p><strong>Departamento:</strong> {client.billing_state}</p>
                                    <p><strong>Ciudad:</strong> {client.billing_city}</p>

                                </Col>

                                {/* Columna de items */}
                                <Col sm={12} md={6}>
                                    <p><strong>Apellido:</strong> {client.billing_last_name}</p>
                                    <p><strong>Teléfono:</strong> {client.billing_phone}</p>
                                    <p><strong>Lista de precios:</strong> {client.price_list_id} - {client.price_list_name}</p>
                                    <p><strong>Vendedor:</strong>
                                        {client.seller_id === 0 || !client.seller_name ? (
                                            <span style={{ color: "red", fontWeight: "bold" }}> No asignado</span>
                                        ) : (
                                            <> {client.seller_id} - {client.seller_name}</>
                                        )}
                                    </p>

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
