import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/style_paginas_principales.css';
import StandardButton from '../components/buttons/Boton_estandar';
import { UserContext } from '../assets/UserContext';

// el contador es solo por ahora, en verdad se mandará un request para ver si hay 4 jugadores en la partida
let contador = 0;

export default function EsperandoJugadores() {
  const { nombreLobby, setNombreLobby } = useContext(UserContext);
  const { idpartida, setIdpartida } = useContext(UserContext);
  const { idtablero, setIdtablero } = useContext(UserContext);
  const {idjugador, setIdjugador} = useContext(UserContext);
  const history = useNavigate(); // hook para navegar paths
  const [dots, setDots] = useState('.');
  const [jugadores, setJugadores] = useState(0);
  const { jwtoken, setJwtoken } = useContext(UserContext);
  console.log(idpartida);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/partidas/${nombreLobby}`, {
        headers: {
          'Authorization': `Bearer ${jwtoken}`
        }
      })
        .then(response => {
          const cantidadJugadores = response.data.cantidad_jugadores;
          setJugadores(cantidadJugadores);
          if (cantidadJugadores >= 2) {
            history('/partida');
          }
        })
        .catch(error => {
          console.error('Error al obtener datos de la partida:', error);
        });

      setDots(prevDots => prevDots.length < 3 ? `${prevDots}.` : '.');
    }, 5000); // Intervalo de 5 segundos

    return () => clearInterval(interval);
  }, []);

  const Redirect = async () => {
        try {
          const respuesta1 = await axios({
            method: 'delete',
            url: `${import.meta.env.VITE_BACKEND_URL}/partidas/${idpartida}`,
            headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
          });
          console.log('resp 1:', respuesta1.data);


          const respuesta2 = await axios({
            method: 'delete',
            url: `${import.meta.env.VITE_BACKEND_URL}/tablero/${idtablero}`,
            headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
          });
          console.log('resp 2:', respuesta2.data);

          console.log('idjugador',idjugador)


          const respuesta3 = await axios({
            method: 'delete',
            url: `${import.meta.env.VITE_BACKEND_URL}/jugadores/${idjugador}`,
            headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
          });
          console.log('resp 3:', respuesta3.data);


        // Redirigir a otra página
        console.log('idpartida:', idpartida);
        alert('Partida eliminada con éxito');
        history('/iniciarpartida');
    } catch (error) {
      console.error('Ocurrió un error:', error);
        alert('Ocurrió un error :(');
    }
  };


  return (
    <div className='login'>
      <div className='contenedor-esperando-jugadores'>
        <h1>Esperando Jugadores</h1>
        <h1>{dots}</h1>
        <div className='contenedor-botones'>
          <StandardButton text='Eliminar Lobby' redirect_function={Redirect} />
        </div>
      </div>
    </div>
  );
}
