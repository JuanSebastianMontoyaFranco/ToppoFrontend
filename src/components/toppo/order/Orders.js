import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup } from '@themesberg/react-bootstrap';
import { Context } from "../../../context/Context";

import { OrdersTable } from "../../toppo/tables/OrdersTable";

const Orders = () => {
  const [auth] = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("Todos");
  const [isMaster, setIsMaster] = useState(false); // Estado para determinar si el usuario es master

  useEffect(() => {
    // Hacer fetch a la API
    const fetchUserData = async () => {
      try {
        const response = await fetch(`credential/list/user/${auth.user_id}`);
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }
        const data = await response.json();
        const userData = data.rows?.[0]; // Obtener el primer elemento del array rows
        if (userData) {
          setIsMaster(userData.master === 1); // Verificar si el campo master es 1
        } else {
          console.warn("No se encontraron datos para el usuario.");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [auth.user_id]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterStateChange = (e) => {
    setFilterState(e.target.value);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0 mr-0">
          <Breadcrumb className="title-page" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Toppo</Breadcrumb.Item>
            <Breadcrumb.Item active>Pedidos</Breadcrumb.Item>
          </Breadcrumb>
          <h4 className="title-page">Pedidos</h4>
          <p className="mb-0">Aqui podras ver todos los pedidos de la aplicacion.</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            {isMaster && (
              <Button variant="outline-primary" size="sm">Hook</Button>
            )}
            <Button variant="outline-primary" size="sm">Exportar</Button>
          </ButtonGroup>
        </div>

      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <Form.Label>Buscar:</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="ID, Nombre Cliente, Email..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Col>

          <Col xs={8} md={6} lg={3} xl={4}>
            <Form.Label>Estado:</Form.Label>
            <Form.Select value={filterState} onChange={handleFilterStateChange}>
              <option value="">Todas</option>
              <option value="0">Pendientes</option>
              <option value="1">Aprobadas</option>
              <option value="2">Error</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      <OrdersTable searchTerm={searchTerm} filterState={filterState} />
    </>
  );
};

export default Orders;
