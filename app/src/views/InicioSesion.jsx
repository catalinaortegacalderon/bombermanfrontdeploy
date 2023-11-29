import '../assets/styles/style_paginas_principales.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/buttons/BackButton';
import StandardButton from '../components/buttons/Boton_estandar';
import InputBox from '../components/input_box';
import { UserContext } from '../assets/UserContext';
import axios from 'axios';



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
  const { jwtoken, setJwtoken } = useContext(UserContext);
  const { id, setId} = useContext(UserContext);
  const [userNameLocal, setUserNameLocal] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const dataToSend = {
    usuario: userNameLocal,
    contraseña: userPassword,
  };

  const Redirect = () => {

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, dataToSend)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        setUserName(userNameLocal);
        setJwtoken(response.data.access_token);
        console.log("imprimiendo id en login", response.data.id)
        setId(response.data.id);
        console.log('token:', response.data.access_token);
        history('/inicioregistrado');
      })
      .catch(error => {
        console.error('Error al realizar la solicituddd:', error);
        alert('Usuario o contraseña incorrecta');
        console.log(error);
      });


  //   if (response.status == 200) {
  //     if (response.body.contraseña == userPassword) {
  //       setUserName(userNameLocal);
  //       history('/inicioregistrado');
  //     } else {
  //       alert('Contraseña o usuario incorrecto');
  //     }
  //   } else {
  //     alert('Contraseña o usuario incorrecto');
  //   }
  };

  return (
    <div className='login'>
      <div className='foto-iniciosesion'>
        <img src={'../public/images/logo.png'} className="contenedor-foto" />
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
