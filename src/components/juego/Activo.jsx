import '../../assets/styles/components/juego/Activo.css';
import jugadorImg from '../../../public/images/jugador.png';

export default function Activo() {
  return (
        <div className="activo">
            <div className="titulo-jugador">
                <p>JUGANDO</p>
            </div>
            <div className="rectangulo-jugador">
                <img src={jugadorImg} alt="Jugador" className="jugador-cell" />
            </div>
        </div>
  );
}
