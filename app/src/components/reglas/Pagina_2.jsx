import bomba from '../../assets/images/bomba2.png';
import vida from '../../assets/images/vida.png';
import fuego from '../../assets/images/fuego.png';

export default function Pagina_2() {
  return (
    <div className='regla-individual'>
        <div className='titulo-regla'>
            <h1>¡Cuidado con morir!</h1>
        </div>
        <div className='contenido-regla'>
          <div className='imagenes-teclas'>
            <img src={vida}/>
            <img src={bomba}/>
            <img src={fuego}/>
          </div>
            <li>¡Si te quedas sin corazones pierdes!
               Asegurate de atrapar las vidas en el tablero
               para evitar tu muerte.</li>
               <li>Esquiva los fuegos, cada uno te quita una vida.</li>
            <li>¡Tus propias bombas te quitan vidas!
              Evita todo tipo de bombas, no querrás pasar por un infortunio.</li>
            <li>Tienes 7 segundos por turno. ¡El tiempo es oro!</li>
        </div>
    </div>
  );
}
