import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Collapse } from "@themesberg/react-bootstrap";
import { PriceListTable } from "../tables/priceLists/priceListTable";
import axios from '../../../config/axios';
import { Context } from "../../../context/Context";

const PriceList = () => {
    const [auth] = useContext(Context);
    const [filters, setFilters] = useState({
        searchTerm: "",
        state: "",
    });
    const [showFilters, setShowFilters] = useState(false);

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
                        <Breadcrumb.Item active>Listas de precios</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4 className="title-page">Listas de precios</h4>
                    <p>Aquí podrás ver todas las listas de precio de la aplicación.</p>
                </div>

                <div className="btn-toolbar mb-2 mb-md-0">
                    <ButtonGroup>
                        <Button variant="outline-primary" size="sm">Agregar</Button>
                        <Button variant="outline-primary" size="sm">Importar</Button>
                        <Button variant="outline-primary" size="sm">Exportar</Button>
                    </ButtonGroup>
                </div>

            </div>

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
                        {[{ label: "Estado", name: "state", options: [{ value: "", label: "Todos" }, { value: "0", label: "Pendiente" }, { value: "1", label: "Correcta" }, { value: "2", label: "Error" }] },

                        ].map(({ label, name, options }) => (
                            <Col xs={6} lg={3} key={name}>
                                <Form.Label>{label}:</Form.Label>
                                <Form.Select name={name} onChange={handleFilterChange}>
                                    {options.map(({ value, label }) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        ))}
                    </Row>
                </Collapse>
            </div>

            <PriceListTable searchTerm={filters.searchTerm} state={filters.state}
            />
        </>
    );
};

export default PriceList;
