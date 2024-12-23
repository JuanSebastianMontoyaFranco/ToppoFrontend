// src/components/CustomToast.js

import React, { useState, useEffect } from 'react';
import { Toast, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const CustomToast = ({ show, onClose, message }) => {
    // Efecto para cerrar el Toast después de 3 segundos
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <Toast
            show={show}
            onClose={onClose}
            className="bg-white text-dark my-3 position-absolute top-0 end-0"
            style={{ zIndex: 1050 }} // Asegúrate de que el Toast esté encima de otros elementos
        >
            <Toast.Header className="text-primary" closeButton={false}>
                <strong className="me-auto ms-2">Con <FontAwesomeIcon icon={faHeart} /> por Rabbit</strong>
                <Button variant="close" size="xs" onClick={onClose} />
            </Toast.Header>
            <Toast.Body>
                {message}
            </Toast.Body>
        </Toast>
    );
};

export default CustomToast;
