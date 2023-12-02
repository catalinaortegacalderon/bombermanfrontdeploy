import '../../assets/styles/components/juego/Celda.css';
import jugadorImg from '../../../public/images/jugador.png';
import ladrilloImg from '../../../public/images/ladrillo.png';
import bombaImg from '../../../public/images/bomba.png';
import corazonImg from '../../../public/images/vida.png';
import bombaRecogerImg from '../../../public/images/bomba2.png';
import monedaImg from '../../../public/images/moneda.png';
import fuegoImg from '../../../public/images/fuego.png';
import banderaImg from '../../../public/images/bandera.png';

export default function Celda(props) {
  return (
    <div className="celda">
      {props.ocupada && <img src={jugadorImg} alt="Jugador" />}
      {props.ladrillo && <img src={ladrilloImg} alt="Ladrillo" />}
      {props.bomba && !props.ocupada && <img src={bombaImg} alt="Bomba" />}
      {props.corazon && !props.ocupada && <img src={corazonImg} alt="Corazon" />}
      {props.bombaRecoger && !props.ocupada && <img src={bombaRecogerImg} alt="BombaRecoger" />}
      {props.moneda && !props.ocupada && <img src={monedaImg} alt="Moneda" />}
      {props.fuego && !props.ocupada && <img src={fuegoImg} alt="Fuego" />}
      {props.bandera && !props.ocupada && <img src={banderaImg} alt="Bandera" />}
      {props.ocupada2 && <img src={jugadorImg} alt="Companero" />}
    </div>
  );
}
