import React, { useState, useEffect } from "react";
import { Form, Button } from "@themesberg/react-bootstrap";

const GeneralForm = ({ credentials }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [data, setData] = useState({
    store_domain: "",
  });

  // Cargar los datos de las credenciales cuando el componente se monta
  useEffect(() => {
    if (credentials && credentials.length > 0) { // Asegúrate de que credentials no esté vacío
      const firstCredential = credentials[0]; // Accede al primer objeto del arreglo
      setIsActivated(firstCredential.isActivated || false); // Establece isActivated
      setData({
        store_domain: firstCredential.store_domain || "", // Establece el valor de store_domain
      });

      console.log(firstCredential); // Verifica que se está recibiendo el objeto correctamente
    }
  }, [credentials]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      isActivated,
      ...data,
    };

    try {
      // Envía los datos al backend
      console.log("Datos enviados correctamente", formData);
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
          placeholder="Dominio de tu tienda"
          value={data.store_domain}
          onChange={(e) => setData({ ...data, store_domain: e.target.value })}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Guardar
      </Button>
    </Form>
  );
};

export default GeneralForm;
