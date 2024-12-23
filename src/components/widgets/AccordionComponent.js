import React from 'react';
import { Card, Accordion } from '@themesberg/react-bootstrap';

export default (props) => {
  const { defaultKey, data = [], className = "" } = props;

  const AccordionItem = (item) => {
    const { eventKey, title, content } = item;

    return (
      <Accordion.Item eventKey={eventKey} style={{backgroundColor: 'white'}} >
        <Accordion.Button variant="link" className="w-100 d-flex justify-content-between" style={{backgroundColor: 'white'}}>
          <span className="h6 mb-0 fw-bold">
            {title}
          </span>
        </Accordion.Button>
        <Accordion.Body>
          <Card.Body className="py-2 px-0">
            {content} {/* Renderiza el contenido dinámico aquí */}
          </Card.Body>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  return (
    <Accordion className={className} defaultActiveKey={defaultKey}>
      {data.map(d => <AccordionItem key={`accordion-${d.id}`} {...d} />)}
    </Accordion>
  );
};
