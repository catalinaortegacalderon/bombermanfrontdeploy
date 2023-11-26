import '../assets/styles/style_paginas_principales.css';
import { useEffect, useState } from 'react';
import '../assets/styles/Reglas.css';
import arrow_izquierda from '../assets/images/arrow_izquierda.png';
import arrow_derecha from '../assets/images/arrow_derecha.png';
import moneda from '../assets/images/moneda.png';

import BackButton from '../components/buttons/BackButton';
import Pagina_1 from '../components/reglas/Pagina_1';
import Pagina_2 from '../components/reglas/Pagina_2';
import Pagina_3 from '../components/reglas/Pagina_3';
import Pagina_4 from '../components/reglas/Pagina_4';
import Pagina_5 from '../components/reglas/Pagina_5';

const paginas = [];
paginas.push(<Pagina_1/>);
paginas.push(<Pagina_2/>);
paginas.push(<Pagina_3/>);
paginas.push(<Pagina_4/>);
paginas.push(<Pagina_5/>);

export default function Reglas() {
  const [paginaActual, setPaginaActual] = useState(0);
  console.log(`Estoy en la pagina ${paginaActual}`);

  const handleSwipeRight = () => {
    if (paginaActual < paginas.length - 1) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const handleSwipeLeft = () => {
    if (paginaActual > 0) {
      setPaginaActual(paginaActual - 1);
    }
  };

  return (
        <div className='reglas'>
            <div className='contenedor-reglas'>
                <div className='boton-navegar'>
                    <button alt="Botón volver izquierda" onClick={handleSwipeLeft}>
                        <img src={arrow_izquierda} />
                    </button>
                </div>
                <div className='contenedor-estadisticas'>
                    {paginas[paginaActual]}

                    <div className='contenedor-botones'>
                        <BackButton />
                    </div>
                </div>

                <div className='boton-navegar'>
                    <button src={arrow_derecha} alt="Botón avanzar derecha" onClick={handleSwipeRight}>
                        <img src={arrow_derecha} />
                    </button>
                </div>

            </div>
            <div className='foto-reglas'>
                <img src={'../src/assets/images/logo2.png'} className="contenedor-foto" />
            </div>
        </div>
  );
}
