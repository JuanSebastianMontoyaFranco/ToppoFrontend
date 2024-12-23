import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faExclamationTriangle, faEdit, faEllipsisH, faEye, faTrashAlt, faSave, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Table, Dropdown, Pagination, ButtonGroup, Button, Spinner } from '@themesberg/react-bootstrap';
import { useNavigate } from 'react-router-dom';
import OrderDetailModal from '../modals/order/OrderDetailModal';

import PaginationComponent from '../../widgets/PaginationComponent';
import { Context } from "../../../context/Context";
import axios from '../../../config/axios';

import odooLogo from '../../../assets/img/logos/odoo-logo.png';
import shopifyLogo from '../../../assets/img/logos/shopify-logo.webp';
import toppoLogo from '../../../assets/img/logos/toppo-logo.png';

export const OrdersTable = ({ searchTerm, filterState }) => {
    const navigate = useNavigate();
    const [auth] = useContext(Context);

    const [products, setOrders] = useState([]);
    const [totalOrders, settotalOrders] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [showDefault, setShowDefault] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const itemsPerPage = 100;


    const fetchOrders = async (user_id, currentPage, itemsPerPage, searchTerm) => {
        setLoading(true);
        try {

            let url = `order/list/user/${user_id}?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`;

            if (filterState && filterState !== "Todos") {
                url += `&filterState=${filterState}`;
            }
            const response = await axios.get(url);
            const fetchedOrders = response.data.rows;

            if (fetchedOrders.length === 0) {
                setOrders([]);
            } else {
                setOrders(fetchedOrders);
            }
            settotalOrders(response.data.total);
        } catch (error) {
            console.error("Error fetching products:", error);
            setOrders([]); // Limpiar el estado si ocurre un error
        } finally {
            setLoading(false); // Finalizar carga
        }
    };


    useEffect(() => {
        if (auth && auth.user_id) {
            fetchOrders(auth.user_id, page, itemsPerPage, searchTerm, filterState);
        }
    }, [page, searchTerm, filterState, auth]);


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalOrders / itemsPerPage)) {
            setPage(newPage);
        }
    };

    const handleClose = () => {
        setShowDefault(false);
        setSelectedId(null); // Restablece el ID seleccionado cuando se cierra el modal
    };

    const handleShowDetails = (order_id) => {
        setSelectedId(order_id); // Establece el ID seleccionado
        setShowDefault(true); // Muestra el modal
    };

    const handleEditOrder = (order_id) => {
        navigate(`/dashboard/orders/edit/${order_id}`);
    };

    const TableRow = (props) => {
        const { order_id, ecommerce_name, ecommerce_reference, state, date_create, billing_first_name, billing_last_name, billing_email, order_total } = props;

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        };

        const getStateIcon = (state_toppo) => {
            switch (state_toppo) {
                case 1:
                    return <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} title="Aprobado" />;
                case 2:
                    return <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} title="Rechazado" />;
                case 3:
                    return <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'orange' }} title="Alerta/Corrección" />;
                default:
                    return <FontAwesomeIcon icon={faHourglassHalf} style={{ color: 'gray' }} title="Pendiente" />;
            }
        };
        return (
            <tr>
                <td>
                    {ecommerce_reference === "shopify" ? (
                        <img src={shopifyLogo} alt="SHOPIFY" style={{ width: '20px', height: '20px' }} />
                    )
                        : ecommerce_reference === "Toppo" ? (
                            <img src={toppoLogo} alt="Toppo" style={{ width: '20px', height: '20px' }} />
                        ) : ecommerce_reference === "odoo" ? (
                            <img src={odooLogo} alt="ODOO" style={{ width: '20px', height: '20px' }} />
                        ) : (
                            <span className="fw-normal">
                                {ecommerce_reference}
                            </span>
                        )}
                </td>
                <td>
                    <span className="fw-normal">
                        {getStateIcon(state)}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {order_id}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {ecommerce_name}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {formatDate(date_create)} {/* Usamos la función formatDate */}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {billing_first_name} {billing_last_name}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {billing_email}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {order_total}
                    </span>
                </td>
                <td>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0" style={{ paddingRight: "20px" }}>
                            <span className="icon icon-sm">
                                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleShowDetails(order_id)}>
                                <FontAwesomeIcon icon={faEye} className="me-2" /> Detalles
                            </Dropdown.Item>
                            {state !== 1 && (
                                <Dropdown.Item onClick={() => handleEditOrder(order_id)}>
                                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        );
    };

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    {loading ? ( // Condición para mostrar el spinner
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px', width: '100%' }}>
                            <Spinner animation="border" role="status" />
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    ) : (
                        <Table hover className="catalog-table align-items-center">
                            <thead>
                                <tr>
                                    <th className="border-bottom">Desde</th>
                                    <th className="border-bottom">Estado</th>
                                    <th className="border-bottom">ID</th>
                                    <th className="border-bottom">Referencia Ecommerce</th>
                                    <th className="border-bottom">Fecha</th>
                                    <th className="border-bottom">Nombre</th>
                                    <th className="border-bottom">Email</th>
                                    <th className="border-bottom">Total</th>
                                    <th className="border-bottom">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.length > 0 ? (
                                    products.map(product => <TableRow key={product.id} {...product} />)
                                ) : (
                                    <tr>
                                        <td colSpan="12" className="text-center mt-6">
                                            No se encontraron órdenes que coincidan con la búsqueda.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <Nav>
                        <PaginationComponent
                            currentPage={page}
                            totalItems={totalOrders}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                        />
                    </Nav>
                    <small className="fw-bold">
                        Mostrando <b>{(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, totalOrders)}</b> de un total de <b>{totalOrders}</b> órdenes
                    </small>
                </Card.Footer>
            </Card>
            <OrderDetailModal show={showDefault} handleClose={handleClose} selectedId={selectedId} />
        </>
    );
};