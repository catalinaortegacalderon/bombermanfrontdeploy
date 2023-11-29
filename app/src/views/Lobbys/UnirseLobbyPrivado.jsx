import '../../assets/styles/style_paginas_principales.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import BackButton from '../../components/buttons/BackButton';
import InputBox from '../../components/input_box';
import StandardButton from '../../components/buttons/Boton_estandar';
import { UserContext } from '../../assets/UserContext';
import axios from 'axios';

// const response = {
//   status: 200,
//   body: {
//     id: 1,
//     nombre: 'lobby1',
//     contraseña: '123',
//     cantidad_jugadores: 1,
//     createdAt: '2021-10-30T14:24:37.209Z',
//     updatedAt: '2021-10-30T16:35:34.788Z',
//   },
// };

// const self_id = 1;
// const self_vida_base = 8;
// const self_bombas_base = 6;

export default function UnirseLobbyPrivado() {
  const { nombreLobby, setNombreLobby } = useContext(UserContext);
  const [Contraseña_lobby_privado, setContraseña_lobby_privado] = useState('');
  const { idpartida, setIdpartida } = useContext(UserContext);
  const { userName } = useContext(UserContext);
  const { jwtoken, setJwtoken } = useContext(UserContext);
  const history = useNavigate(); // hook para navegar paths
  
  const Redirect = async () => {
    if (nombreLobby === '' || Contraseña_lobby_privado === '') {
      alert('Debes rellenar todos los campos');
    } else {
      try {
        const infousuario = await axios({
          method: 'get',
          url: `${import.meta.env.VITE_BACKEND_URL}/usuarios/${userName}`,
          headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
        });
        console.log('infousuario:', infousuario.data);

        const respuesta = await axios({
          method: 'get',
          url: `${import.meta.env.VITE_BACKEND_URL}/partidas/${idpartida}`,
          headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
        });
        console.log('Respuesta 1:', respuesta.data);
        if(!respuesta){
          alert("lobby no existe");
        }
        else if (respuesta.data.contraseña === Contraseña_lobby_privado) {
          if (respuesta.data.cantidad_jugadores === 4) {
            alert("lobby lleno");
          } else {
            const respuesta1 = await axios({
              method: 'post',
              url: `${import.meta.env.VITE_BACKEND_URL}/jugadores`,
              data: {
                id_partida: idpartida,
                id_usuario: id,
                vida_restante: infousuario.vida_base,
                bombas_restantes: infousuario.bombas_base,
              },
              headers: {
                'Authorization': `Bearer ${jwtoken}`
              }
            });
            console.log('Respuesta 1:', respuesta1.data);
            history('/esperando'); // Redirigir a otra página
          }
        }
        else{
          alert("contraseña incorrecta");
        }
      } catch (error) {
        alert('Nombre o contraseña incorrecta');
        console.error('Ocurrió un error:', error);
      }
    }
  };

  return (
    <div className='login'>
      <div className='contenedor-lobby'>
        <h1>Unirse Lobby Privado</h1>
        <InputBox name="Nombre Lobby" setter={setNombreLobby} value={nombreLobby} />
        <InputBox name="Contraseña Lobby" setter={setContraseña_lobby_privado} value={Contraseña_lobby_privado} type='password' />
        <div className='contenedor-botones'>
          <BackButton />
          <StandardButton text='Jugar' redirect_function={Redirect} />
        </div>
      </div>
      <div className='foto'>
        <img src={'../public/images/logo.png'} className="contenedor-foto" alt="Logo" />
      </div>
    </div>
  );
}
