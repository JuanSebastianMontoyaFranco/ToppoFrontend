import React, { useContext, useState } from "react";
import clienteAxios from "../config/axios";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import bg from '../../assets/background-login.svg';
import { Col, Row, Form, Button } from '@themesberg/react-bootstrap';
import { simpleAlert } from "../helpers/SweetAlert";
import './Styles.css'

// Context
import { Context } from "../../context/Context";

function Register() {

    // Auth y token
    const [auth, saveAuth] = useContext(Context); // eslint-disable-line no-unused-vars

    const navigate = useNavigate();

    // State con los datos del formulario
    const [credentials, saveCredentials] = useState({});

    const Register = async e => {
        e.preventDefault();

        // Autenticar el usuario
        try {
            const respuesta = await clienteAxios.post('/user/register', credentials);
            // extraer el token y colocarlo en el localstorage
            const { token, user } = respuesta.data;
            localStorage.setItem('token', token);

            // Colocarlo en el state
            saveAuth({
                // User
                user_id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                department: user.department,
                city: user.city,
                rol: user.rol,
                token,
                state: user.state,
                confirmed: user.confirmed,
                image_url: user.image_url,
                auth: true
            });

            // alerta
            simpleAlert(
                'Bienvenido',
                'success',
                'Has iniciado sesión correctamente',
            )

            navigate('/dashboard');

        } catch (error) {
            simpleAlert(
                'Oops...',
                'error',
                error.response.data.message
            )
        }
    };

    const payment = async e => {
        e.preventDefault();

        // Realizar la solicitud al backend para obtener el init_point
        try {
            const respuesta = await clienteAxios.post('/user/wholesale/register');

            // Redirigir al usuario a la URL de MercadoPago
            window.location.href = respuesta.data.init_point;

        } catch (error) {
            simpleAlert(
                'Oops...',
                'error',
                error.response.data.message
            )
        }
    };


    const leerDatos = e => {
        saveCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="body-login" style={{ backgroundImage: `url(${bg})` }}>
            <div className="login-card-register">
                <div className="logo-header"></div>
                <h1>Regístrate</h1>
                <Form
                    onSubmit={Register}
                >
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group id="email">
                                <Form.Control
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Ingresa tu correo electrónico"
                                    onChange={leerDatos}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12} className="mb-3">
                            <Form.Group id="email">
                                <Form.Control
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="Ingresa tu contraseña"
                                    onChange={leerDatos}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <span className="line"></span>

                    <span className="link-secondary mb-2 mt-1">O ingresa con</span>

                    <div className="social-logins">
                        <button className="social-login"><i className="fab fa-facebook-f" style={{ color: 'blue' }}></i></button>
                        <button className="social-login"><i className="fab fa-google" style={{ color: 'red' }}></i></button>
                    </div>

                    <div className="mt-3">
                        <Button variant="primary" type="submit" className="w-100">Registrarme</Button>
                    </div>

                    <Row>
                        <a href="/login" className="mt-4">¿Ya tienes cuenta? Inicia sesión</a>

                    </Row>
                    <Row>
                        <Link className="link-secondary mt-6" to='/'><i className="fas fa-arrow-left"></i> Regresar a Homepage</Link>

                    </Row>

                </Form>

                <div className="mt-3">
                    <Button variant="primary" type="submit" className="w-100" onClick={payment}>Pagar</Button>
                </div>
            </div>

        </div>
    );
}

export default Register;
