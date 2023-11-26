import '../assets/styles/style_paginas_principales.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/buttons/BackButton';
import StandardButton from '../components/buttons/Boton_estandar';
import InputBox from '../components/input_box';
import { UserContext } from '../assets/UserContext';

// simulando que se recibe una response
const response = {
  status: 200,
  body: {
    id: 1,
    usuario: 'grupochecho',
    mail: 'cata@gmail.com',
    contraseña: '123',
    experiencia: 0,
    monedas: 0,
    createdAt: '2023-10-30T14:24:37.209Z',
    updatedAt: '2023-10-30T14:24:37.209Z',
  },
};

export default function InicioSesion() {
  const history = useNavigate(); // hook para navegar paths
  const { userName, setUserName } = useContext(UserContext);
  const [userNameLocal, setUserNameLocal] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const Redirect = () => {
    console.log('MANDAR REQUEST A METODO GET Y A ENDPOINT http://localhost:3000/usuarios/', userName);
    if (response.status == 200) {
      if (response.body.contraseña == userPassword) {
        setUserName(userNameLocal);
        history('/inicioregistrado');
      } else {
        alert('Contraseña o usuario incorrecto');
      }
    } else {
      alert('Contraseña o usuario incorrecto');
    }
  };

  return (
        <div className='login'>
            <div className='foto-iniciosesion'>
                <img src={'../src/assets/images/logo.png'} className="contenedor-foto" />
            </div>
            <div className='contenedor-iniciosesion'>
                <h1>Iniciar sesión</h1>
                <InputBox name="Usuario" setter={setUserNameLocal} value={userNameLocal} />
                <InputBox name="Contraseña" setter={setUserPassword} value={userPassword} type='password' />
                <div className='contenedor-botones'>
                    <BackButton />
                    <StandardButton text='Ingresar' redirect_function={Redirect} />
                </div>
            </div>
        </div>
  );
}
