import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../../views/Partida';
import Celda from './Celda';
import '../../assets/styles/components/juego/Tablero.css';
import matrizOriginal from '../../../responses/actualizar_matriz.js';
import informacion from '../../../responses/informacion_jugador';
import { useNavigate } from 'react-router-dom';

export default function Tablero() {
  const history = useNavigate();
  const { bombas, setBombas } = useContext(GameContext); { /* obtengo el numero de bombas del jugador */ }
  const { corazones, setCorazones } = useContext(GameContext); { /* obtengo el numero de corazones del jugador */ }
  const [monedas, setMonedas] = useState(0);
  const [banderas, setBanderas] = useState(0);
  const [posicion, setPosicion] = useState({ fila: 0, columna: 0 }); { /* seteamos posición inicial */ }
  const [matriz, setMatriz] = useState(JSON.parse(JSON.stringify(matrizOriginal)));

  const reiniciarPartida = () => {
    setBombas(informacion.bombas);
    setCorazones(informacion.corazones);
    setMonedas(0);
    setBanderas(0);
    setPosicion({ fila: 0, columna: 0 });
    setMatriz(JSON.parse(JSON.stringify(matrizOriginal)));
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
        alert('Has perdido :(');
        reiniciarPartida();
        history('/inicioregistrado');
      }
    } else if (matriz[fila][columna] === 'M') {
      setMonedas(monedas + 1);
      matriz[fila][columna] = '';
    } else if (matriz[fila][columna] === 'BA') {
      const nuevasBanderas = banderas + 1;
      setBanderas(nuevasBanderas);
      matriz[fila][columna] = '';
      if (nuevasBanderas === 5) {
        alert('Has ganado!');
        reiniciarPartida();
        history('/inicioregistrado');
      }
    }
  };

  { /* usamos useEffect para manejar los eventos de teclado */ }
  useEffect(() => {
    const handleKeyPress = (e) => {
      let { fila, columna } = posicion;
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
                    alert('Has perdido :(');
                    reiniciarPartida();
                    history('/inicioregistrado');
                  }
                }
              }
            }
          }
          console.log('Mandar request a metodo patch y endpoint http://localhost:3000/tablero/id_partida');
          console.log(`El body es: \n { matriz: ${JSON.stringify(matriz)} banderas_capturadas: ${banderas}}`);
          console.log('Mandar request a metodo patch y endpoint http://localhost:3000/jugador/id_jugador');
          console.log(`El body es: \n { vida_restante: ${corazones} , bombas_restantes: ${bombas} , posicion: ${JSON.stringify(posicion)}}`);
          break;
        default:
          return;
      }
      setPosicion({ fila, columna }); { /* actualizo la posición */ }
    };
    window.addEventListener('keydown', handleKeyPress); { /* escucho si se presiona una tecla */ }
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [posicion, bombas, corazones, monedas, banderas]);

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
                            bandera={matriz[filaIndex][celdaIndex] === 'BA'}
                        />
                    ))}
                </div>
            ))}
        </div>
  );
}
