import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSyncAlt, faCircle, faExclamationTriangle, faHourglassHalf, faEdit, faEllipsisH, faEye, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Table, Dropdown, ButtonGroup, Button, Spinner } from '@themesberg/react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductDetailModal from '../modals/catalog/ProductDetailModal';

import PaginationComponent from '../../widgets/PaginationComponent';
import { Context } from "../../../context/Context";
import axios from '../../../config/axios';

export const CatalogTable = ({ searchTerm, filterState, filterProductType, onSync }) => {
    const navigate = useNavigate();
    const [auth] = useContext(Context);

    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [showDefault, setShowDefault] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const itemsPerPage = 100;

    const fetchProducts = async (user_id, currentPage, itemsPerPage, searchTerm, filterState, filterProductType) => {
        setLoading(true);
        try {
            let url = `product/list/user/${user_id}?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`;

            if (filterState && filterState !== "Todos") {
                url += `&filterState=${filterState}`;
            }

            if (filterProductType && filterProductType !== "Todos") {
                url += `&filterProductType=${filterProductType}`; // Añade el filtro por tipo de producto
            }

            const response = await axios.get(url);
            const fetchedProducts = response.data.rows;

            setProducts(fetchedProducts);
            setTotalProducts(response.data.total);

            // Pasa los productos al componente padre
            console.log("Productos filtrados:", fetchedProducts); // <-- Aquí verificamos qué productos llegan
            onSync && onSync(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (auth && auth.user_id) {
            fetchProducts(auth.user_id, page, itemsPerPage, searchTerm, filterState, filterProductType);
        }
    }, [page, searchTerm, filterState, filterProductType, auth]);


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalProducts / itemsPerPage)) {
            setPage(newPage);
        }
    };

    const handleClose = () => {
        setShowDefault(false);
        setSelectedId(null); // Restablece el ID seleccionado cuando se cierra el modal
    };

    const handleShowDetails = (id) => {
        setSelectedId(id); // Establece el ID seleccionado
        setShowDefault(true); // Muestra el modal
    };

    const handleEditProduct = (id) => {
        navigate(`dashboard/product/edit/${id}`);
    };

    const TableRow = (props) => {
        const { id, title, status, state, product_type, variants } = props;

        // Asegurarte de que existe al menos una variante antes de acceder a los precios
        const price = variants?.[0]?.price ?? "N/A";
        const inventory_quantity = variants?.[0]?.inventory_quantity ?? "N/A";
        const sku = variants?.[0]?.sku ?? "N/A";

        const getFormattedStatus = (status) => {
            switch (status) {
                case "active":
                    return (
                        <span style={{ color: "green", fontWeight: "bold" }}>
                            Activo
                        </span>
                    );
                case "draft":
                    return (
                        <span style={{ color: "blue", fontWeight: "bold" }}>
                            Borrador
                        </span>
                    );
                case "archived":
                    return (
                        <span style={{ color: "gray", fontWeight: "bold" }}>
                            Archivado
                        </span>
                    );
                default:
                    return (
                        <span style={{ color: "orange", fontWeight: "bold" }}>
                            Desconocido
                        </span>
                    );
            }
        };

        const getStatusIcon = (state) => {
            if (!state || state === "") {
                return <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} title="Sin estado" />;
            }
            switch (state) {
                case "create":
                    return <FontAwesomeIcon icon={faPlusCircle} style={{ color: 'blue' }} title="Crear" />;
                case "update":
                    return <FontAwesomeIcon icon={faSyncAlt} style={{ color: 'orange' }} title="Actualizar" />;
                default:
                    return <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'red' }} title="Estado desconocido" />;
            }
        };
        

        return (
            <tr>
                <td>
                    <span className="fw-normal">
                        {sku}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {getFormattedStatus(status)}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {getStatusIcon(state)}
                    </span>
                </td>
                <td style={{ maxWidth: '150px', overflow: 'hidden' }}>
                    <span
                        className="fw-normal"
                        style={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                    >
                        {title}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {product_type}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {price}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {inventory_quantity}
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
                            <Dropdown.Item onClick={() => handleShowDetails(id)}>
                                <FontAwesomeIcon icon={faEye} className="me-2" /> Detalles
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleEditProduct(id)}>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar
                            </Dropdown.Item>
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
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px', width: '100%' }}>
                            <Spinner animation="border" role="status" />
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    ) : (
                        <Table hover className="catalog-table align-items-center">
                            <thead>
                                <tr>
                                    <th className="border-bottom">SKU</th>
                                    <th className="border-bottom">Estado</th>
                                    <th className="border-bottom">Sincronizado</th>
                                    <th className="border-bottom">Nombre</th>
                                    <th className="border-bottom">Tipo de producto</th>
                                    <th className="border-bottom">Precio</th>
                                    <th className="border-bottom">Inventario</th>
                                    <th className="border-bottom">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.length > 0 ? (
                                    products.map(product => <TableRow key={product.id} {...product} />)
                                ) : (
                                    <tr>
                                        <td colSpan="12" className="text-center mt-6">
                                            No se encontraron productos que coincidan con la búsqueda.
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
                            totalItems={totalProducts}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                        />
                    </Nav>
                    <small className="fw-bold">
                        Mostrando <b>{(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, totalProducts)}</b> de un total de <b>{totalProducts}</b> productos
                    </small>
                </Card.Footer>
            </Card>
            <ProductDetailModal show={showDefault} handleClose={handleClose} selectedId={selectedId} />
        </>
    );
};