import React, { useState, useContext } from 'react';
import '../../assets/styles/style_paginas_principales.css';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/buttons/BackButton';
import JugarButton from '../../components/buttons/JugarButton';
import InputBox from '../../components/input_box';
import { UserContext } from '../../assets/UserContext';
import StandardButton from '../../components/buttons/Boton_estandar';
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

export default function CrearLobbyPrivado() {
  const { nombreLobby, setNombreLobby } = useContext(UserContext);
  const [Contraseña_lobby_privado, setContraseña_lobby_privado] = useState('');
  const history = useNavigate(); // hook para navegar paths
  const { jwtoken, setJwtoken } = useContext(UserContext);
  const {idpartida, setIdpartida} = useContext(UserContext);
  const {idtablero, setIdtablero} = useContext(UserContext);
  const { id, setId} = useContext(UserContext);
  const { userName } = useContext(UserContext);

    // console.log('MANDAR REQUEST A METODO POST Y A ENDPOINT http://localhost:3000/partidas/\n');
    // console.log('EL BODY ES: \n "nombre:"', nombreLobby, ',contraseña:', Contraseña_lobby_privado, ',cantidad_jugadores:', 1, ', createdAt:', Date.now(), ', updatedAt:', Date.now());
    // console.log('MANDAR REQUEST A METODO POST Y A ENDPOINT http://localhost:3000/tablero/\n');
    // console.log('EL BODY ES: \n "partida_id:"', response.body.id, ',jugador1:', self_id, ', createdAt:', Date.now(), ', updatedAt:', Date.now());
    // console.log('MANDAR REQUEST A METODO POST Y A ENDPOINT http://localhost:3000/jugadores/\n');
    // console.log('EL BODY ES: \n "id_partida:"', response.body.id, ',id_usuario:', self_id, ',vida_restante', self_vida_base, ',bombas_restantes', self_bombas_base, ', createdAt:', Date.now(), ', updatedAt:', Date.now());
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
                <h1>Iniciar Lobby Privado</h1>
                <InputBox name="Nombre Lobby" setter={setNombreLobby} value={nombreLobby}/>
                <InputBox name="Contraseña Lobby" setter={setContraseña_lobby_privado} value={Contraseña_lobby_privado} type='password'/>
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
