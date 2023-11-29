import '../assets/styles/style_paginas_principales.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import StandardButton from '../components/buttons/Boton_estandar';

// tal vez aca sea bueno mostrar la contraseña y nombre del lobby

const response_eliminar = {
  status: 201,
};

const response_partida = {
  status: 201,
  body: {
    jugadores: 1,
  },
};

// esta info guardada en contexto
// tal vez cambiar todo esto por partida_id, hay que cambiarlo en el back si esque se hace
const partida_id = 1;
const tablero_id = 1;
const jugador_id = 1;

// el contador es solo por ahora, en verdad se mandará un request para ver si hay 4 jugadores en la partida
let contador = 0;

export default function EsperandoJugadores() {
  const history = useNavigate(); // hook para navegar paths

  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        contador += 1;
        console.log('MANDAR REQUEST A METODO GET Y A ENDPOINT http://localhost:3000/partidas/', partida_id, '\n');
        if (response_partida.body.jugadores == 4) {
          history('/partida');
        }
        if (contador == 20) {
          contador = 0;
          history('/partida');
        }
        if (prevDots === '...') {
          return '.';
        }
        return `${prevDots}.`;
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const Redirect = () => {
    console.log('MANDAR REQUEST A METODO DELETE Y A ENDPOINT http://localhost:3000/partidas/', partida_id, '\n');
    console.log('MANDAR REQUEST A METODO DELETE Y A ENDPOINT http://localhost:3000/tablero/', tablero_id, '\n');
    console.log('MANDAR REQUEST A METODO DELETE Y A ENDPOINT http://localhost:3000/jugadores/', jugador_id, '\n');
    if (response_eliminar.status == 201) {
      alert('Partida eliminada con éxito');
      history('/iniciarpartida');
    } else {
      alert('Error al eliminar la partida');
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
