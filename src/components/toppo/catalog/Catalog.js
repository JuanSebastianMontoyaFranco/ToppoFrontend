import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Collapse } from "@themesberg/react-bootstrap";
import { CatalogTable } from "../tables/catalog/catalogTable";
import axios from '../../../config/axios';
import { Context } from "../../../context/Context";

const Catalog = () => {
  const [auth] = useContext(Context);
  const [filters, setFilters] = useState({
    searchTerm: "",
    channel: "",
    state: "",
    productType: "",
    status: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sync, setSync] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  const handleToSync = (products) => {
    console.log("Productos para sincronizar:", products);
    setSync(products);
  };

  const handleSync = async () => {
    try {
      const createProducts = sync.filter(product => product.state === 'create');
      const updateProducts = sync.filter(product => product.state === 'update');

      console.log('Productos para crear:', createProducts);
      console.log('Productos para actualizar:', updateProducts);

      // Enviar productos para crear
      if (createProducts.length > 0) {
        await axios.post(`/sync/send/user/${auth.id}`, { create: createProducts });
      }

      // Enviar productos para actualizar
      if (updateProducts.length > 0) {
        await axios.post(`/sync/send/user/${auth.id}`, { update: updateProducts });
      }

      // Mostrar mensaje de éxito si es necesario
      // lo("Éxito", "success", 'Productos sincronizando');
    } catch (error) {
      console.error('Error al sincronizar productos', error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div>
          <Breadcrumb className="title-page breadcrumb-dark breadcrumb-transparent">
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Toppo</Breadcrumb.Item>
            <Breadcrumb.Item active>Catálogo</Breadcrumb.Item>
          </Breadcrumb>
          <h4 className="title-page">Catálogo</h4>
          <p>Aquí podrás ver todos los productos de la aplicación.</p>
        </div>

        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Agregar</Button>
            <Button variant="outline-primary" size="sm">Importar</Button>
            <Button variant="outline-primary" size="sm" onClick={handleSync}>Sincronizar</Button>
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
            {[{label: "Tipo", name: "productType", options: [{ value: "", label: "Todos" }, { value: "PRODUCT", label: "Producto" }, { value: "SERVICE", label: "Servicio" }]},
              {label: "Canal", name: "channel", options: [{ value: "", label: "Todos" }, { value: "1", label: "Shopify" }, { value: "2", label: "Mercadolibre" }, { value: "3", label: "Falabella" }]},
              {label: "Estado", name: "status", options: [{ value: "", label: "Todos" }, { value: "active", label: "Activo" }, { value: "draft", label: "Borrador" }, { value: "archived", label: "Archivado" }]},
              {label: "Acción", name: "state", options: [{ value: "", label: "Todos" }, { value: "create", label: "Crear" }, { value: "update", label: "Actualizar" }]},
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

      <CatalogTable searchTerm={filters.searchTerm} channel={filters.channel}
        state={filters.state} product_type={filters.productType} status={filters.status}
        sync={handleToSync}
      />
    </>
  );
};

export default Catalog;
