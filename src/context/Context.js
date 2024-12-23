import React, { useState, useEffect } from "react";
import axios from '../config/axios';

const Context = React.createContext([{}, () => { }]);

const Provider = props => {
    const initialAuthState = JSON.parse(localStorage.getItem('auth')) || {
        user_id: '',
        name: '',
        store_name: '',
        store_id: '',
        seller_id: '',
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        token: '',
        token_serpi: '',
        secret_key_serpi: '',
        image_url: '',
        auth: false,
    };

    const [auth, saveAuth] = useState(initialAuthState);
    const [allWholesaleStores, setAllWholesaleStores] = useState([]);
    const [loadingWholesaleStores, setLoadingWholesaleStores] = useState(true); 


    useEffect(() => {
        // Guardar el estado de autenticación en localStorage cuando cambie
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get(`/wholesale/store/list`);
                setAllWholesaleStores(response.data.rows);
                //console.log('Usuarios asignados a allWholesaleStores:', response.data.rows);
            } catch (error) {
                //console.error('Error al obtener usuarios:', error);
            } finally {
                setLoadingWholesaleStores(false); 
            }
        };

        fetchStores();
    }, []);

    return (
        <Context.Provider value={[auth, saveAuth, allWholesaleStores, loadingWholesaleStores]}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, Provider }