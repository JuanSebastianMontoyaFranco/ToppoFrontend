import React, { useContext, useState } from "react";
import axios from "../../../config/axios";
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Card } from '@themesberg/react-bootstrap';
import { simpleAlert } from "../../alerts/Alerts";
import { Routes } from "../../../routes";
import { Context } from "../../../context/Context";

import DismissableAlerts from '../../widgets/Alerts';

const Login = () => {
    const [, saveAuth] = useContext(Context); // eslint-disable-line no-unused-vars
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [alerts, setAlerts] = useState([]);

    const handleChange = ({ target: { name, value } }) => {
        setCredentials(prevState => ({ ...prevState, [name]: value }));
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/user/login', credentials);
            const { token, user } = data;

            localStorage.setItem('token', token);

            saveAuth({
                ...user,
                token,
                auth: true,
            });

            // En el Login.js
            const alerts = [{ id: 'success', variant: 'success', message: 'Has iniciado sesión correctamente' }];

            navigate('/dashboard', { state: { alerts } });

        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error al iniciar sesión';
            simpleAlert('Oops...', 'error', errorMsg);
        }
    };

    const renderInput = (id, label, type, icon) => (
        <Form.Group id={id} className="mb-4">
            <Form.Label>{label}</Form.Label>
            <InputGroup>
                <InputGroup.Text>
                    <FontAwesomeIcon icon={icon} />
                </InputGroup.Text>
                <Form.Control
                    required
                    type={type}
                    name={id}
                    placeholder={label}
                    onChange={handleChange}
                />
            </InputGroup>
        </Form.Group>
    );

    const closeAlert = (alertId) => {
        setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
    };

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <p className="text-center">
                        <Card.Link as={Link} to={Routes.Landing.path} className="text-gray-700">
                            <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Regresa al inicio
                        </Card.Link>
                    </p>
                    <Row className="justify-content-center form-bg-image">
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h2 className="mb-0">Toppo</h2>
                                    <h3 className="mb-0">Ingresa</h3>
                                </div>

                                {/* Alerts */}
                                <DismissableAlerts alerts={alerts} onClose={closeAlert} />

                                <Form className="mt-4" onSubmit={login}>
                                    {renderInput("email", "Tu correo", "email", faEnvelope)}
                                    {renderInput("password", "Tu contraseña", "password", faUnlockAlt)}

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <Card.Link className="small text-end">¿Olvidaste tu contraseña?</Card.Link>
                                    </div>

                                    <Button variant="primary" type="submit" className="w-100">
                                        Ingresa
                                    </Button>
                                </Form>

                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    <span className="fw-normal">
                                        ¿No estás registrado?
                                        <Card.Link as={Link} className="fw-bold">
                                            {` Crea una cuenta `}
                                        </Card.Link>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};

export default Login;
