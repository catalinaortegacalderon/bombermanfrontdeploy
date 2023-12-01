import '../assets/styles/style_paginas_principales.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../assets/UserContext';

export default function IniciarPartida() {
  const { userName, setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigation = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  return (
        <div className='landing'>
            <div className='contenedor-landing'>
                <div className='box izquierda'>
                    <div className='contenedor-botones-y-titulo'>
                        <h1>Iniciar</h1>
                        <h1>Partida...</h1>
                        <br />
                        <a href='/crearlobbypublico' onClick={(e) => handleNavigation(e, '/crearlobbypublico')} className='boton-color-2'>Iniciar Lobby</a>
                        <a href='/unirselobbypublico' onClick={(e) => handleNavigation(e, '/unirselobbypublico')} className='boton-color-4'>Unirse Lobby</a>
                    </div>
                </div>
                <div className='box derecha'>
                    <img src={'../public/images/logo.png'} className="contenedor-foto" />
                </div>
            </div>
        </div>
  );
}
