import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Nav, Image, Navbar, Dropdown, Container } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import { Context } from "../../context/Context";
import { AlertCancelConfirm } from "../alerts/Alerts";

import toppoLogo from '../../assets/img/logos/toppo-logo.png';

const Header = (props) => {
  const [auth, saveAuth] = useContext(Context);

  // Define la URL base para las imágenes
  const BASE_IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_PROFILE_URL;

  const getInitial = () => {
    if (auth.role === 'admin') {
      return auth.name ? auth.name.charAt(0).toUpperCase() : '';
    } else {
      return auth.first_name ? auth.first_name.charAt(0).toUpperCase() : '';
    }
  };


  const photoUrl = auth.image_url ? `${BASE_IMAGE_URL}${auth.image_url}` : null;

  const logOut = () => {
    saveAuth({
      token: '',
      auth: false
    });

    localStorage.clear();
    sessionStorage.clear();

    window.location.href = '/login';

  };

  const confirmLogOut = () => {
    AlertCancelConfirm(
      '¿Estás seguro?',
      '¡No podrás revertir esto!',
      'warning',
      '#d33',
      '#6a3d36',
      'Cancelar',
      'Cerrar sesión',
      '¡Cerrado!',
      'Has cerrado sesión exitosamente.',
      'success',
      logOut
    )
  };

  const displayName = `${auth.first_name} ${auth.last_name}`;

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0 d-none d-md-block">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">

          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">

                  {photoUrl ? (
                    <Image src={photoUrl} className="user-avatar md-avatar rounded-circle" />
                  ) : (
                    <div
                      className=" avatar-initial user-avatar md-avatar rounded-circle d-flex justify-content-center align-items-center">
                      {getInitial(auth.first_name)}
                    </div>
                  )}

                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">{displayName}</span>
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item as="button" className="fw-bold" onClick={confirmLogOut}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" />
                  Cerrar sesión
                </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
