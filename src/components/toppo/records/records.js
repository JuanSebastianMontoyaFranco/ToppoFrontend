import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Collapse } from "@themesberg/react-bootstrap";
import { ChangeRecordsTable } from "../tables/records/changeRecordsTable"; 
import { SyncRecordsTable } from "../tables/records/syncRecordsTable";  // Reemplázala si tienes otras tablas

import axios from '../../../config/axios';
import { Context } from "../../../context/Context";

const Orders = () => {
    const [auth] = useContext(Context);
    const [filters, setFilters] = useState({
        searchTerm: "",
        state: "",
        field: "",
        fromDate: "",
        toDate: ""
    });

    const [showFilters, setShowFilters] = useState(false);
    const [activeView, setActiveView] = useState("Campos"); // Vista por defecto

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const toggleFilters = () => setShowFilters(!showFilters);

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div>
                    <Breadcrumb className="title-page breadcrumb-dark breadcrumb-transparent">
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Toppo</Breadcrumb.Item>
                        <Breadcrumb.Item>Ajustes</Breadcrumb.Item>
                        <Breadcrumb.Item active>Registros</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4 className="title-page">Registros</h4>
                    <p>Aquí podrás ver todos los registros de cambios de la aplicación.</p>
                </div>

                <div className="btn-toolbar mb-2 mb-md-0">
                    <ButtonGroup>
                        {["Campos", "Sincronizaciones", "Cambios"].map((view) => (
                            <Button
                                key={view}
                                variant={activeView === view ? "primary" : "outline-primary"}
                                size="sm"
                                onClick={() => setActiveView(view)}
                            >
                                {view}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
            </div>

            {/* Filtros */}
            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    <Col xs={8} md={6} lg={3} xl={4}>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Nombre..."
                                name="searchTerm"
                                value={filters.searchTerm}
                                onChange={handleFilterChange}
                            />
                        </InputGroup>
                    </Col>
                    <Col xs={4} md={6} xl={2} className="d-flex justify-content-end">
                        <Button variant="outline-secondary" onClick={toggleFilters}>
                            <FontAwesomeIcon icon={faFilter} /> Filtros
                        </Button>
                    </Col>
                </Row>

                <Collapse in={showFilters}>
                    <Row className="justify-content-between align-items-center mt-3">
                        {/* Estado */}
                        <Col xs={6} lg={3}>
                            <Form.Label>Estado:</Form.Label>
                            <Form.Select name="state" value={filters.state} onChange={handleFilterChange}>
                                <option value="">Todos</option>
                                <option value="create">Creado</option>
                                <option value="update">Actualizado</option>
                            </Form.Select>
                        </Col>

                        {/* Campo (Solo para la vista "Campos") */}
                        {activeView === "Campos" && (
                            <Col xs={6} lg={3}>
                                <Form.Label>Campo:</Form.Label>
                                <Form.Select name="field" value={filters.field} onChange={handleFilterChange}>
                                    <option value="">Todos</option>
                                    <option value="price">Precio</option>
                                    <option value="inventory_quantity">Inventario</option>
                                    <option value="status">Estado</option>
                                </Form.Select>
                            </Col>
                        )}

                        {/* Fecha Desde */}
                        <Col xs={6} lg={3}>
                            <Form.Label>Desde:</Form.Label>
                            <Form.Control
                                type="date"
                                name="fromDate"
                                value={filters.fromDate}
                                onChange={handleFilterChange}
                            />
                        </Col>

                        {/* Fecha Hasta */}
                        <Col xs={6} lg={3}>
                            <Form.Label>Hasta:</Form.Label>
                            <Form.Control
                                type="date"
                                name="toDate"
                                value={filters.toDate}
                                onChange={handleFilterChange}
                            />
                        </Col>
                    </Row>
                </Collapse>
            </div>

            {/* Tablas dinámicas según la vista seleccionada */}
            {activeView === "Campos" && <ChangeRecordsTable {...filters} />}
            {activeView === "Sincronizaciones" && <SyncRecordsTable {...filters} />} {/* Reemplaza con la tabla de sincronizaciones */}
            {activeView === "Cambios" && <ChangeRecordsTable {...filters} />} {/* Reemplaza con la tabla de cambios */}
        </>
    );
};

export default Orders;
