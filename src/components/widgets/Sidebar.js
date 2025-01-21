import React, { useState, useContext } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCog, faHandHoldingUsd, faSignOutAlt, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Accordion, Navbar } from '@themesberg/react-bootstrap';
import Swal from "sweetalert2";

import { Routes } from "../../routes";
import { Context } from "../../context/Context";

import toppoLogo from "../../assets/img/logos/toppo-logo.png";

const Sidebar = (props = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, saveAuth] = useContext(Context);
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const BASE_IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_PROFILE_URL;

  const photoUrl = auth.image_url ? `${BASE_IMAGE_URL}${auth.image_url}` : null;

  // Crear estados separados para cada acordeón
  const [isUsersAccordionOpen, setUsersAccordionOpen] = useState(false);
  const [isSettingsAccordionOpen, setSettingsAccordionOpen] = useState(false);

  // Función para verificar si la ruta está activa
  const isPathActive = (paths) => {
    return paths.some((path) => pathname.startsWith(path));
  };

  const logOut = () => {
    saveAuth({
      token: '',
      auth: false
    });

    localStorage.setItem('token', '');

    navigate('/login');
  };

  const confirmLogOut = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire(
          '¡Cerrado!',
          'Has cerrado sesión exitosamente.',
          'success'
        );
      }
    });
  };

  const onCollapse = () => setShow(!show);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const CollapsableNavItem = ({ eventKey, title, icon, isOpen, onToggle, children = null }) => {
    return (
      <Accordion as={Nav.Item} activeKey={isOpen ? eventKey : ""}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
            onClick={onToggle}
          >
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary", onClick } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => {
        if (onClick) onClick();
        else {
          setShow(false);
          setUsersAccordionOpen(false);
          setSettingsAccordionOpen(false);
        }
      }}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  // Verificar si el acordeón de usuarios debe estar abierto
  const shouldUsersAccordionOpen = isPathActive([

  ]);

  // Verificar si el acordeón de ajustes debe estar abierto
  const shouldSettingsAccordionOpen = isPathActive([

  ]);

  return (
    <>
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


      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">

                  {photoUrl ? (
                    <Image src={toppoLogo} className="card-img-top rounded-circle border-white" />
                  ) : (
                    <div
                      className=" avatar-initial-invert user-avatar md-avatar rounded-circle d-flex justify-content-center align-items-center">
                      {getInitial(auth.firts_name)}
                    </div>
                  )}
                </div>
                <div className="d-block">
                  <h6>¡Hola, {auth.name}!</h6>
                  <Button as={Link} variant="secondary" size="xs" className="text-dark" onClick={confirmLogOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Cerrar sesión
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem
                title="Dashboard"
                image={toppoLogo}
                link={Routes.Dashboard.path}
              />
              <NavItem title="Clientes" icon={faBoxOpen} />

              <NavItem title="Catálogo" link={Routes.Catalog.path} icon={faBoxOpen} />

              <NavItem title="Pedidos" link={Routes.Orders.path} icon={faHandHoldingUsd} />

              <CollapsableNavItem
                eventKey="/settings"
                title="Ajustes"
                icon={faCog}
                isOpen={isSettingsAccordionOpen || shouldSettingsAccordionOpen} // Mantener el acordeón abierto
                onToggle={() => setSettingsAccordionOpen(!isSettingsAccordionOpen)}
              >
                <NavItem
                  title="Credenciales"
                  link={Routes.Credentials.path}

                />
                <NavItem
                  title="Perfil"

                />
              </CollapsableNavItem>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

export default Sidebar;
