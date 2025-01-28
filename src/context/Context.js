import React, { useState, useEffect } from "react";
import axios from '../config/axios';

const Context = React.createContext([{}, () => { }]);

const Provider = props => {
    const initialAuthState = JSON.parse(localStorage.getItem('auth')) || {
        user_id: '',
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


    return (
        <Context.Provider value={[auth, saveAuth]}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, Provider }