import React from "react";
import { Form, Button } from "@themesberg/react-bootstrap";

const SerpiForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="apiKey">
        <Form.Label>API Key</Form.Label>
        <Form.Control type="text" placeholder="Ingresa tu API Key" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="endpoint">
        <Form.Label>Endpoint</Form.Label>
        <Form.Control type="text" placeholder="Ingresa tu Endpoint" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="Activar" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
};

export default SerpiForm;
