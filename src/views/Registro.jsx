import '../assets/styles/style_paginas_principales.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/buttons/BackButton';
import StandardButton from '../components/buttons/Boton_estandar';
import InputBox from '../components/input_box';
import { UserContext } from '../assets/UserContext';
import axios from 'axios';

// simulando que llega una response
// const response2 = {
//   status: 201,
//   body: {
//     id: 7,
//     usuario: 'cataortega2',
//     mail: 'cata@gmail.com',
//     contraseña: '123',
//     createdAt: '2023-10-30T14:24:37.209Z',
//     updatedAt: '2023-10-30T16:35:34.788Z',
//     experiencia: 0,
//     monedas: 0,
//   },
// };

export default function Registro() {
  const [userMail, setUserMail] = useState('');
  const { userName, setUserName } = useContext(UserContext);
  const { jwtoken, setJwtoken } = useContext(UserContext);
  const [userNameLocal, setUserNameLocal] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState('');
  const { id, setId} = useContext(UserContext);
  const history = useNavigate(); // hook para navegar paths

  const RedirectRegister = () => {

    console.log(userMail, userNameLocal, userPassword, userPasswordConfirmation);

    const dataToSend = {
      usuario: userNameLocal,
      contraseña: userPassword,
      mail: userMail
    };
    if (userMail === '' || userNameLocal === '' || userPassword === '' || userPasswordConfirmation === '') {
      alert('Debes rellenar todos los campos');
    } else if (userPassword !== userPasswordConfirmation) {
      alert('Confirmación de contraseña incorrecta');
      
    } else {

      // axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
      //   usuario: userNameLocal,
      //   contraseña: userPassword,
      //   mail: userMail
      // })
      //   .then((response) => {
      //     console.log('Respuesta del servidor:', response.data);
      //     if (response.status == 400) {
      //       alert('Nombre de usuario o mail ocupado');
      //     } else if (response.status == 201) {
      //       alert('Usuario creado con éxito');
      //       setUserName(userNameLocal);
      //       history('/inicioregistrado');
      //     } else {
      //       alert('Error al crear usuario');
      //     }
      //   })
      //   .catch((error) => {
      //     console.error('Error al realizar la solicitud:', error);
      //   });


const authInfo = {
  usuario: 'nombreUsuario',
  mail: 'correo@ejemplo.com',
  contraseña: 'contraseñaSegura'
};

axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, dataToSend)
  .then(response => {
    console.log('Respuesta del servidor:', response.data);
                alert('Usuario creado con éxito');
            setUserName(userNameLocal);
            setJwtoken(response.data.access_token);
            setId(response.data.id);
            console.log('token:', response.data.access_token)
            history('/inicioregistrado');
  })
  .catch(error => {
    console.error('Error al realizar la solicituddd:', error);
    alert('Usuario ocupado, mail ocupado, o mail inválido');
  });
      

    // axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`,{
    //   usuario: userName,
    //   contraseña: userPassword,
    //   mail: userMail
    // })
}
  };

  return (
        <div className='login'>
            <div className='foto'>
                <img src={'../public/images/logo.png'} className="contenedor-foto" />
            </div>
            <div className='contenedor-registrarse'>
                <h1>Registrarse</h1>
                <InputBox name="Mail" setter={setUserMail} value={userMail} type='email'/>
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
