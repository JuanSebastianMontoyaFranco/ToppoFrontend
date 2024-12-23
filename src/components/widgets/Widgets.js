import React, { useContext, useState } from "react";
import { Card, Image } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Context } from "../../context/Context";

export const ChoosePhotoWidget = (props) => {
  const [auth, saveAuth] = useContext(Context);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_WHOLESALE_PROFILE_URL;
  const photoUrl = auth.image_url ? `${BASE_IMAGE_URL}${auth.image_url}` : null;

  const getInitial = () => {
    if (auth.role === 'admin') {
      return auth.name ? auth.name.charAt(0).toUpperCase() : '';
    } else {
      return auth.first_name ? auth.first_name.charAt(0).toUpperCase() : '';
    }
  };
  // Manejar cambio de archivo
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Subir la imagen
  // Subir la imagen
const handleUpload = async () => {
  if (!imageFile) return;

  const formData = new FormData();
  formData.append('profileImage', imageFile);  // Cambia 'file' por 'profileImage'

  try {
    setLoading(true);
    
    const response = await axios.put(`http://localhost:5000/api/wholesale/store/update/image/store/${auth.store_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Actualizar la imagen en el estado global
    const updatedImageUrl = response.data.image_url;
    saveAuth((prevAuth) => ({
      ...prevAuth,
      image_url: updatedImageUrl,
    }));

    setLoading(false);
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    setLoading(false);
  }
};


  const { title } = props;
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{title}</h5>
        <div className="d-xl-flex align-items-center">
          <div className="user-avatar xl-avatar">
            {photoUrl ? (
              <Image src={photoUrl} alt="Profile Image" />
            ) : (
              <div className="avatar-initial user-avatar md-avatar rounded-circle d-flex justify-content-center align-items-center">
                {getInitial(auth.name)}
              </div>
            )}
          </div>
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex clip-icon">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <input type="file" onChange={handleFileChange} />
                <div className="d-md-block text-start">
                  <div className="fw-normal text-dark mb-1">Selecciona una imagen</div>
                  <div className="text-gray small">JPG, GIF o PNG. tamaño máximo 800K</div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary mt-3"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? 'Subiendo...' : 'Subir Imagen'}
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
