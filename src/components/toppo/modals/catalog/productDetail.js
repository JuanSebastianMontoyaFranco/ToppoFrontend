import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Row, Col, Card, Image } from "@themesberg/react-bootstrap";
import { Context } from "../../../../context/Context";
import axios from "../../../../config/axios";

export const ProductDetailModal = ({ show, handleClose, selectedId }) => {
    const [auth] = useContext(Context); // Asegúrate de que el 'auth' venga del contexto
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [totalData, setTotalData] = useState(0); // Agregado para almacenar el total de productos

    console.log(auth.id);

    useEffect(() => {
        if (selectedId) {
            fetchData();
        }
    }, [selectedId]);

    const fetchData = async () => {
        setLoading(true);

        try {
            const { data: response } = await axios.get(`/product/detail/user/${auth.id}`, {
                params: { product_id: selectedId }
            });
            console.log(response);

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
                <Modal.Title>Detalles del Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div>Cargando...</div>
                ) : (
                    <Row>
                        {data.map((product, index) => (
                            <React.Fragment key={index}>
                                {/* Columna de información del producto */}
                                <Col sm={12} md={6}>
                                    <p><strong>ID:</strong> {product.id}</p>
                                    <p><strong>ID Shopify:</strong> {product.product_id_shopify}</p>
                                    <p><strong>Título:</strong> {product.title}</p>
                                    <p><strong>Tipo:</strong> {product.product_type}</p>
                                    <p><strong>Proveedor:</strong> {product.vendor}</p>
                                    <p><strong>Tags:</strong> {product.tags}</p>
                                </Col>

                                {/* Columna de variantes */}
                                <Col sm={12} md={6}>
                                    <h5>Variantes</h5>
                                    {product.variants && product.variants.length > 0 ? (
                                        product.variants.map((variant) => (
                                            <Card key={variant.id} className="mb-3 card-highlight">
                                                <Row>
                                                    <Image
                                                        src={variant.image_url}
                                                        alt='imagen'
                                                        rounded
                                                        fluid
                                                    />
                                                    <Col md={8}>
                                                        <Card.Body>
                                                            <Card.Text>
                                                                <strong>SKU:</strong> {variant.sku} <br />
                                                                <strong>Precio:</strong>
                                                                {variant.prices && variant.prices.length > 0
                                                                    ? `$${variant.prices[0].price} (${variant.prices[0].currency})`
                                                                    : 'N/A'}
                                                                <br />
                                                                <strong>Precio Comparativo:</strong>
                                                                {variant.prices && variant.prices.length > 0 && variant.prices[0].compare_at_price
                                                                    ? `$${variant.prices[0].compare_at_price} (${variant.prices[0].currency})`
                                                                    : 'N/A'}
                                                                <br />
                                                                <strong>Lista de Precios:</strong>
                                                                {variant.prices && variant.prices.length > 0
                                                                    ? variant.prices[0].price_list.name
                                                                    : 'No disponible'}
                                                                    <br/>
                                                                <strong>Stock:</strong> {variant.inventory_quantity} <br />
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
