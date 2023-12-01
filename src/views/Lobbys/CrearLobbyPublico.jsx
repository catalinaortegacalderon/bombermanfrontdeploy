import '../../assets/styles/style_paginas_principales.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/buttons/BackButton';
import InputBox from '../../components/input_box';
import StandardButton from '../../components/buttons/Boton_estandar';
import { UserContext } from '../../assets/UserContext';
import axios from 'axios';

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
    setNumjugador(1);
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
          method: 'post',
          url: `${import.meta.env.VITE_BACKEND_URL}/partidas`,
          data: {
            nombre: nombreLobby,
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
            jugador3: 0,
            jugador4: id,
            matriz: [
              ['', 'L', 'L', 'M', '', 'L', 'B', 'F', '', '', 'L', 'L', '', '', ''],
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
            ]
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
        console.log('Respuesta 3:', respuesta3.data);
        await setIdjugador(respuesta3.data.id);

        alert('lobby creado con éxito');
        // Redirigir a otra página
        console.log('idpartida:', idpartida);
        history('/esperando');
      }
    } catch (error) {
      console.error('Ocurrió un error:', error);
      if (error.response && error.response.status === 409) {
        alert('Nombre ocupado');
      } else {
        alert('Nombre ocupado');
      }
    }
  };

  return (
    <div className='login'>
      <div className='contenedor-lobby'>
        <h1>Iniciar Lobby Público</h1>
        <InputBox name="Nombre Lobby" setter={setNombreLobby} value={nombreLobby} />
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