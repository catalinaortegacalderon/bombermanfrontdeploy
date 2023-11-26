import '../assets/styles/style_paginas_principales.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { UserContext } from '../assets/UserContext';

export default function InicioRegistrado() {
  const { userName, setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigation = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUserName(''); // Clear the userName
    navigate('/'); // Navigate to the home page
  };

  return (
        <div className='landing'>
            <div className='contenedor-landing'>
                <div className='box izquierda'>
                    <div className='contenedor-botones-y-titulo'>
                        <h1>Bomber</h1>
                        <h1>Checho Man</h1>
                        <br />
                        <a href='/iniciarpartida' onClick={(e) => handleNavigation(e, '/iniciarpartida')} className='boton-color-1'>Jugar</a>
                        <a href='/tienda' onClick={(e) => handleNavigation(e, '/tienda')} className='boton-color-2'>Tienda</a>
                        <a href='/usuario' onClick={(e) => handleNavigation(e, '/usuario')} className='boton-color-3'>Usuario</a>
                        <a href='/estadisticas' onClick={(e) => handleNavigation(e, '/estadisticas')} className='boton-color-4'>Estadísticas</a>
                        <a href='/' onClick={handleLogout} className='boton-color-5'>Salir</a>  {/* Updated this line */}
                    </div>
                </div>
                <div className='box derecha'>
                    <img src={'../src/assets/images/logo.png'} />
                </div>
            </div>
        </div>
  );
}
