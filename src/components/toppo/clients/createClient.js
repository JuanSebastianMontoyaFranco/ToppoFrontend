import React from "react";
import { Col, Row, Breadcrumb, ButtonGroup, Button } from '@themesberg/react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';

import { CreateClientForm } from "../forms/clients/createClientForm";

const Client = () => {
    const navigate = useNavigate();
    const { user_id } = useParams();

    const handleNavigateClients = () => {
        navigate(`/dashboard/clients`);
    };

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0 mr-0">
                    <Breadcrumb className="title-page" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Toppo</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => handleNavigateClients()}>Clientes</Breadcrumb.Item>
                        <Breadcrumb.Item active>Crear cliente</Breadcrumb.Item>

                    </Breadcrumb>
                    <h4 className="title-page">Crear cliente</h4>
                    <p className="mb-0">Aqui podras crear un nuevo cliente.</p>
                </div>
            </div>
            <Row>
                <Col xs={16} xl={16}>
                    <CreateClientForm userId={user_id} />
                </Col>
            </Row>
        </>
    );
};

export default Client;
