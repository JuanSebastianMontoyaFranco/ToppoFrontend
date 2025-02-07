import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Spinner } from '@themesberg/react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../../../context/Context";
import axios from '../../../../config/axios';
import { ProductDetailModal } from '../../modals/catalog/productDetail';
import PaginationComponent from '../../../widgets/PaginationComponent';
import { truncateText } from '../../../utils/format-text';

import placeholderImage from '../../../../assets/img/placeholders/placeholder-image.png';

export const CatalogCard = ({ searchTerm, channel, state, product_type, status, sync }) => {
    const navigate = useNavigate();
    const [auth] = useContext(Context);
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalData, setTotalData] = useState(0);

    // Modal
    const [showDefault, setShowDefault] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const limit = 50;

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

    const handleEdit = (id) => navigate(`/product/edit/${id}`);

    const handleShowDetails = (id) => {
        setSelectedId(id);
        setShowDefault(true);
    };

    const handleClose = () => {
        setShowDefault(false);
        setSelectedId(null); // Restablece el ID seleccionado cuando se cierra el modal
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalData / limit)) {
            setPage(newPage);
        }
    };

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <div className="card-grid" style={{ paddingTop: '20px' }}>
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                                <Spinner animation="border" role="status" />
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        ) : (
                            <div className="row">
                                {data.length > 0 ? (
                                    data.map(item => (
                                        <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
                                            <Card className="shadow-sm">
                                                <Card.Img
                                                    variant="top"
                                                    src={item.variants?.[0]?.images?.length > 0 ? item.variants[0].images[0] : placeholderImage}
                                                    alt={item.title}
                                                    onError={(e) => e.target.src = placeholderImage} // Si hay error, usa el placeholder
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />

                                                <Card.Body>
                                                <h5 className="card-title">{truncateText(item.title)}</h5>
                                                <p className="card-text">Proveedor: {item.vendor}</p>
                                                    <p className="card-text">Tipo: {item.product_type}</p>
                                                    <p className="card-text">Estado: {item.status}</p>
                                                    <Button variant="primary" onClick={() => handleShowDetails(item.id)}>
                                                        <FontAwesomeIcon icon={faEye} /> Ver detalles
                                                    </Button>
                                                    <Button variant="secondary" onClick={() => handleEdit(item.id)} className="ms-2">
                                                        <FontAwesomeIcon icon={faEdit} /> Editar
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-12 text-center">No se encontraron productos que coincidan con la búsqueda.</div>
                                )}
                            </div>
                        )}
                    </div>
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

            <ProductDetailModal show={showDefault} handleClose={handleClose} selectedId={selectedId} />
        </>
    );
};

export default CatalogCard;
