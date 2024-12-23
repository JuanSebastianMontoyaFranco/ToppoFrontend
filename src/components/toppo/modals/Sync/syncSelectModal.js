import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Spinner } from '@themesberg/react-bootstrap';
import axios from '../../../../config/axios';
import { simpleAlert } from "../../../alerts/Alerts";

const SyncSelectModal = ({ show, handleClose, auth }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [warehouseNumber, setWarehouseNumber] = useState('');
  const [credentials, setCredentials] = useState({
    token_serpi: '',
    secret_key_serpi: '',
    token_histoweb: '',
    url_histoweb_products: '',
    url_histoweb_services: '',
    master: null,
  });
  const [parameters, setParameters] = useState({ serpi_price_list: '', serpi_warehouse: '' });
  const [loading, setLoading] = useState(true);
  const [syncInProgress, setSyncInProgress] = useState(false);

  // Fetch de credenciales
  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await axios.get(`/credential/list/user/${auth.user_id}`);
        const credentialData = response.data.rows[0];
        setCredentials({
          token_serpi: credentialData.token_serpi,
          secret_key_serpi: credentialData.secret_key_serpi,
          token_histoweb: credentialData.token_histoweb,
          url_histoweb_products: credentialData.url_histoweb_products,
          url_histoweb_services: credentialData.url_histoweb_services,
          master: credentialData.master,
        });
        setLoading(false);
      } catch (error) {
        simpleAlert('Oops...', 'error', 'No se pudo cargar las credenciales');
        setLoading(false);
      }
    };

    fetchCredentials();
  }, [auth.user_id]);

  // Fetch de parámetros para Serpi
  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await axios.get(`/parameter/list/user/${auth.user_id}`);
        const parameterData = response.data.rows[0];
        setParameters({
          serpi_price_list: parameterData.serpi_price_list,
          serpi_warehouse: parameterData.serpi_warehouse,
        });
      } catch (error) {
        //simpleAlert('Oops...', 'error', 'No se pudo cargar los parámetros de Serpi');
      }
    };

    fetchParameters();
  }, [auth.user_id]);

  useEffect(() => {
    if (credentials.master === 1) {
      setSelectedOption('serpi');
    } else if (credentials.master === 2) {
      setSelectedOption('histoweb');
    }
  }, [credentials.master]);


  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleConfirm = async () => {
    setSyncInProgress(true);

    try {
      if (selectedOption === 'serpi') {
        if (!credentials.token_serpi || !credentials.secret_key_serpi) {
          simpleAlert('Error', 'error', 'Faltan credenciales para realizar la importación desde Serpi');
          return;
        }

        if (!parameters.serpi_price_list || !parameters.serpi_warehouse) {
          simpleAlert('Error', 'error', 'Los parámetros de Serpi no están configurados. Por favor, revisa serpi_price_list y serpi_warehouse.');
          return;
        }

        await axios.post(`/sync/createserpi`, {
          user_id: auth.user_id,
          token_serpi: credentials.token_serpi,
          secret_key_serpi: credentials.secret_key_serpi,
          price_list: parameters.serpi_price_list,
          warehouse: parameters.serpi_warehouse,
        });

        simpleAlert('Éxito', 'success', 'La sincronización desde Serpi ha finalizado con éxito.');
      } else if (selectedOption === 'histoweb') {
        if (!credentials.token_histoweb || !credentials.url_histoweb_products || !credentials.url_histoweb_services) {
          simpleAlert('Error', 'error', 'Faltan credenciales para realizar la importación desde Histoweb');
          return;
        }

        await axios.post(`/sync/createhistoweb`, {
          user_id: auth.user_id,
          token_histoweb: credentials.token_histoweb,
          url_histoweb_products: credentials.url_histoweb_products,
          url_histoweb_services: credentials.url_histoweb_services,
        });

        simpleAlert('Éxito', 'success', 'La sincronización desde Histoweb ha finalizado con éxito.');
      }
    } catch (error) {
      simpleAlert('Error', 'error', 'Hubo un problema durante la sincronización.');
    } finally {
      setSyncInProgress(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sincronizar productos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="selectSource">
          <Form.Label>Selecciona la fuente de datos</Form.Label>
          <Form.Control as="select" value={selectedOption} onChange={handleSelectChange} disabled={!selectedOption}>
            {!selectedOption && <option value="" disabled>Seleccionando...</option>}
            {credentials.master === 1 && <option value="serpi">Serpi</option>}
            {credentials.master === 2 && <option value="histoweb">Histoweb</option>}
          </Form.Control>

        </Form.Group>

        {syncInProgress && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Sincronizando...</span>
            </Spinner>
            <p>Sincronizando productos, esto puede tomar unos minutos...</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={syncInProgress}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleConfirm} disabled={syncInProgress}>
          {syncInProgress ? 'Sincronizando...' : 'Confirmar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SyncSelectModal;
