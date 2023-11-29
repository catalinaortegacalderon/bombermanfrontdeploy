import jugador from '../../../public/images/jugador.png';
import bandera from '../../../public/images/bandera.png';

export default function Pagina_5() {
  return (
    <div className='regla-individual'>
        <div className='titulo-regla'>
            <h1>¿Listo para la aventura?</h1>
        </div>
        <div className='contenido-regla'>
          <div className='imagen-final'>
            <img src={jugador}/>
            <img src={bandera}/>
          </div>
        </div>
    </div>
  );
}
