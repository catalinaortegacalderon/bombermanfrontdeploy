import '../assets/styles/Partida.css';
import React, { createContext, useState, useContext } from 'react';
import BackButton from '../components/buttons/BackButton';
import Tablero from '../components/juego/Tablero';
import Bombas from '../components/juego/Bombas';
import Vidas from '../components/juego/Vidas';
import Timer from '../components/juego/Timer';
import Activo from '../components/juego/Activo';
import informacion from '../../responses/informacion_jugador';
import { UserContext } from '../assets/UserContext';

export const GameContext = createContext();
const GameProvider = ({ children }) => {
    const [bombas, setBombas] = useState(informacion.bombas);
    const [corazones, setCorazones] = useState(informacion.corazones);
    return (
        <GameContext.Provider value={{
            bombas, setBombas, corazones, setCorazones,
        }}>
            {children}
        </GameContext.Provider>
    );
};

export default function Partida() {
    const { userName } = useContext(UserContext);
    const { nombreLobby } = useContext(UserContext);

    if (userName === '') {
        return (
            <div className='login'>
                <div className='contenedor-usuario'>
                    <h1>Debes iniciar sesión o registrarte para jugar</h1>
                    <div className='contenedor-botones'>
                        <BackButton />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='partida'>
                <div className='fila1'>
                    <h1>Partida de {userName}, lobby {nombreLobby}</h1>
                </div>
                <GameProvider>
                    <div className='fila2'>
                        <div className='columna'>
                            <Bombas /> {/* columna de bombas del jugador */}
                        </div>
                        <div className='columna'>
                            <Vidas />  {/* columna de vidas del jugador */}
                        </div>
                        <div className='columna'>
                            <Tablero /> {/* tablero de juego */}
                        </div>
                        <div className='columna'>
                            
                        </div>
                    </div>
                </GameProvider>
                <div className='fila3'>
                    <BackButton /> {/* boton para volver a la pagina anterior */}
                </div>
            </div>
        );
    }
}
