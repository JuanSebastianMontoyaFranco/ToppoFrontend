import React, { useState } from "react";
import { Card } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./Styles.css"; // Archivo CSS adicional

const CredentialCard = ({ name, icon, image, formContent }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <Card className="text-center mb-3">
      <Card.Body>
        <div className="position-relative">
          <FontAwesomeIcon
            icon={faCog}
            className="cog-icon"
            onClick={toggleForm}
          />
        </div>
        {image ? (
          <img src={image} alt={name} className="mb-3" style={{ width: '20%', height: 'auto' }} />
        ) : (
          <FontAwesomeIcon icon={icon} className="mb-3" size="3x" />
        )}
        <Card.Title>{name}</Card.Title>
        <div className={`form-collapse ${isFormVisible ? "show" : ""}`}>
          {formContent}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CredentialCard;