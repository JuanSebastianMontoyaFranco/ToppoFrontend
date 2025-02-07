import React, { useState, useContext } from "react";
import { Col, Row, Breadcrumb } from '@themesberg/react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Routes } from "../../../routes";
import { CatalogCard } from "../cards/orders/catalogCard";


const Order = () => {
    const navigate = useNavigate();
    const { order_id } = useParams();
    const [filters, setFilters] = useState({
        searchTerm: "",
        channel: "",
        state: "",
        productType: "",
        status: "",
    });
    const handleNavigate = () => {
        navigate(Routes.Orders.path);
    };

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0 mr-0">
                    <Breadcrumb className="title-page" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Toppo</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => handleNavigate()}>Pedidos</Breadcrumb.Item>
                        <Breadcrumb.Item active>Crear Pedido</Breadcrumb.Item>

                    </Breadcrumb>
                    <h4 className="title-page">Crear pedido</h4>
                    <p className="mb-0">Aqui podras crear un pedido.</p>
                </div>
            </div>
            <CatalogCard searchTerm={filters.searchTerm} channel={filters.channel} state={filters.state} product_type={filters.productType} status={filters.status} />

        </>
    );
};

export default Order;
