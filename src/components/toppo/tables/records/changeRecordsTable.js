import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Card, Table, Dropdown, ButtonGroup, Button, Spinner } from '@themesberg/react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../../../widgets/PaginationComponent';
import { Context } from "../../../../context/Context";
import axios from '../../../../config/axios';
import { OrderDetailModal } from '../../modals/orders/orderDetail';
import { getFieldLabel, getStatusLabel } from '../../../utils/format-text';
import { formatDate } from '../../../utils/format-time';

export const ChangeRecordsTable = ({ searchTerm, state }) => {
    const navigate = useNavigate();
    const [auth] = useContext(Context);
    const [data, setData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // Modal
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
                `/sync/list/change/record/user/${auth.id}`,
                {
                    params: { search: searchTerm, state, page, limit }
                }
            );
            setData(response.rows || []);
            setTotalData(response.total || 0);
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

    const TableRow = ({ id, field, state, oldValue, newValue, createdAt, product }) => (
        <tr>
            <td><span className="fw-normal">{id}</span></td>
            <td><span className="fw-normal">{getFieldLabel(field)}</span></td>
            <td><span className="fw-normal">{getStatusLabel(state)}</span></td>
            <td><span className="fw-normal">{oldValue}</span></td>
            <td><span className="fw-normal">{newValue}</span></td>
            <td><span className="fw-normal">{formatDate(createdAt)}</span></td>
            <td><span className="fw-normal">{product?.variants?.[0]?.sku}</span></td>
            <td><span className="fw-normal">{product?.title?.slice(0, 10)}{product?.title?.length > 10 ? '...' : ''}</span></td>
            <td>
                <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                        <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleShowDetails(id)} >
                            <FontAwesomeIcon icon={faEye} className="me-2" /> Detalles
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
                                    <th className="border-bottom">ID</th>
                                    <th className="border-bottom">Campo</th>
                                    <th className="border-bottom">Estado</th>
                                    <th className="border-bottom">Valor Anterior</th>
                                    <th className="border-bottom">Nuevo Valor</th>
                                    <th className="border-bottom">Fecha</th>
                                    <th className="border-bottom">SKU</th>
                                    <th className="border-bottom">Título</th>
                                    <th className="border-bottom">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map(item => <TableRow key={item.id} {...item} />)
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">No se encontraron registros que coincidan con la búsqueda.</td>
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
                        Mostrando <b>{Math.min((page - 1) * limit + 1, totalData)}-{Math.min(page * limit, totalData)}</b> de un total de <b>{totalData}</b> registros
                    </small>
                </Card.Footer>
            </Card>
            <OrderDetailModal show={showDefault} handleClose={handleClose} selectedId={selectedId} />
        </>
    );
};

export default ChangeRecordsTable;
