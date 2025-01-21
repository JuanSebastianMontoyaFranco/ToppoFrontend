import { faHourglassHalf, faExclamationTriangle, faEdit, faEllipsisH, faEye, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import odooLogo from '../../assets/img/logos/odoo-logo.png';
import shopifyLogo from '../../assets/img/logos/shopify-logo.webp';
import toppoLogo from '../../assets/img/logos/toppo-logo.png';


export const getStateIcon = (state_toppo) => {
    switch (state_toppo) {
        case 1:
            return <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} title="Aprobado" />;
        case 2:
            return <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} title="Rechazado" />;
        case 3:
            return <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'orange' }} title="Alerta/Corrección" />;
        default:
            return <FontAwesomeIcon icon={faHourglassHalf} style={{ color: 'gray' }} title="Pendiente" />;
    }
};

export const getEcommerceReferenceIcon = (ecommerce_reference) => {
    switch (ecommerce_reference.toLowerCase()) {
        case "shopify":
            return <img src={shopifyLogo} alt="Shopify" style={{ width: '20px', height: '20px' }} />;
        case "toppo":
            return <img src={toppoLogo} alt="Toppo" style={{ width: '20px', height: '20px' }} />;
        case "odoo":
            return <img src={odooLogo} alt="Odoo" style={{ width: '20px', height: '20px' }} />;
        default:
            return <span className="fw-normal">{ecommerce_reference}</span>;
    }
};