import React from "react";
import { Card, Row, Col } from "@themesberg/react-bootstrap";
import { CircleChart } from "./Charts";

export const CircleChartWidget = ({ title, data = [] }) => {
  const series = data.map((d) => d.value);
  const labels = data.map((d) => d.label);
  const colors = data.map((d) => d.color || "#ccc"); // Colores por defecto

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-flex align-items-center">
          <Col xs={12} xl={6} className="d-flex justify-content-center mb-3 mb-xl-0">
            <CircleChart series={series}  colors={colors} />
          </Col>
          <Col xs={12} xl={6} className="d-flex flex-column justify-content-center px-xl-0">
            <h5 className="mb-3">{title}</h5>
            {data.map((d) => (
              <div key={`circle-element-${d.id}`} className="fw-normal text-gray mb-2">
                <div className="d-flex align-items-center">
                  <div style={{ width: "10px", height: "10px", backgroundColor: d.color, marginRight: "10px", marginBottom: "10px" }}></div>
                  <h6>{d.label}: {d.value}</h6>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
