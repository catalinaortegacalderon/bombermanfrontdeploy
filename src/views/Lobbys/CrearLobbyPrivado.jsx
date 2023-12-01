import React, { useState, useContext } from 'react';
import '../../assets/styles/style_paginas_principales.css';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/buttons/BackButton';
import JugarButton from '../../components/buttons/JugarButton';
import InputBox from '../../components/input_box';
import { UserContext } from '../../assets/UserContext';
import StandardButton from '../../components/buttons/Boton_estandar';
import axios from 'axios';

export default function CrearLobbyPrivado() {
  const { nombreLobby, setNombreLobby } = useContext(UserContext);
  const [Contraseña_lobby_privado, setContraseña_lobby_privado] = useState('');
  const history = useNavigate(); // hook para navegar paths
  const { jwtoken, setJwtoken } = useContext(UserContext);
  const { idpartida, setIdpartida } = useContext(UserContext);
  const { idtablero, setIdtablero } = useContext(UserContext);
  const {idjugador, setIdjugador} = useContext(UserContext);
  const { id, setId } = useContext(UserContext);
  const { userName } = useContext(UserContext);
  const [numjugador, setNumjugador] = useState('');
  const [matrizSeleccionada, setMatrizSeleccionada] = useState([
    ['1', 'L', 'L', 'M', '', 'L', 'B', 'F', '', '', 'L', 'L', '', '', ''],
    ['', '', '', 'L', 'L', 'L', 'L', 'L', 'L', 'L', '', '', 'M', 'L', ''],
    ['L', 'L', 'L', 'L', '', 'L', '', '', 'L', 'A', 'L', 'L', 'L', '', ''],
    ['', 'B', 'L', '', 'C', 'L', '', 'L', '', 'L', 'L', '', 'L', 'L', 'L'],
    ['', 'L', 'F', '', 'L', 'L', 'A', 'L', 'F', 'L', '', '', 'L', '', 'B'],
    ['', '', 'L', 'L', '', '', 'L', '', '', 'L', 'L', '', '', 'L', ''],
    ['', 'L', 'A', 'F', 'L', '', 'B', 'L', 'L', 'L', 'A', 'L', 'L', 'C', 'F'],
    ['L', 'L', 'L', 'C', '', 'L', '', 'L', 'F', 'L', '', 'L', 'L', '', 'L'],
    ['', 'M', '', 'L', '', 'L', 'L', 'L', '', 'L', 'B', 'L', '', 'L', ''],
    ['L', 'L', 'L', 'L', 'L', '', 'A', 'L', '', '', 'L', 'L', '', '', 'L'],
    ['', '', '', '', 'L', 'F', 'L', '', 'L', 'L', 'C', 'M', 'L', 'L', ''],
    ['', 'L', 'L', '', 'L', 'L', '', 'L', 'B', '', 'L', '', 'L', '', ''],
  ]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const manejarSeleccion = (opcion) => {
    if (opcion === '1') {
      setMatrizSeleccionada([
        ['1', '', '', 'M', '', 'L', 'B', 'F', '', '', 'L', 'L', '', '', ''],
        ['', '', '', 'L', 'L', 'L', 'L', 'L', 'L', 'L', '', '', 'M', 'L', ''],
        ['L', 'L', 'L', 'L', '', 'L', '', 'C', 'L', 'A', 'L', 'L', 'L', '', ''],
        ['', 'B', 'L', '', 'C', '', '', 'L', '', 'L', 'L', '', 'L', 'L', 'L'],
        ['', 'L', 'F', '', 'L', '', 'A', 'L', 'F', 'L', '', 'C', 'L', '', 'B'],
        ['', '', 'L', 'L', '', '', 'L', '', 'C', 'L', 'L', '', '', 'L', ''],
        ['', 'L', 'A', 'F', 'L', '', 'B', 'L', 'L', 'L', 'A', '', 'L', 'C', 'F'],
        ['L', 'L', 'L', 'C', '', '', '', 'L', 'F', 'L', '', '', 'L', '', 'L'],
        ['', 'M', 'B', 'L', 'C', '', 'L', 'L', '', 'L', 'B', '', '', 'L', ''],
        ['L', '', '', '', '', '', 'A', 'L', '', 'C', 'L', '', '', '', 'L'],
        ['', '', '', 'C', 'L', 'F', 'L', '', 'L', '', 'C', 'M', 'L', 'L', ''],
        ['', 'L', 'L', '', 'L', 'L', '', 'L', 'B', 'B', 'L', '', 'L', '', ''],
      ]);
    }
    else if (opcion === '2') {
      setMatrizSeleccionada([
        ['1', 'L', '', 'M', '', 'L', 'B', 'F', '', '', 'L', '', '', '', ''],
        ['', '', '', 'L', 'L', 'L', 'L', 'L', 'L', 'L', '', '', 'M', 'L', ''],
        ['L', 'L', 'L', '', '', 'L', '', '', 'L', 'A', 'L', '', 'L', '', ''],
        ['', 'B', 'L', '', 'C', 'L', '', 'L', '', 'L', 'L', '', '', 'L', 'L'],
        ['', '', 'F', '', '', '', 'A', 'L', 'F', '', '', '', 'L', '', 'B'],
        ['', '', 'L', 'L', '', '', 'L', '', '', 'L', 'L', '', '', '', ''],
        ['', '', 'A', 'F', '', '', 'B', '', 'L', 'L', 'A', '', 'L', 'C', 'F'],
        ['L', '', 'L', 'C', '', 'L', '', 'L', 'F', 'L', '', '', 'L', '', 'L'],
        ['', 'M', '', '', '', 'L', 'L', 'L', '', 'L', 'B', '', '', 'L', ''],
        ['L', 'L', 'L', 'L', 'L', '', 'A', 'L', '', '', 'L', 'L', '', '', 'L'],
        ['', '', '', '', 'L', 'F', 'L', '', 'L', '', 'C', 'M', 'L', 'L', ''],
        ['', 'L', 'L', '', '', 'L', '', 'L', 'B', '', 'L', '', 'L', '', ''],
      ]);
    }
    else if (opcion === '3') {
      setMatrizSeleccionada([
        ['1', 'L', 'L', 'M', '', 'L', 'B', 'F', '', '', 'L', 'L', '', '', ''],
        ['', '', '', 'L', 'L', 'L', 'L', 'L', 'L', 'L', '', '', 'M', 'L', ''],
        ['L', 'L', 'L', 'L', '', 'L', '', '', 'L', 'A', 'L', 'L', 'L', '', ''],
        ['', 'B', 'L', '', 'C', 'L', '', 'L', '', 'L', 'L', '', 'L', 'L', 'L'],
        ['', 'L', 'F', '', 'L', 'L', 'A', 'L', 'F', 'L', '', '', 'L', '', 'B'],
        ['', '', 'L', 'L', '', '', 'L', '', '', 'L', 'L', '', '', 'L', ''],
        ['', 'L', 'A', 'F', 'L', '', 'B', 'L', 'L', 'L', 'A', 'L', 'L', 'C', 'F'],
        ['L', 'L', 'L', 'C', '', 'L', '', 'L', 'F', 'L', '', 'L', 'L', '', 'L'],
        ['', 'M', '', 'L', '', 'L', 'L', 'L', '', 'L', 'B', 'L', '', 'L', ''],
        ['L', 'L', 'L', 'L', 'L', '', 'A', 'L', '', '', 'L', 'L', '', '', 'L'],
        ['', '', '', '', 'L', 'F', 'L', '', 'L', 'L', 'C', 'M', 'L', 'L', ''],
        ['', 'L', 'L', '', 'L', 'L', '', 'L', 'B', '', 'L', '', 'L', '', ''],
      ]);
    }
    setOpcionSeleccionada(opcion);
    console.log(opcionSeleccionada);
  };
  const Redirect = async () => {
    try {
      if (nombreLobby === '' || Contraseña_lobby_privado === '') {
        alert('Debes rellenar todos los campos');
      } else {
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
          method: 'post',
          url: `${import.meta.env.VITE_BACKEND_URL}/partidas`,
          data: {
            nombre: nombreLobby,
            contraseña: Contraseña_lobby_privado,
            cantidad_jugadores: 1,
          },
          headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
        });
        setIdpartida(respuesta1.data.id);
        console.log('Respuesta 1:', respuesta1.data);

        // Segunda petición
        const respuesta2 = await axios({
          method: 'post',
          url: `${import.meta.env.VITE_BACKEND_URL}/tablero`,
          data: {
            partida_id: respuesta1.data.id,
            jugador1: id,
            matriz: matrizSeleccionada,
          },
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

        alert('lobby creado con éxito');
        // Redirigir a otra página
        history('/esperando');
      }
    } catch (error) {
      console.error('Ocurrió un error:', error);
      if (error.response && error.response.status === 409) {
        alert('Nombre ocupado');
      } else {
        alert('Este nombre ya esta ocupado, por favor utiliza otro');
      }
    }
  };


  return (
    <div className='login'>
      <div className='contenedor-lobby'>
        <h1>Iniciar Lobby Privado</h1>
        <InputBox name="Nombre Lobby" setter={setNombreLobby} value={nombreLobby} />
        <InputBox name="Contraseña Lobby" setter={setContraseña_lobby_privado} value={Contraseña_lobby_privado} type='password' />

        <div className="button-container">
  <h3>Elige una opción de tablero:</h3>
  <button
    onClick={() => manejarSeleccion('1')}
    className={opcionSeleccionada === '1' ? 'selected' : ''}
  >
    Fácil
  </button>
  <button
    onClick={() => manejarSeleccion('2')}
    className={opcionSeleccionada === '2' ? 'selected' : ''}
  >
    Intermedio
  </button>
  <button
    onClick={() => manejarSeleccion('3')}
    className={opcionSeleccionada === '3' ? 'selected' : ''}
  >
    Difícil
  </button>
        </div>
        <div className='contenedor-botones'>

          <BackButton />
          <StandardButton text='Jugar' redirect_function={Redirect} />
        </div>
      </div>
      <div className='foto'>
        <img src={'../public/images/logo.png'} className="contenedor-foto" />
      </div>
    </div>
  );
}