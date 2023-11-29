import arrow_keys from '../../../public/images/rules/arrow_keys.png';
import spacebar from '../../../public/images/rules/space_bar.png';
import enter_key from '../../../public/images/rules/enter_key.png';

export default function Pagina_3() {
  return (
    <div className='regla-individual'>
        <div className='titulo-regla'>
            <h1>¡El poder de las flechas te acompaña!</h1>
        </div>
        <div className='contenido-regla'>
          <div className='imagenes-teclas'>
            <img src={arrow_keys}/>
            <img src={spacebar}/>
            <img src={enter_key}/>
          </div>
            <li>Utiliza las flechas del teclado para mover a tu personaje.</li>
            <li>Presiona la barra espaciadora para plantar una bomba.</li>
            <li>Presiona enter para explotar la bomba y finalizar tu turno.</li>
        </div>
    </div>
  );
}
