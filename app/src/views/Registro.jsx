import '../assets/styles/style_paginas_principales.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/buttons/BackButton';
import StandardButton from '../components/buttons/Boton_estandar';
import InputBox from '../components/input_box';
import { UserContext } from '../assets/UserContext';

// simulando que llega una response
const response = {
  status: 201,
  body: {
    id: 7,
    usuario: 'cataortega2',
    mail: 'cata@gmail.com',
    contraseña: '123',
    createdAt: '2023-10-30T14:24:37.209Z',
    updatedAt: '2023-10-30T16:35:34.788Z',
    experiencia: 0,
    monedas: 0,
  },
};

export default function Registro() {
  const [userMail, setUserMail] = useState('');
  const { userName, setUserName } = useContext(UserContext);
  const [userNameLocal, setUserNameLocal] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState('');
  const history = useNavigate(); // hook para navegar paths

  const RedirectRegister = () => {
    console.log('MANDAR REQUEST A METODO POST Y A ENDPOINT http://localhost:3000/usuarios/');
    console.log('EL BODY ES: \n "usuario:"', userName, ',mail:', userMail, ',contraseña:', userPassword, ', createdAt:', Date.now(), ', updatedAt:', Date.now());
    if (userMail === '' || userNameLocal === '' || userPassword === '' || userPasswordConfirmation === '') {
      alert('Debes rellenar todos los campos');
    } else if (userPassword !== userPasswordConfirmation) {
      alert('Confirmación de contraseña incorrecta');
    } else if (response.status == 400) {
      alert('Nombre de usuario ocupado');
    } else {
      alert('Usuario creado con exito');
      setUserName(userNameLocal);
      history('/inicioregistrado');
    }
  };

  return (
        <div className='login'>
            <div className='foto'>
                <img src={'../src/assets/images/logo.png'} className="contenedor-foto" />
            </div>
            <div className='contenedor-registrarse'>
                <h1>Registrarse</h1>
                <InputBox name="Mail" setter={setUserMail} value={userMail}/>
                <InputBox name="Usuario" setter={setUserNameLocal} value={userNameLocal}/>
                <InputBox name="Contraseña" setter={setUserPassword} value={userPassword} type='password'/>
                <InputBox name="Confirmar contraseña" setter={setUserPasswordConfirmation} value={userPasswordConfirmation} type='password'/>
                <div className='contenedor-botones'>
                    <BackButton />
                    <StandardButton text='Crear cuenta' redirect_function={RedirectRegister} />
                </div>
            </div>
        </div>
  );
}
