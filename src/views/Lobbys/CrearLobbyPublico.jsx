import '../../assets/styles/style_paginas_principales.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/buttons/BackButton';
import InputBox from '../../components/input_box';
import StandardButton from '../../components/buttons/Boton_estandar';
import { UserContext } from '../../assets/UserContext';
import axios from 'axios';

// 201 creado con exito
// 400 error

// esta es la response que se recibe al crear la partida
const response = {
  status: 201,
  body: {
    id: 4,
    nombre: 'partidadeprueba5',
    contraseña: 'a',
    cantidad_jugadores: 3,
    updatedAt: '2023-10-30T17:36:42.247Z',
    createdAt: '2023-10-30T17:36:42.247Z',
  },
};

// estructura para crear tablero
// {
//     "partida_id": 1,
//     "alto": 12,
//     "ancho": 15,
//     "tiempo": 60,
//     "jugador1": 1,
//     "updatedAt": "2023-10-31T13:01:07.968Z",
//     "createdAt": "2023-10-31T13:01:07.968Z"
// }

// esto obtenerlo por el contexto, debería estar guardado

// TODO ESTO SE GUARDA, LA INFO DE USUARIO, AL REGISTRARSE O INICIAR SESION
const self_id = 1;
const self_vida_base = 8;
const self_bombas_base = 6;

// datos jugador
// {
//     "id_usuario": 1,
//     "id_partida": 1,
//     "vida_restante": 10,
//     "bombas_restantes": 5,
//     "posicion": [0,0]
//     }

export default function CrearLobbyPublico() {
  const { nombreLobby, setNombreLobby } = useContext(UserContext);
  const history = useNavigate(); // hook para navegar paths
  const { jwtoken, setJwtoken } = useContext(UserContext);
  const {idpartida, setIdpartida} = useContext(UserContext);
  const {idtablero, setIdtablero} = useContext(UserContext);
  const { id, setId} = useContext(UserContext);
  const { userName } = useContext(UserContext);



  const Redirect = async () => {
    try {
      if (nombreLobby === '' ) {
        alert('Debes rellenar todos los campos');
      } else {

        console.log("IMRPIMIENDO EL ID",id);

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
                <h1>Iniciar Lobby Público</h1>
                <InputBox name="Nombre Lobby" setter={setNombreLobby} value={nombreLobby}/>
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
