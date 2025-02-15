import React, { useState, useEffect } from "react";
import { Form, Button } from "@themesberg/react-bootstrap";

const HistowebForm = ({ credentials, orderParameters }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [data, setData] = useState({
    hook_histoweb: "",
    order_main: "",
  });

  const [syncData, setSyncData] = useState({
    main: false,
    active: false,
    branch_id_defult: 0,
    branch_name_default: "",
  });

  useEffect(() => {
    if (credentials && credentials.length > 0) {
      const firstCredential = credentials[0];
      setData({
        hook_histoweb: firstCredential.hook_histoweb || "",
        order_main: firstCredential.order_main || "",
      });
    }
  }, [credentials]);

  useEffect(() => {
    const orderMainInt = parseInt(data.order_main, 10);
    setIsActivated(orderMainInt === 2);
  }, [data.order_main]);

  useEffect(() => {
    if (orderParameters && orderParameters.length > 0) {
      const firstSyncParameter = orderParameters[0];
      const main = firstSyncParameter.main === 2;
      const active = firstSyncParameter.active === true;
      const branch_id_defult = firstSyncParameter.branch_id_defult || 0;
      const branch_name_default = firstSyncParameter.branch_name_default || "";

      setSyncData({ main, active, branch_id_defult, branch_name_default });
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
      <Form.Group className="mb-3" controlId="hook_histoweb">
        <Form.Label>Token Histoweb</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el token de Histoweb"
          value={data.hook_histoweb}
          onChange={(e) => handleChange("hook_histoweb", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="branch_id_defult">
        <Form.Label>ID de Sucursal Predeterminada</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ingresa el ID de la sucursal"
          value={syncData.branch_id_defult}
          onChange={(e) => handleSyncStatusChange("branch_id_defult", parseInt(e.target.value, 10))}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="branch_name_default">
        <Form.Label>Nombre de Sucursal Predeterminada</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el nombre de la sucursal"
          value={syncData.branch_name_default}
          onChange={(e) => handleSyncStatusChange("branch_name_default", e.target.value)}
        />
      </Form.Group>

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

export default HistowebForm;
