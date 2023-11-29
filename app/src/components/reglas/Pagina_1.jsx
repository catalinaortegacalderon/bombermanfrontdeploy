import bandera from '../../../public/images/bandera.png';

export default function Pagina_1() {
  return (
    <div className='regla-individual'>
        <div className='titulo-regla'>
            <h1>¿Podrás capturar las banderas a tiempo?</h1>
        </div>
        <div className='contenido-regla'>
          <div className='imagen-bandera'>
            <img src={bandera}/>
          </div>
          <p>Captura banderas antes de que se agote el tiempo para ganar.</p>
          <p>Multiplica tus esfuerzos ayudándote de tus amigos. Pueden jugar máximo 4
          </p>
        </div>
    </div>
  );
}
