import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faExclamationTriangle, faEdit, faEllipsisH, faEye, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Card, Table, Dropdown, Pagination, ButtonGroup, Button, Spinner } from '@themesberg/react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../../../widgets/PaginationComponent';
import { Context } from "../../../../context/Context";
import axios from '../../../../config/axios';
import { OrderDetailModal } from '../../modals/orders/orderDetail';
import { formatDate } from '../../../utils/format-time';
import { getEcommerceReferenceIcon, getStateIcon } from '../../../utils/format-icons';

export const OrdersTable = ({ searchTerm, state }) => {
    const navigate = useNavigate();
    const [auth] = useContext(Context);
    const [data, setData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    //Modal
    const [showDefault, setShowDefault] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const limit = 50;

    useEffect(() => {
        if (auth?.id) {
            fetchData();
        }
    }, [auth, searchTerm, state, page]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: response } = await axios.get(
                `/order/list/user/${auth.id}`,
                {
                    params: { search: searchTerm, state, page, limit }
                }
            );
            setData(response.rows || []);
            setTotalData(response.total || 0);

            const products = response.rows || [];
            console.log(products);

        } catch (error) {
            console.error("Error al recuperar los datos:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalData / limit)) {
            setPage(newPage);
        }
    };

    const handleEdit = (order_id) => navigate(`/dashboard/orders/edit/${order_id}`);

    const handleShowDetails = (id) => {
        setSelectedId(id);
        setShowDefault(true);
    };

    const handleClose = () => {
        setShowDefault(false);
        setSelectedId(null); // Restablece el ID seleccionado cuando se cierra el modal
    };

    const TableRow = ({ ecommerce_reference, order_id, state, ecommerce_name, date_create, billing_first_name, billing_last_name, billing_email, order_total }) => (
        <tr>
            <td>{getEcommerceReferenceIcon(ecommerce_reference)}</td>
            <td>{getStateIcon(state)}</td>
            <td><span className="fw-normal">{order_id}</span></td>
            <td><span className="fw-normal">{ecommerce_name}</span></td>
            <td>{formatDate(date_create)}</td>
            <td><span className="fw-normal">{billing_first_name} {billing_last_name}</span></td>
            <td><span className="fw-normal">{billing_email}</span></td>
            <td><span className="fw-normal">{order_total}</span></td>
            <td>
                <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                        <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleShowDetails(order_id)} >
                            <FontAwesomeIcon icon={faEye} className="me-2" /> Detalles
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEdit(order_id)}>
                            <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    );

    return (
        <>

            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                            <Spinner animation="border" role="status" />
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    ) : (
                        <Table hover className="align-items-center">
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
                                {data.length > 0 ? (
                                    data.map(item => <TableRow key={item.id} {...item} />)
                                ) : (
                                    <tr>
                                        <td colSpan="12" className="text-center">No se encontraron pedidos que coincidan con la búsqueda.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <PaginationComponent
                        currentPage={page}
                        totalItems={totalData}
                        limit={limit}
                        onPageChange={handlePageChange}
                    />
                    <small className="fw-bold">
                        Mostrando <b>{Math.min((page - 1) * limit + 1, totalData)}-{Math.min(page * limit, totalData)}</b> de un total de <b>{totalData}</b> productos
                    </small>
                </Card.Footer>
            </Card>
            <OrderDetailModal show={showDefault} handleClose={handleClose} selectedId={selectedId} />
        </>
    );
};

export default OrdersTable;
