import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog, faShoppingBag, faStore, faDatabase, faServer, faFileAlt, faTasks } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Row, Col } from "@themesberg/react-bootstrap";
import GeneralForm from "../forms/credentials/generalForm";
import ShopifyForm from "../forms/credentials/shopifyForm"
import CredentialCard from "../../widgets/Cards/CredentialCard";
import HistowebForm from "../forms/credentials/histowebForm";
import SerpiForm from "../forms/credentials/serpiForm";

const Credentials = () => {
  const credentials = [
    { id: 1, name: "Histoweb", icon: faDatabase, formContent: <HistowebForm /> },
    { id: 2, name: "Serpi", icon: faServer, formContent: <SerpiForm /> },
  ];

  const general = [
    { id: 1, name: "General", icon: faCog, formContent: <GeneralForm /> },
  ];

  const channels = [
    { id: 1, name: "Shopify", icon: faShoppingBag, formContent: <ShopifyForm /> },
    { id: 2, name: "Mercadolibre", icon: faStore, formContent: <HistowebForm /> },
  ];

  const orders = [
    { id: 1, name: "Histoweb", icon: faFileAlt, formContent: <HistowebForm /> },
    { id: 2, name: "Serpi", icon: faTasks, formContent: <HistowebForm /> },
  ];

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="title-page"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Toppo</Breadcrumb.Item>
            <Breadcrumb.Item>Ajustes</Breadcrumb.Item>
            <Breadcrumb.Item active>Credenciales</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <h4>Generales</h4>
      <Row>
        {general.map((general) => (
          <Col xs={12} sm={6} md={4} lg={3} key={general.id}>
            <CredentialCard
              name={general.name}
              icon={general.icon}
              formContent={general.formContent}
            />
          </Col>
        ))}
      </Row>
      <h4>Canales</h4>
      <Row>
        {channels.map((channel) => (
          <Col xs={12} sm={6} md={4} lg={3} key={channel.id}>
            <CredentialCard
              name={channel.name}
              icon={channel.icon}
              formContent={channel.formContent}
            />
          </Col>
        ))}
      </Row>
      <h4>Importaciones</h4>
      <Row>
        {credentials.map((credential) => (
          <Col xs={12} sm={6} md={4} lg={3} key={credential.id}>
            <CredentialCard
              name={credential.name}
              icon={credential.icon}
              formContent={credential.formContent}
            />
          </Col>
        ))}
      </Row>
      <h4>Pedidos</h4>
      <Row>
        {orders.map((order) => (
          <Col xs={12} sm={6} md={4} lg={3} key={order.id}>
            <CredentialCard
              name={order.name}
              icon={order.icon}
              formContent={order.formContent}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Credentials;
