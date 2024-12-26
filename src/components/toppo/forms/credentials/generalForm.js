import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "@themesberg/react-bootstrap";
import axios from "../../../../config/axios";
import { Context } from "../../../../context/Context";

const GeneralForm = () => {
  const [auth] = useContext(Context);
  const [isActivated, setIsActivated] = useState(false);
  const [data, setData] = useState({
    store_domain: "",
  });
  
  // Función para obtener los datos desde la API
  const fetchData = async () => {
    try {
      const response = await axios.get(`/credential/list/user/${auth.id}`);
      const credentialData = response.data.rows[0];
      setIsActivated(credentialData.isActivated || false);
      setData({
        store_domain: credentialData.store_domain || "",
      });
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  // Se ejecuta al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Función para enviar los datos modificados al backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      isActivated,
      ...data,
    };

    try {
      const response = await axios.post(`/credential/update/user/${auth.user_id}`, formData);
      console.log("Datos enviados correctamente", response.data);
    } catch (error) {
      console.error("Error al enviar los datos", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="store_domain">
        <Form.Label>Dominio</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el token de Histoweb"
          value={data.store_domain}
          onChange={(e) => setData({ ...data, store_domain: e.target.value })}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
};

export default GeneralForm;
