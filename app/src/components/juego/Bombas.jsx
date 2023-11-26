import '../../assets/styles/components/juego/Bombas.css';
import React, { useContext } from 'react';
import bombaImg from '../../assets/images/bomba.png';
import { GameContext } from '../../views/Partida';

export default function Bombas() {
  const { bombas } = useContext(GameContext);
  return (
        <div className="bomb-tablero">
            {Array.from({ length: bombas }).map((_, rowIndex) => (
                <div key={rowIndex} className="bomb-row">
                    <img src={bombaImg} alt="Bomba" className="bomb-cell" />
                </div>
            ))}
        </div>
  );
}
