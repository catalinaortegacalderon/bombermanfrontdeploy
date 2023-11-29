import '../../assets/styles/components/juego/Vidas.css';
import React, { useContext } from 'react';
import vidaImg from '../../../public/images/vida.png';
import { GameContext } from '../../views/Partida';

export default function Vidas() {
  const { corazones } = useContext(GameContext);
  return (
        <div className="vida-tablero">
            {Array.from({ length: corazones }).map((_, rowIndex) => (
                <div key={rowIndex} className="vida-row">
                    <img src={vidaImg} alt="Vida" className="vida-cell" />
                </div>
            ))}
        </div>
  );
}
