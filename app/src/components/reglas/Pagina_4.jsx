import moneda from '../../../public/images/moneda.png';
import ladrillo from '../../../public/images/ladrillo.png';

export default function Pagina_4() {
  return (
    <div className='regla-individual'>
        <div className='titulo-regla'>
            <h1>Otros objetos</h1>
        </div>
        <div className='contenido-regla'>
          <div className='imagenes-teclas'>
            <img src={moneda}/>
            <img src={ladrillo}/>
          </div>
            <li>¡Captura las monedas para poder comprar
              recursos únicos! ¿A quién no le gustan las monedas?
            </li>
            <li>Explota ladrillos para avanzar a través del tablero</li>
        </div>
    </div>
  );
}
