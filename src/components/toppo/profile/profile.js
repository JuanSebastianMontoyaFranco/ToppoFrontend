import React from "react";
import { Col, Row, Breadcrumb } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { ChoosePhotoWidget } from "../../widgets/Widgets";
import { ProfileForm } from "../forms/profile/form";

import toppoLogo from "../../../assets/img/logos/toppo-logo.png";

const Profile = () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0 mr-0">
          <Breadcrumb
            className="title-page"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Toppo</Breadcrumb.Item>
            <Breadcrumb.Item>Ajustes</Breadcrumb.Item>
            <Breadcrumb.Item active>Perfil</Breadcrumb.Item>
          </Breadcrumb>
          <h4 className="title-page">Perfil</h4>
          <p className="mb-0">Aquí podrás ver la información de tu perfil.</p>
        </div>
      </div>

      <Row>
         <Col xs={12} xl={8}>
          <ProfileForm />
        </Col> 

        {/* <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <ChoosePhotoWidget
                title="Selecciona una foto de perfil"
                photo={toppoLogo}
              />
            </Col>
          </Row>
        </Col> */}
      </Row>
    </>
  );
};

export default Profile;
