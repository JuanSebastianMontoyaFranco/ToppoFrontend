import axios from 'axios';

const DEV_PORT = process.env.REACT_APP_DEV_PORT;
const PROD_PORT = process.env.REACT_APP_PROD_PORT;

const baseURL = process.env.REACT_APP_NODE_ENV === 'development' ? DEV_PORT : PROD_PORT;

const axiosConfig = axios.create({
    baseURL: baseURL,
});

export default axiosConfig;
