import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye } from '@fortawesome/free-solid-svg-icons';
import { Card, Table, Dropdown, Pagination, ButtonGroup, Button, Spinner } from '@themesberg/react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../../widgets/PaginationComponent';
import { Context } from "../../../context/Context";
import axios from '../../../config/axios';

export const CatalogTable = ({ searchTerm, channel, state, product_type, status, sync }) => {
    const navigate = useNavigate();
    const [auth] = useContext(Context);
    const [data, setData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const limit = 10;

    useEffect(() => {
        if (auth?.id) {
            fetchData();
        }
    }, [auth, searchTerm, channel, state, product_type, status, page]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: response } = await axios.get(
                `/product/list/user/${auth.id}`,
                {
                    params: { search: searchTerm, channel, state, product_type, status, page, limit }
                }
            );
            setData(response.rows || []);
            setTotalData(response.total || 0);

            const products = response.rows || [];
            console.log(products);

            sync && sync(products);
            
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

    const handleEdit = (id) => navigate(`/product/edit/${id}`);

    const TableRow = ({ id, title, vendor, product_type, status, variants }) => (
        <tr>
            <td><span className="fw-normal">{id}</span></td>
            <td><span className="fw-normal">{status}</span></td>
            <td><span className="fw-normal">{title}</span></td>
            <td><span className="fw-normal">{product_type}</span></td>
            <td><span className="fw-normal">{vendor}</span></td>
            <td>
                <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                        <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <FontAwesomeIcon icon={faEye} className="me-2" /> Detalles
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEdit(id)}>
                            <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    );

    return (
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
                                <th className="border-bottom">Estado</th>
                                <th className="border-bottom">Nombre</th>
                                <th className="border-bottom">Tipo</th>
                                <th className="border-bottom">Proveedor</th>
                                <th className="border-bottom">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map(item => <TableRow key={item.id} {...item} />)
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No se encontraron productos que coincidan con la búsqueda.</td>
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
    );
};

export default CatalogTable;
