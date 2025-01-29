import React, { useState, useEffect } from "react";
import { Form, Button } from "@themesberg/react-bootstrap";

const SerpiForm = ({ credentials, orderParameters }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [data, setData] = useState({
    order_main: "",
  });

  const [syncData, setSyncData] = useState({
    main: false,
    active: false,
  });

  useEffect(() => {
    if (credentials && credentials.length > 0) {
      const firstCredential = credentials[0];
      setData({
        order_main: firstCredential.order_main || "",
      });
    }
  }, [credentials]);

  useEffect(() => {
    const orderMainInt = parseInt(data.order_main, 10);
    setIsActivated(orderMainInt === 1);
  }, [data.order_main]);

  useEffect(() => {
    if (orderParameters && orderParameters.length > 0) {
      const firstSyncParameter = orderParameters[0];
      const main = firstSyncParameter.main === 1;
      const active = firstSyncParameter.active === true;

      setSyncData({ main, active });
      setIsActivated(main);
    }
  }, [orderParameters]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      isActivated,
      ...data,
      ...syncData,
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

  const handleSyncStatusChange = (field, value) => {
    setSyncData((prevSyncData) => ({
      ...prevSyncData,
      [field]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Activar"
          checked={syncData.main}
          onChange={(e) => handleSyncStatusChange("main", e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Automático"
          checked={syncData.active}
          onChange={(e) => handleSyncStatusChange("active", e.target.checked)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Guardar
      </Button>
    </Form>
  );
};

export default SerpiForm;
