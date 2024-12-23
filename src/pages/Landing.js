import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHeart, faBook, faExternalLinkAlt, faTimesCircle, faCheckCircle, faCalendarAlt, faCodeBranch, faShoppingCart, faFolder, faMapMarkedAlt, faPager, faFileCode, faDownload, faL } from "@fortawesome/free-solid-svg-icons";
import { faBootstrap, faGithub, faJs, faReact, faSass, } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge, NavItem, Popover, Toast } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import SimpleBar from 'simplebar-react';
import { CSSTransition } from 'react-transition-group';
import { Routes as RoutesConfig } from '../routes';

import rabbitLogo from '../assets/img/logos/rabbit-logo-black.png';
import rabbitLogoBlack from '../assets/img/logos/rabbit-iso.png';
import toppoLogo from '../assets/img/logos/toppo-logo.png';
import { Routes } from "../routes";

import BS5Logo from "../assets/img/technologies/bootstrap-5-logo.svg";
import ReactLogo from "../assets/img/technologies/react-logo.svg";

import CustomToast from '../components/widgets/ToastCooming'; // Ajusta la ruta según tu estructura de archivos


export default () => {

    return (
        <>
            <section className="section-header overflow-hidden pt-5 pt-lg-6 pb-9 pb-lg-12 bg-gray-400 text-primary" id="home">
                <Container>
                    <Row>
                        <Col xs={12} className="text-center">
                            <div className="react-big-icon d-none d-lg-block"><span className="fab fa-react"></span></div>
                            <h1 className="fw-bolder text-secondary">Toppo</h1>
                            <p className="text-muted fw-light mb-5 h5">Plataforma de sincronizacion y mayoristas</p>
                            <div className="d-flex align-items-center justify-content-center">
                                {/* Aquí se agrega el onClick */}
                                {/* <Button variant="primary" as={Link} className="text-white me-3" >
                                    Comienza ahora
                                </Button> */}
                            </div>

                            <div className="d-flex justify-content-center flex-column mb-6 mb-lg-5 mt-5">
                                <div className="text-center">
                                    <a href="https://rabbitstudio.co" target="_blank">
                                        <Image src={rabbitLogoBlack} height={70} width={200} className="mb-3" alt="Themesberg Logo" />
                                        <p className="text-muted font-small m-0">Desarrollado con  <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />   por Rabbit</p>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <figure className="position-absolute bottom-0 left-0 w-100 d-none d-md-block mb-n2">
                        <svg className="fill-soft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 185.4">
                            <path d="M3000,0v185.4H0V0c496.4,115.6,996.4,173.4,1500,173.4S2503.6,115.6,3000,0z" />
                        </svg>
                    </figure>
                </Container>
            </section>
            <section className="section section-lg bg-white" id="download">
                <Container>
                    <Row>
                        <Col xs={12} lg={8}>
                            <h2 className="fw-light mb-3">Comienza ahora</h2>
                            <p className="lead mb-4 me-lg-6">Que esperas para potenciar tu negocio</p>
                        </Col>
                        <Col xs={12} lg={4}>
                            <div className="github-big-icon">
                                <Image src={toppoLogo} alt="Toppo Logo" height={600} width={600} />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-6">
                        <Col xs={12} md={6} lg={4} className="mb-5 mb-lg-0">
                            <Card border="light" className="p-4">
                                <Card.Header className="bg-white border-0 pb-0">
                                    <span className="d-block">
                                        <h2 className="text-primary fw-bold align-top">Gratis</h2>
                                    </span>
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup className="list-group-flush price-list">
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Catálogo ilimitado
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faTimesCircle} className="text-danger me-2" /> Hasta 200 pedidos
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faTimesCircle} className="text-danger me-2" /> Hasta 5 canales
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faTimesCircle} className="text-danger me-2" /> No más de 2000 sincronizaciones
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faTimesCircle} className="text-danger me-2" /> Herramientas con inteligencia artificial
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                                <Button href="https://themesberg.com/product/dashboard/volt-react" target="_blank" variant="success" className="w-100 m-0 mt-3 mb-3">Empezar</Button>
                            </Card>
                        </Col>
                        <Col xs={12} md={6} lg={4} className="mb-5 mb-lg-0">
                            <Card border="light" className="p-4 py-5 mt-lg-n5">
                                <Card.Header className="bg-white border-0 pb-0">
                                    <span className="d-block">
                                        <h2 className="text-primary fw-bold align-top">Básico (Más vendido)</h2>
                                    </span>
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup className="list-group-flush price-list">
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Catálogo ilimitado
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Pedidos ilimitados
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Canales ilimitados
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Sincronizaciones ilimitadas
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Herramientas con inteligencia artificial
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 border-0 ps-0 pb-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Premium Support
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                                <Button target="_blank" variant="success" className="w-100 m-0 mt-3">Empezar</Button>
                            </Card>
                        </Col>
                        <Col xs={12} md={6} lg={4} className="mb-5 mb-lg-0">
                            <Card border="light" className="p-4">
                                <Card.Header className="bg-white border-0 pb-0">
                                    <span className="d-block">
                                        <h2 className="text-primary fw-bold align-top">Enterprise</h2>
                                    </span>
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup className="list-group-flush price-list">
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Catálogo ilimitado
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Pedidos ilimitados
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Canales ilimitados
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Sincronizaciones ilimitadas
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 ps-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Herramientas con inteligencia artificial
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-white border-0 border-0 ps-0 pb-0">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Premium Support
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                                <Button href="https://themesberg.com/product/dashboard/volt-react" target="_blank" variant="success" className="w-100 m-0 mt-3 mb-3">Empezar</Button>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-lg-6">
                        <Col xs={12} className="text-center">
                            <h2 className="h5 text-gray fw-normal mb-4">Realizado con tecnologías como:</h2>
                            <div>
                                <Card.Link href="https://themesberg.com/product/admin-dashboard/volt-bootstrap-5-dashboard" target="_blank" className="me-3">
                                    <OverlayTrigger placement="top" trigger={['hover', 'focus']} overlay={<Tooltip>Bootstrap 5 · The most popular HTML, CSS, and JS library in the world.</Tooltip>}>
                                        <Image src={BS5Logo} className="image image-sm" />
                                    </OverlayTrigger>
                                </Card.Link>

                                <Card.Link href="https://themesberg.com/product/dashboard/volt-react" target="_blank" className="me-3">
                                    <OverlayTrigger placement="top" trigger={['hover', 'focus']} overlay={<Tooltip>React · A JavaScript library for building user interfaces.</Tooltip>}>
                                        <Image src={ReactLogo} className="image image-sm" />
                                    </OverlayTrigger>
                                </Card.Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <footer className="footer py-6 bg-dark text-white">
                <Container>
                    <Row>
                        <Col md={4}>
                            <Navbar.Brand as={HashLink} to="#home" className="me-lg-3 mb-3 d-flex align-items-center">
                                <Image src={toppoLogo} />
                                <span className="ms-2 brand-text">Toppo</span>
                            </Navbar.Brand>
                            <p>Volt React is a free and open source admin dashboard template powered by React.js and Bootstrap 5.</p>
                        </Col>
                        <Col xs={6} md={2} className="mb-5 mb-lg-0">
                            <span className="h5">Toppo</span>
                            <ul className="links-vertical mt-2">
                                <li><Card.Link target="_blank" href="https://themesberg.com/blog">Blog</Card.Link></li>
                                <li><Card.Link target="_blank" href="https://themesberg.com/products">Productos</Card.Link></li>
                                <li><Card.Link target="_blank" href="https://themesberg.com/about">Sobre nosotros</Card.Link></li>
                                <li><Card.Link target="_blank" href="https://themesberg.com/contact">Contáctanos</Card.Link></li>
                            </ul>
                        </Col>
                        <Col xs={6} md={2} className="mb-5 mb-lg-0">
                            <span className="h5">Otros</span>
                            <ul className="links-vertical mt-2">
                                <li>
                                    <Card.Link as={Link} target="_blank">Comienza ahora</Card.Link>
                                </li>
                                <li><Card.Link as={Link} target="_blank">Cambios</Card.Link></li>
                                <li><Card.Link target="_blank" href="https://themesberg.com/licensing">Licencia</Card.Link></li>
                            </ul>
                        </Col>
                        <Col xs={12} md={4} className="mb-5 mb-lg-0">
                            <span className="h5 mb-3 d-block">Suscríbete</span>
                            <form action="#">
                                <div className="form-row mb-2">
                                    <div className="col-12">
                                        <input type="email" className="form-control mb-2" placeholder="example@company.com" name="email" aria-label="Subscribe form" required />
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-secondary text-dark shadow-soft btn-block" data-loading-text="Sending">
                                            <span>Suscríbete</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <p className="text-muted font-small m-0">Nunca compartiremos sus datos. Vea nuestra <Card.Link className="text-white" href="#">Política de privacidad</Card.Link></p>
                        </Col>
                    </Row>
                    <hr className="bg-gray my-5" />
                    <Row>
                        <Col className="mb-md-2">
                            <Card.Link href="https://themesberg.com" target="_blank" className="d-flex justify-content-center">
                                <Image src={rabbitLogoBlack} height={35} className="d-block mx-auto mb-3" alt="Themesberg Logo" />
                            </Card.Link>
                            <div className="d-flex text-center justify-content-center align-items-center" role="contentinfo">
                                <p className="font-weight-normal font-small mb-0">Desarrollado con <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} /> por Rabbit<span className="current-year">2021</span></p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};
