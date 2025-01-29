import React, { useState, useEffect } from "react";
import { Form, Button } from "@themesberg/react-bootstrap";

const SerpiForm = ({ credentials, syncParameters }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [data, setData] = useState({
    token_serpi: "",
    secret_key_serpi: "",
    product_main: "",
  });

  const [syncData, setSyncData] = useState({
    sync_status: false, // Aseguramos que sea un booleano inicial
  });

  useEffect(() => {
    // Inicializa los datos del formulario con las credenciales proporcionadas
    if (credentials && credentials.length > 0) {
      const firstCredential = credentials[0];
      setData({
        token_serpi: firstCredential.token_serpi || "",
        secret_key_serpi: firstCredential.secret_key_serpi || "",
        product_main: firstCredential.product_main || "",
      });
    }
  }, [credentials]);

  useEffect(() => {
    // Actualiza el estado de isActivated basado en product_main
    setIsActivated(data.product_main === 1);
  }, [data.product_main]);

  useEffect(() => {
    // Extrae el sync_status del array syncParameters si está definido
    if (syncParameters && syncParameters.length > 0) {
      const firstSyncParameter = syncParameters[0]; // Tomamos el primer elemento
      const syncStatus = !!firstSyncParameter.sync_status; // Convertimos a booleano seguro

      setSyncData({ sync_status: syncStatus });
      setIsActivated(syncStatus);
      //console.log("Sync parameters procesados:", syncParameters); // Debug adicional
    }
  }, [syncParameters]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      isActivated,
      ...data,
      sync_status: syncData.sync_status,
    };

    try {
      console.log("Datos enviados correctamente", formData);
    } catch (error) {
      console.error("Error al enviar los datos", error);
    }
  };

  const handleChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSyncStatusChange = (value) => {
    setSyncData({ sync_status: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="token_serpi">
        <Form.Label>Token Serpi</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el token de Serpi"
          value={data.token_serpi}
          onChange={(e) => handleChange("token_serpi", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="secret_key_serpi">
        <Form.Label>Secret Key Serpi</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa la clave secreta de Serpi"
          value={data.secret_key_serpi}
          onChange={(e) => handleChange("secret_key_serpi", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Activar"
          checked={isActivated}
          onChange={(e) => setIsActivated(e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Automático"
          checked={syncData.sync_status}
          onChange={(e) => handleSyncStatusChange(e.target.checked)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Guardar
      </Button>
    </Form>
  );
};

export default SerpiForm;
