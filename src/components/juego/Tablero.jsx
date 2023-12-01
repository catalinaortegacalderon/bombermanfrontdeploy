import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../../views/Partida';
import Celda from './Celda';
import '../../assets/styles/components/juego/Tablero.css';
import matrizOriginal from '../../../responses/actualizar_matriz.js';
import informacion from '../../../responses/informacion_jugador';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../assets/UserContext';
import axios from 'axios';

export default function Tablero() {
  const history = useNavigate();
  const { bombas, setBombas } = useContext(GameContext); { /* obtengo el numero de bombas del jugador */ }
  const { corazones, setCorazones } = useContext(GameContext); { /* obtengo el numero de corazones del jugador */ }
  const [monedas, setMonedas] = useState(0);
  const [banderas, setBanderas] = useState(0);
  const [posicion, setPosicion] = useState({ fila: 0, columna: 0 }); { /* seteamos posición inicial */ }
  const [matriz, setMatriz] = useState(JSON.parse(JSON.stringify(matrizOriginal)));
  const { jwtoken, setJwtoken } = useContext(UserContext);
  const { idtablero } = useContext(UserContext); { /* obtengo el id del tablero */ }
  const { idpartida } = useContext(UserContext); { /* obtengo el id de la partida */ }
  const { nombreLobby } = useContext(UserContext); { /* obtengo el nombre de la partida/lobby */ }
  const { id } = useContext(UserContext); { /* obtengo el id del jugador */ }
  const { numjugador } = useContext(UserContext);
  const { turno, setTurno } = useContext(UserContext);
  let turnoNuevo = 0;
  let perdio = false;
  let gano = false;

  const avisarPerdio = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/tablero/${idpartida}`, {
        jugador4: -2
      }, {
        headers: {
          'Authorization': `Bearer ${jwtoken}`
        }
      });
      console.log('Juego actualizado: jugador perdió');
    } catch (error) {
      console.error('Error al actualizar el estado del juego:', error);
    }
  };

  const avisarGano = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/tablero/${idpartida}`, {
        jugador4: -1
      }, {
        headers: {
          'Authorization': `Bearer ${jwtoken}`
        }
      });
      console.log('Juego actualizado: jugador ganó');
    } catch (error) {
      console.error('Error al actualizar el estado del juego:', error);
    }
  };

  const actualizarBanderas = async () => {
    try {
      const respuestaGet = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tablero/${idpartida}`, {
        headers: {
          'Authorization': `Bearer ${jwtoken}`
        }
      });
      const banderasActual = respuestaGet.data.jugador3;

      const banderasNuevo = banderasActual + 1;
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/tablero/${idpartida}`, {
        jugador3: banderasNuevo
      }, {
        headers: {
          'Authorization': `Bearer ${jwtoken}`
        }
      });
      console.log('Banderas actualizado:', banderasNuevo);
      if (banderasNuevo === 5) {
        gano = true;
        alert('Has ganado!');
        history('/inicioregistrado');
        avisarGano();
      }
    } catch (error) {
      console.error('Error al actualizar banderas:', error);
    }
  };

  const chequearMatriz = () => {
    const { fila, columna } = posicion;
    if (matriz[fila][columna] === 'C') {
      setCorazones(corazones + 1);
      matriz[fila][columna] = '';
    } else if (matriz[fila][columna] === 'B') {
      setBombas(bombas + 1);
      matriz[fila][columna] = '';
    } else if (matriz[fila][columna] === 'F') {
      const nuevosCorazones = corazones - 1;
      setCorazones(nuevosCorazones);
      matriz[fila][columna] = '';
      if (nuevosCorazones <= 0) {
        perdio = true;
        alert('Has perdido :(');
        history('/inicioregistrado');
        avisarPerdio();
      }
    } else if (matriz[fila][columna] === 'M') {
      setMonedas(monedas + 1);
      matriz[fila][columna] = '';
    } else if (matriz[fila][columna] === 'A') {
      actualizarBanderas();
      matriz[fila][columna] = '';
    }
  };

  const mandarMatriz = async () => {
    try {
      const respuesta = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/tablero/${idpartida}`, {
        matriz: matriz,
      });
      console.log('Matriz enviada:', matriz)
      console.log('Tablero actualizado:', respuesta.data);
    } catch (error) {
      console.error('Error al actualizar el tablero:', error);
    }
  };

  const cargarTablero = async () => {
    try {
      const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tablero/${idpartida}`);
      setMatriz(respuesta.data.matriz);
      console.log('Matriz cargada:', respuesta.data.matriz);
    } catch (error) {
      console.error('Error al cargar el tablero:', error);
    }
  };

  const mandarDatos = async () => {
    try {
      const respuesta = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/jugadores/${id}`, {
        vida_restante: corazones,
        bombas_restantes: bombas,
        posicion: [posicion.fila, posicion.columna]
      });
      console.log('Datos enviados:', corazones, bombas, posicion)
      console.log('Datos recibidos:', respuesta.data);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };

  const esperarTurno = async () => {
    const interval = setInterval(async () => {
      if (gano || perdio) {
        clearInterval(interval);
        return;
      }
      console.log('Esperando turno...');
      try {
        const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tablero/${idpartida}`);
        console.log('Respuesta:', respuesta.data);
        console.log('id:', id);
        if (respuesta.data.jugador4 === id) {
          alert('Es tu turno!');
          setMatriz(respuesta.data.matriz);
          setTurno(true);
          clearInterval(interval);
        }
        else if (respuesta.data.jugador4 === -1) {
          gano = true;
          alert('Tu compañero ganó!');
          history('/inicioregistrado');
          clearInterval(interval);
        }
        else if (respuesta.data.jugador4 === -2) {
          perdio = true;
          alert('Tu compañero perdió :(');
          history('/inicioregistrado');
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Error al cargar el tablero:', error);
        clearInterval(interval);
      }
    }, 1000);
  };

  const cambiarTurno = async () => {
    console.log('Cambiando turno...');
    setTurno(false);
    try {
      const respuesta1 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tablero/${idpartida}`);
      if (respuesta1.data.jugador1 === respuesta1.data.jugador4) {
        turnoNuevo = respuesta1.data.jugador2;
        console.log('1Turno nuevo:', turnoNuevo);
      } else if (respuesta1.data.jugador2 === respuesta1.data.jugador4) {
        turnoNuevo = respuesta1.data.jugador1;
        console.log('2Turno nuevo:', turnoNuevo);
      }
      const respuesta = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/tablero/${idpartida}`, {
        jugador4: turnoNuevo
      });
      console.log('Turno cambiado:', respuesta.data);
    }
    catch (error) {
      console.error('Error al cambiar el turno:', error);
    }
  };

  useEffect(() => {
    cargarTablero();
    console.log('jugador:', numjugador);

    if (numjugador === 2) {
      setPosicion({ fila: 11, columna: 14 });
      setTurno(false);
      esperarTurno();
    } else {
      setPosicion({ fila: 0, columna: 0 });
      setTurno(true);
    }
  }, []);

  { /* usamos useEffect para manejar los eventos de teclado */ }
  useEffect(() => {
    const handleKeyPress = (e) => {
      let { fila, columna } = posicion;
      if (!turno) {
        e.preventDefault();
        alert('No es tu turno');
        return;
      }
      switch (e.key) {
        case 'ArrowUp':
          if (fila > 0 && matriz[fila - 1][columna] != 'L') {
            fila--;
            chequearMatriz();
          }
          e.preventDefault();
          break;
        case 'ArrowDown':
          if (fila < 11 && matriz[fila + 1][columna] != 'L') {
            fila++;
            chequearMatriz();
          }
          e.preventDefault();
          break;
        case 'ArrowLeft':
          if (columna > 0 && matriz[fila][columna - 1] != 'L') {
            columna--;
            chequearMatriz();
          }
          break;
        case 'ArrowRight':
          if (columna < 14 && matriz[fila][columna + 1] != 'L') {
            columna++;
            chequearMatriz();
          }
          break;
        case ' ':
          e.preventDefault();
          if (bombas > 0 && matriz[fila][columna] === '') {
            setBombas(bombas - 1);
            matriz[fila][columna] = 'E';
          } else if (bombas > 0 && matriz[fila][columna] === 'E') {
            setBombas(bombas + 1);
            matriz[fila][columna] = '';
          }
          { /* si presiono espacio y no había nada, coloca una bomba */ }
          { /* si presiono espacio y había una bomba, la recojo */ }
          break;
        case 'Enter':
          for (let i = 0; i < matriz.length; i++) {
            for (let j = 0; j < matriz[i].length; j++) {
              if (matriz[i][j] === 'E') {
                if (i > 0 && matriz[i - 1][j] === 'L') matriz[i - 1][j] = '';
                if (i < matriz.length - 1 && matriz[i + 1][j] === 'L') matriz[i + 1][j] = '';
                if (j > 0 && matriz[i][j - 1] === 'L') matriz[i][j - 1] = '';
                if (j < matriz[i].length - 1 && matriz[i][j + 1] === 'L') matriz[i][j + 1] = '';
                matriz[i][j] = '';
                if (
                  (i === fila - 1 && j === columna)
                  || (i === fila + 1 && j === columna)
                  || (i === fila && j === columna - 1)
                  || (i === fila && j === columna + 1)
                  || (i === fila && j === columna)
                ) {
                  const nuevosCorazones = corazones - 2;
                  setCorazones(nuevosCorazones);
                  if (nuevosCorazones <= 0) {
                    perdio = true;
                    alert('Has perdido :(');
                    history('/inicioregistrado');
                    avisarPerdio();
                  }
                }
              }
            }
          }
          if (!perdio && !gano) {
            mandarMatriz();
            console.log('Datos enviados1:', corazones, bombas, posicion)
            mandarDatos();
            cambiarTurno();
            esperarTurno();
          }
          break;
        default:
          return;
      }
      setPosicion({ fila, columna }); { /* actualizo la posición */ }
    };
    window.addEventListener('keydown', handleKeyPress); { /* escucho si se presiona una tecla */ }
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [posicion, bombas, corazones, monedas, banderas, turno]);

  return (
    <div className="tablero">
      {/* creo las 12 filas */}
      {Array.from({ length: 12 }).map((_, filaIndex) => (
        <div key={filaIndex} className="board-row">
          {/* creo 12 celdas por fila para formar las columnas */}
          {Array.from({ length: 15 }).map((_, celdaIndex) => (
            <Celda
              key={celdaIndex}
              /* se muestra la imagen correspondiente */
              ocupada={filaIndex === posicion.fila && celdaIndex === posicion.columna}
              ladrillo={matriz[filaIndex][celdaIndex] === 'L'}
              bomba={matriz[filaIndex][celdaIndex] === 'E'}
              corazon={matriz[filaIndex][celdaIndex] === 'C'}
              bombaRecoger={matriz[filaIndex][celdaIndex] === 'B'}
              moneda={matriz[filaIndex][celdaIndex] === 'M'}
              fuego={matriz[filaIndex][celdaIndex] === 'F'}
              bandera={matriz[filaIndex][celdaIndex] === 'A'}
            />
          ))}
        </div>
      ))}
    </div>

  );
}