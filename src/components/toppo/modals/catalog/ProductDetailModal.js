import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Row, Col, Card, Form, Image } from "@themesberg/react-bootstrap";
import { Context } from "../../../../context/Context";
import axios from "../../../../config/axios";

const ProductDetailModal = ({ show, handleClose, selectedId }) => {
    const [auth] = useContext(Context);
    const [details, setDetails] = useState(null);

    // Obtener detalles del producto
    useEffect(() => {
        const fetchDetails = async () => {
            if (selectedId) {
                try {
                    const response = await axios.get(`/product/detail/${selectedId}`);
                    const fetchedDetails = response.data.rows ? response.data.rows[0] : null;
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
                <Modal.Title className="h6">Detalles del Producto</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={handleClose} />
            </Modal.Header>
            <Modal.Body>
                {details ? (
                    <Row>
                        {/* Información del producto */}
                        <Col md={6}>
                            <h5>Información del Producto</h5>
                            <p>ID: {details.id}</p>
                            <p>ID Shopify: {details.product_id_shopify}</p>
                            <p>
                                <strong>Título:</strong> {details.title}
                            </p>
                            <p>
                                <strong>Tipo:</strong> {details.product_type}
                            </p>
                            <p>
                                <strong>Proveedor:</strong> {details.vendor}
                            </p>
                            <p>
                                <strong>Tags:</strong> {details.tags}
                            </p>
                        </Col>

                        {/* Variantes */}
                        <Col md={6}>
                            <h5>Variantes</h5>
                            {details.variants && details.variants.length > 0 ? (
                                details.variants.map((variant) => (
                                    <Card key={variant.id} className="mb-3 card-highlight">
                                        <Row>
                                            <Image
                                                src={variant.image_url}
                                                alt={variant.title}
                                                rounded
                                                fluid
                                            />
                                            <Col md={8}>
                                                <Card.Body>
                                                    <Card.Text>
                                                        <strong>SKU:</strong> {variant.sku} <br />
                                                        <strong>Precio:</strong> ${variant.price / 100} <br />
                                                        <strong>Stock:</strong> {variant.inventory_quantity} unidades<br />
                                                        <strong>Barcode:</strong> {variant.barcode}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))
                            ) : (
                                <p>No hay variantes para este producto.</p>
                            )}
                        </Col>
                    </Row>
                ) : (
                    <p>Cargando detalles...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                {/* Opciones solo visibles para admin o seller */}
                {(auth.role === "admin" || auth.role === "seller") && (
                    <Form.Group>
                        <Form.Control as="select">
                            <option value={1}>Aprobada</option>
                            <option value={2}>Rechazada</option>
                            <option value={3}>Pendiente de Corregir</option>
                        </Form.Control>
                    </Form.Group>
                )}
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductDetailModal;
