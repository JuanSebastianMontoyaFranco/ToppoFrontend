import React from "react";
import { Nav, Image, Navbar, Container } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import toppoLogo from '../../assets/img/logos/toppo-logo.png';
import { Routes } from "../../routes";

const Header = (props) => {
  return (
    <Navbar variant="dark" expand="lg" bg="white" className="navbar-transparent navbar-theme-primary sticky-top d-none d-md-block">
      <Container className="position-relative justify-content-between px-3">
        <Navbar.Brand to="#home" className="me-lg-3 d-flex align-items-center">
          <Image src={toppoLogo} />
          <span className="ms-2 brand-text d-none d-md-inline">Toppo</span>
        </Navbar.Brand>

        <div className="d-flex align-items-center">
          <Navbar.Collapse id="navbar-default-primary">
            <Nav className="navbar-nav-hover align-items-lg-center">
              <Link to={Routes.Login.path} className="mx-3">Ingresa</Link>
              <Link to="/" className="mx-3 d-sm-none d-xl-inline" >Planes</Link>
              <Link to="/" className="mx-3" >Contacto</Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
