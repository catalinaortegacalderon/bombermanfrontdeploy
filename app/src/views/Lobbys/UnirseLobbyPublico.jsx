import React, { useContext } from 'react';
import '../../assets/styles/style_paginas_principales.css';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/buttons/BackButton';
import InputBox from '../../components/input_box';
import StandardButton from '../../components/buttons/Boton_estandar';
import { UserContext } from '../../assets/UserContext';

const response = {
  status: 200,
  body: {
    id: 1,
    nombre: 'lobby1',
    cantidad_jugadores: 1,
    createdAt: '2021-10-30T14:24:37.209Z',
    updatedAt: '2021-10-30T16:35:34.788Z',
  },
};

const self_id = 1;
const self_vida_base = 8;
const self_bombas_base = 6;

export default function UnirseLobbyPublico() {
  const { nombreLobby, setNombreLobby } = useContext(UserContext);
  const history = useNavigate(); // hook para navegar paths
  const Redirect = () => {
    console.log('MANDAR REQUEST A METODO GET Y A ENDPOINT http://localhost:3000/partidas/\n');
    console.log('EL BODY ES: \n "nombre:"', nombreLobby);
    console.log('MANDAR REQUEST A METODO POST Y A ENDPOINT http://localhost:3000/jugadores/\n');
    console.log('EL BODY ES: \n "id_partida:"', response.body.id, ',id_usuario:', self_id, ',vida_restante', self_vida_base, ',bombas_restantes', self_bombas_base, ', createdAt:', Date.now(), ', updatedAt:', Date.now());
    if (nombreLobby === '') {
      alert('Debes rellenar todos los campos');
    } else if (response.status == 200) {
      history('/esperando');
    } else {
      alert('Nombre incorrecto');
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
                <img src={'../src/assets/images/logo.png'} className="contenedor-foto" />
            </div>
        </div>
  );
}
