import Swal from "sweetalert2";
import axios from 'axios';

// Alerta generica
export function simpleAlert(title, icon, text) {
    Swal.fire({
        title,
        icon,
        text
    }
    )
}

export function simpleAlertRecharge(title, icon, text, callback) {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed && callback) {
            callback();
        }
    })
}

export function AlertCancelConfirm(title, text, icon, cancelColor, confirmColor, cancelText, confirmText, successTitle, successText, successIcon, onConfirm) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: cancelColor,
        cancelButtonColor: confirmColor,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText
    }).then((result) => {
        if (result.isConfirmed) {
            // Ejecuta la función pasada como parámetro
            if (typeof onConfirm === 'function') {
                onConfirm();
            }
            Swal.fire(
                successTitle,
                successText,
                successIcon
            );
        }
    });
}

// Alerta para importaciones de productos
export const importAlert = async (title, inputOptions, inputType = 'radio', inputPlaceholder = 'Selecciona una opción') => {
    try {
        const { value: selectedOption } = await Swal.fire({
            title,
            input: inputType,
            inputOptions,
            inputPlaceholder,
            inputValidator: (value) => {
                if (!value) {
                    return 'Tienes que seleccionar una opción';
                }
            },
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            showCancelButton: true
        });

        if (selectedOption) {
            if (inputType === 'radio' && (selectedOption === 'excel' || selectedOption === 'csv')) {
                const { value: file } = await Swal.fire({
                    title: selectedOption === 'excel' ? 'Sube un archivo' : 'Sube una imagen',
                    input: 'file',
                    confirmButtonText: 'Subir',
                    showCancelButton: true
                });
                if (file) {
                    // Maneja el archivo subido aquí
                    console.log('Archivo subido:', file);
                }
            } else if (inputType === 'radio' && selectedOption === 'sendNumber') {
                const { value: number } = await Swal.fire({
                    title: 'Introduce el id de la lista de precios',
                    input: 'number',
                    confirmButtonText: 'Enviar',
                    showCancelButton: true
                });
                if (number) {
                    try {
                        const response = await axios.get('http://localhost:5000/api/sync/list', {
                            params: {
                                user_id: 'YOUR_USER_ID',
                                bodega_id: number,
                                token: 'YOUR_TOKEN',
                                secretkey: 'YOUR_SECRETKEY'
                            }
                        });
                        console.log('Respuesta de la API:', response.data);
                    } catch (error) {
                        console.error('Error en la solicitud API:', error);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error en la alerta:", error);
    }
};
