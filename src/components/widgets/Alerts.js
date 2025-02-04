import React, { useEffect } from "react";
import { Alert, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

function DismissableAlerts({ alerts }) {
  const [hiddenAlerts, setHiddenAlerts] = React.useState([]);

  const onClose = (alertId) => {
      const hiddenAlertsUpdated = [...hiddenAlerts, alertId];
      setHiddenAlerts(hiddenAlertsUpdated);
  };

  const shouldShowAlert = (alertId) => (
      hiddenAlerts.indexOf(alertId) === -1
  );

  useEffect(() => {
    // Para cada alerta, configura un temporizador para que desaparezca después de unos segundos
    alerts.forEach((alert) => {
      if (!hiddenAlerts.includes(alert.id)) {
        setTimeout(() => {
          onClose(alert.id); // Oculta la alerta después de 5 segundos (5000 ms)
        }, 5000); // Cambia 5000 a la cantidad de tiempo que desees
      }
    });
  }, [alerts, hiddenAlerts]);

  return (
      <React.Fragment>
          {alerts.map((alert) => (
              <Alert
                  key={alert.id}
                  variant={alert.variant}
                  show={shouldShowAlert(alert.id)}
                  onClose={() => onClose(alert.id)}
              >
                  <div className="d-flex justify-content-between">
                      <div>
                          <FontAwesomeIcon icon={faBullhorn} className="me-1" />
                          <strong>{alert.message}</strong>
                      </div>
                      <Button variant="close" size="xs" onClick={() => onClose(alert.id)} />
                  </div>
              </Alert>
          ))}
      </React.Fragment>
  );
}

export default DismissableAlerts;
