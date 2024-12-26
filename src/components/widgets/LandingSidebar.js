import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Nav, Image, Button, Navbar } from '@themesberg/react-bootstrap';

import { Routes } from "../../routes";
import toppoLogo from "../../assets/img/logos/toppo-logo.png";

const LandingSidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const NavItem = ({ title, link, icon }) => {
    const navItemClassName = link === pathname ? "active" : "";
    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link as={Link} to={link}>
          <span>
            {icon && <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>}
            <span className="sidebar-text">{title}</span>
          </span>
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      {/* Navbar visible solo en dispositivos móviles */}
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5">
          <Image
            src={toppoLogo}
            className="navbar-brand-light img-fluid"
            style={{ height: '50px', width: 'auto' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>

      {/* Sidebar solo visible en dispositivos móviles */}
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <div className={`collapse ${showClass} sidebar d-md-none bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between pb-4">
              <div className="d-flex align-items-center">
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Ingresa" link={Routes.Login.path} />
              <NavItem title="Planes"  />
              <NavItem title="Contacto"  />
            </Nav>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default LandingSidebar;
