import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Row, Col } from "@themesberg/react-bootstrap";

// Formularios
import GeneralForm from "../forms/credentials/generalForm";
import CredentialCard from "../../widgets/Cards/CredentialCard";
import HistowebSyncForm from "../forms/credentials/histowebSyncForm";
import SerpiSyncForm from "../forms/credentials/serpiSyncForm";
import HistowebOrdersForm from "../forms/credentials/histowebOrdersForm";
import SerpiOrdersForm from "../forms/credentials/serpiOrdersForm";
import { Context } from "../../../context/Context";

// Imágenes personalizadas
import histowebImage from "../../../assets/img/logos/histoweb-logo.png";
import serpiImage from "../../../assets/img/logos/serpi-logo.png";
import axios from "../../../config/axios";

const Credentials = () => {
  const [auth] = useContext(Context);
  const [credentials, setCredentials] = useState([]);
  const [syncParameters, setSyncParameters] = useState([]);
  const [orderParameters, setOrderParameters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.id) {
      fetchData();
    }
  }, [auth]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        `/credential/list/user/${auth.id}`
      );
      const credentialsData = response.rows[0]?.credentials || [];
      const syncParametersData = response.rows[0]?.sync_parameters || [];
      const orderParametersData = response.rows[0]?.order_parameters || [];
            
      setCredentials(credentialsData);
      setSyncParameters(syncParametersData);
      setOrderParameters(orderParametersData)
    } catch (error) {
      console.error("Error al recuperar los datos:", error);
      setCredentials([]);
      setSyncParameters([]);
      setOrderParameters([]);
    } finally {
      setLoading(false);
    }
  };

  const general = [
    {
      id: 1,
      name: "General",
      icon: faCog,
      formContent: (
        <GeneralForm
          credentials={credentials}
          syncParameters={syncParameters}
        />
      ),
    },
  ];

  const sync = [
    {
      id: 1,
      name: "Histoweb",
      image: histowebImage,
      formContent: (
        <HistowebSyncForm
          credentials={credentials}
          syncParameters={syncParameters}
        />
      ),
    },
    {
      id: 2,
      name: "Serpi",
      image: serpiImage,
      formContent: (
        <SerpiSyncForm
          credentials={credentials}
          syncParameters={syncParameters}
        />
      ),
    },
  ];

  const orders = [
    {
      id: 1,
      name: "Histoweb",
      image: histowebImage,
      formContent: (
        <HistowebOrdersForm
          credentials={credentials}
          orderParameters={orderParameters}
        />
      ),
    },
    {
      id: 2,
      name: "Serpi",
      image: serpiImage,
      formContent: (
        <SerpiOrdersForm
          credentials={credentials}
          orderParameters={orderParameters}
        />
      ),
    },
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
        {general.map((item) => (
          <Col xs={12} sm={6} md={4} lg={12} key={item.id}>
            <CredentialCard
              name={item.name}
              icon={item.icon}
              formContent={item.formContent}
            />
          </Col>
        ))}
      </Row>

      <h4>Sincronización</h4>
      <Row>
        {sync.map((credential) => (
          <Col xs={12} sm={6} md={4} lg={6} key={credential.id}>
            <CredentialCard
              name={credential.name}
              image={credential.image}
              formContent={credential.formContent}
            />
          </Col>
        ))}
      </Row>

      <h4>Pedidos</h4>
      <Row>
        {orders.map((credential) => (
          <Col xs={12} sm={6} md={4} lg={6} key={credential.id}>
            <CredentialCard
              name={credential.name}
              image={credential.image}
              formContent={credential.formContent}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Credentials;
