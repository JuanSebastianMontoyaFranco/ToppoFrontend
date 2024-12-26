import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "@themesberg/react-bootstrap";
import axios from "../../../../config/axios";
import { Context } from "../../../../context/Context";

const HistowebForm = () => {
  const [auth] = useContext(Context);
  const [isActivated, setIsActivated] = useState(false);
  const [syncStatus, setSyncStatus] = useState(false); // Nuevo estado para sync_status
  const [data, setData] = useState({
    token_histoweb: "",
    url_histoweb_products: "",
    url_histoweb_services: "",
  });

  // Función para obtener los datos desde las dos APIs
  const fetchData = async () => {
    try {
      // Primera API para los datos existentes
      const response = await axios.get(`/credential/list/user/${auth.id}`);
      const credentialData = response.data.rows[0];

      setData({
        token_histoweb: credentialData.token_histoweb || "",
        url_histoweb_products: credentialData.url_histoweb_products || "",
        url_histoweb_services: credentialData.url_histoweb_services || "",
      });

      // Segunda API para sync_status
      const syncResponse = await axios.get(`/parameter/sync/list/user/${auth.id}`);
      setSyncStatus(syncResponse.data.rows[0].sync_status || false);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  // Se ejecuta al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Función para enviar los datos modificados a las dos APIs
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      isActivated,
      ...data,
    };

    try {
      // Actualización en la primera API
      const response = await axios.post(`/credential/update/user/${auth.user_id}`, formData);
      console.log("Datos enviados correctamente a la primera API", response.data);

      // Actualización en la segunda API
      const syncResponse = await axios.post(`/parameter/sync/update/user/${auth.user_id}`, {
        sync_status: syncStatus,
      });
      console.log("Sync status actualizado correctamente", syncResponse.data);
    } catch (error) {
      console.error("Error al enviar los datos", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="token_histoweb">
        <Form.Label>Token Histoweb</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el token de Histoweb"
          value={data.token_histoweb}
          onChange={(e) => setData({ ...data, token_histoweb: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="url_histoweb_products">
        <Form.Label>URL de Productos</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa la URL de productos"
          value={data.url_histoweb_products}
          onChange={(e) => setData({ ...data, url_histoweb_products: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="url_histoweb_services">
        <Form.Label>URL de Servicios</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa la URL de servicios"
          value={data.url_histoweb_services}
          onChange={(e) => setData({ ...data, url_histoweb_services: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Sincronizar"
          checked={syncStatus}
          onChange={() => setSyncStatus(!syncStatus)} // Controla sync_status
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
};

export default HistowebForm;
