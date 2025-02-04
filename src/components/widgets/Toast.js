import React from "react";
import { Toast, Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBootstrap } from "@fortawesome/free-brands-svg-icons";

const ToastNotification = ({ message, show, onClose }) => {
  return (
    <Toast show={show} onClose={onClose} className="my-3">
      <Toast.Header className="text-primary">
        <FontAwesomeIcon icon={faBootstrap} />
        <strong className="me-auto ms-2">Toppo</strong>
        <small>Justo ahora</small>
        <Button variant="close" size="xs" onClick={onClose} />
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastNotification;
