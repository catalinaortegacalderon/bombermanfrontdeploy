import React, { useState, useContext } from 'react';
import '../../assets/styles/style_paginas_principales.css';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/buttons/BackButton';
import JugarButton from '../../components/buttons/JugarButton';
import InputBox from '../../components/input_box';
import { UserContext } from '../../assets/UserContext';
import StandardButton from '../../components/buttons/Boton_estandar';

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
  const Redirect = () => {
    console.log('MANDAR REQUEST A METODO POST Y A ENDPOINT http://localhost:3000/partidas/\n');
    console.log('EL BODY ES: \n "nombre:"', nombreLobby, ',contraseña:', Contraseña_lobby_privado, ',cantidad_jugadores:', 1, ', createdAt:', Date.now(), ', updatedAt:', Date.now());
    console.log('MANDAR REQUEST A METODO POST Y A ENDPOINT http://localhost:3000/tablero/\n');
    console.log('EL BODY ES: \n "partida_id:"', response.body.id, ',jugador1:', self_id, ', createdAt:', Date.now(), ', updatedAt:', Date.now());
    console.log('MANDAR REQUEST A METODO POST Y A ENDPOINT http://localhost:3000/jugadores/\n');
    console.log('EL BODY ES: \n "id_partida:"', response.body.id, ',id_usuario:', self_id, ',vida_restante', self_vida_base, ',bombas_restantes', self_bombas_base, ', createdAt:', Date.now(), ', updatedAt:', Date.now());
    if (nombreLobby === '' || Contraseña_lobby_privado === '') {
      alert('Debes rellenar todos los campos');
    } else if (response.status == 201) {
      alert('Partida creada con éxito');
      history('/esperando');
    } else {
      alert('Nombre ocupado');
    }
  };

  return (
        <div className='login'>
            <div className='contenedor-lobby'>
                <h1>Iniciar Lobby Privado</h1>
                <InputBox name="Nombre Lobby" setter={setNombreLobby} value={nombreLobby}/>
                <InputBox name="Contraseña Lobby" setter={setContraseña_lobby_privado} value={Contraseña_lobby_privado}/>
                <div className='contenedor-botones'>
                    <BackButton />
                    <StandardButton text='Jugar' redirect_function={Redirect} />
                </div>
            </div>
            <div className='foto'>
                <img src={'../src/assets/images/logo.png'} className="contenedor-foto" />
            </div>
        </div>
  );
}
