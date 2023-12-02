import '../../assets/styles/style_paginas_principales.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/buttons/BackButton';
import InputBox from '../../components/input_box';
import StandardButton from '../../components/buttons/Boton_estandar';
import { UserContext } from '../../assets/UserContext';
import axios from 'axios';
import logoImg from '../../public/images/logo.png';

export default function CrearLobbyPublico() {
  const { nombreLobby, setNombreLobby } = useContext(UserContext);
  const history = useNavigate(); // hook para navegar paths
  const { jwtoken, setJwtoken } = useContext(UserContext);
  const { idpartida, setIdpartida } = useContext(UserContext);
  const { idtablero, setIdtablero } = useContext(UserContext);
  const {idjugador, setIdjugador} = useContext(UserContext);
  const { id, setId } = useContext(UserContext);
  const { userName } = useContext(UserContext);
  const { numjugador, setNumjugador } = useContext(UserContext);

  const Redirect = async () => {
    try {
      if (nombreLobby === '') {
        alert('Debes rellenar todos los campos');
      } else {

        console.log("IMRPIMIENDO EL ID", id);

        const infousuario = await axios({
          method: 'get',
          url: `${import.meta.env.VITE_BACKEND_URL}/usuarios/${userName}`,
          headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
        });
        console.log('infousuario:', infousuario.data);

        // Primera petición
        const respuesta1 = await axios({
          method: 'get',
          url: `${import.meta.env.VITE_BACKEND_URL}/partidas/${nombreLobby}`,
          headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
        });

        await setIdpartida(respuesta1.data.id);
        console.log('Respuesta 1:', respuesta1.data);
        if (respuesta1.data.cantidad_jugadores >= 2) {
          alert('El lobby está lleno.');
          return;
        }

        console.log('idpartida:', respuesta1.data.id);

        // Segunda petición
        const respuesta2 = await axios({
          method: 'get',
          url: `${import.meta.env.VITE_BACKEND_URL}/tablero/${respuesta1.data.id}`,
          headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
        });
        setIdtablero(respuesta2.data.id);
        console.log('Respuesta 2:', respuesta2.data);

        // Tercera petición
        const respuesta3 = await axios({
          method: 'post',
          url: `${import.meta.env.VITE_BACKEND_URL}/jugadores`,
          data: {
            id_partida: respuesta1.data.id,
            id_usuario: id,
            vida_restante: infousuario.data.vida_base,
            bombas_restantes: infousuario.data.bombas_base,
          },
          headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
        });
        setIdjugador(respuesta3.data.id);
        console.log('Respuesta 3:', respuesta3.data);

        console.log('nombreLobby:', nombreLobby);
        const nueva_cantidad_jugadores = respuesta1.data.cantidad_jugadores + 1;
        console.log('cantidad_jugadores nueva:', nueva_cantidad_jugadores);

        const respuesta4 = await axios({
          method: 'patch',
          url: `${import.meta.env.VITE_BACKEND_URL}/partidas/${nombreLobby}`,
          data: {
            cantidad_jugadores: '2'
          },
          headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
        });
        console.log('Respuesta 4:', respuesta4.data);
        await setNumjugador(2);

        const respuesta5 = await axios({
          method: 'patch',
          url: `${import.meta.env.VITE_BACKEND_URL}/tablero/${respuesta1.data.id}`,
          data: {
            jugador2: id,
          },
          headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
        });
        console.log('Respuesta 5:', respuesta5.data);

        //alert('lobby creado con éxito');
        // Redirigir a otra página
        console.log('idpartida:', idpartida);


        // arreglar lo de juego lleno
        // if (respuesta1.data.cantidad_jugadores == 2) {
        //   setNumjugador(2);
          history('/esperando');
        // }
        // else {
        //   alert("juego lleno");
        // }
      }
    } catch (error) {
      console.error('Ocurrió un error:', error);
      console.error('Ocurrió un error:', error.response);
      if (error.response && error.response.status === 409) {
        alert('Nombre ocupado');
      } else {
        alert('Ocurrió un error :(');
      }
    }
  };

  return (
    <div className='login'>
      <div className='contenedor-lobby-publico'>
        <h1>Unirse Lobby Público</h1>
        <InputBox name="Nombre Lobby" setter={setNombreLobby} value={nombreLobby} />
        <div className='contenedor-botones'>
          <BackButton />
          <StandardButton text='Jugar' redirect_function={Redirect} />
        </div>
      </div>
      <div className='foto'>
        <img src={logoImg} className="contenedor-foto" />
      </div>
    </div>
  );
}