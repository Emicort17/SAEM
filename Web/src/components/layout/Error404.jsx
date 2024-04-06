import React from 'react';
import { Link } from 'react-router-dom';
import './Error404.css'; // Estilos CSS personalizados
import { useLocation,useNavigate } from 'react-router-dom';

const Error404 = () => {

    const navigate = useNavigate();


    const volver = (row) => {
        navigate('/');

    }

    return (
        <div className="error-container">
            <div className="error-message">
                <h1>¡Oh no!</h1>
                <h2>Parece que se daño el Harwere...</h2>
                <p style={{color:'#f0ad4e'}}>No pudimos encontrar la página que buscas.</p>
               
            </div>
            <div className="error-image">
                <img className=' cursor-pointer' src="/src/assets/Images/error.jpg" alt="Error 404" onClick={volver} />
            </div>
        </div>
    );
}

export default Error404;
