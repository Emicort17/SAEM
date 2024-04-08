import axios from 'axios';

// URL base -> http://localhost:8080/api/saem
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
const APP_MULTIPART = 'multipart/form-data'; // Cambiado a multipart/form-data
const AxiosMultipartClient = axios.create({
    baseURL: SERVER_URL,
});

const requestHandler = (req) => {
    req.headers['Accept'] = APP_MULTIPART; // Cambiado a multipart/form-data
    req.headers['Content-Type'] = APP_MULTIPART; // Cambiado a multipart/form-data
    const session = JSON.parse(localStorage.getItem('user'));
    if (session?.token) req.headers['Authorization'] = `Bearer ${session.token}`;
    return req;
};

AxiosMultipartClient.interceptors.request.use(
    (req) => requestHandler(req),
    (err) => Promise.reject(err)
);
AxiosMultipartClient.interceptors.response.use(
    (res) => Promise.resolve(res.data),
    (err) => Promise.reject(err)
);

export default AxiosMultipartClient;
