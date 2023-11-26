import '../assets/styles/style_paginas_principales.css';
import { useContext } from 'react';
import BackButton from '../components/buttons/BackButton';
import { UserContext } from '../assets/UserContext';

export default function Usuario() {
  const { userName } = useContext(UserContext);
  return (
        <div className='login'>
            <div className='contenedor-usuario'>
                <h1>Usuario</h1>
                <p>Nombre de Usuario: {userName}</p>
                <br />
                <p>Mail: grupochecho@tech.cl</p>
                <div className='contenedor-botones'>
                    <BackButton />
                </div>
            </div>
        </div>
  );
}
