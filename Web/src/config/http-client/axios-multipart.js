import axios from 'axios';

// URL base -> http://localhost:8080/api/saem
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
const AxiosMultipartClient = axios.create({
    baseURL: SERVER_URL,
});

const requestHandler = (req) => {
    const session = JSON.parse(localStorage.getItem('user'));
    if (session?.token) {
        req.headers['Authorization'] = `Bearer ${session.token}`;
    }
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