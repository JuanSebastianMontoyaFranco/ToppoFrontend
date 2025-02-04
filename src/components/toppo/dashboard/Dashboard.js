import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Row, Col } from "@themesberg/react-bootstrap";
import { Context } from "../../../context/Context";
import { CircleChartWidget } from "../../widgets/GraphicsComponent";
import axios from "../../../config/axios";
import { useLocation } from 'react-router-dom';
import DismissableAlerts from '../../widgets/Alerts';

const Dashboard = () => {
  const [auth] = useContext(Context);
  const [statistics, setStatistics] = useState({
    orders: { pending: 0, approved: 0, errors: 0 },
    products: { active: 0, draft: 0, archived: 0 },
  });

  const location = useLocation();
  const alerts = location.state?.alerts || []; // Recupera las alertas del estado de la ruta, si existen


  const displayName = `${auth.first_name} ${auth.last_name}`;

  useEffect(() => {
    // Solicita datos a la API
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`/statistic/list/user/${auth.id}`);
        setStatistics(response.data); // Actualiza el estado con la respuesta
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      }
    };

    fetchStatistics();
  }, [auth.id]);

  // Configuración de los datos para los gráficos
  const orderData = [
    { id: 1, label: "Pendientes", value: statistics.orders.pending, color: "#808080" },
    { id: 2, label: "Correctas", value: statistics.orders.approved, color: "#28a745" },
    { id: 3, label: "Errores", value: statistics.orders.errors, color: "#dc3545" },
  ];

  const productData = [
    { id: 1, label: "Activos", value: statistics.products.active, color: "#28a745" },
    { id: 2, label: "Borrador", value: statistics.products.draft, color: "#007bff " },
    { id: 3, label: "Archivados", value: statistics.products.archived, color: "#808080" },
  ];

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0 mr-0">
          <Breadcrumb className="title-page" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Toppo</Breadcrumb.Item>
            <Breadcrumb.Item active>Home</Breadcrumb.Item>
          </Breadcrumb>
          <h4 className="title-page">Bienvenido a Toppo! {displayName}</h4>
        </div>
      </div>

      <Row>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget title="Órdenes" data={orderData} />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget title="Productos" data={productData} />
        </Col>
      </Row>
      {alerts.length > 0 && <DismissableAlerts alerts={alerts} onClose={() => {}} />}

    </>
  );
};

export default Dashboard;
