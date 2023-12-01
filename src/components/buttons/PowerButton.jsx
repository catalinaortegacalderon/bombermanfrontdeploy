import React, { useState, useEffect } from 'react';
import '../../assets/styles/components/buttons/PowerButton.css';
import vida from '../../../public/images/vida.png';
import bomba from '../../../public/images/bomba.png';
import jugador from '../../../public/images/jugador.png';
import astrid from '../../../public/images/astrid.png';
import def from '../../../public/images/default.png';
import epsilon from '../../../public/images/epsilon.png';
import koizk from '../../../public/images/koizk.png';
import kuca from '../../../public/images/kuca.png';
import pepe from '../../../public/images/pepe.png';
import pupi from '../../../public/images/pupi.png';
import pyro from '../../../public/images/pyro.png';

export default function PowerButton(props) {
  // voy a tener que pasar el tipo de boton, y cuanto vale.
  // const history = useNavigate() // hook para navegar paths
  // const goBack = () => {
  //     history(-1);
  // }
  const { title } = props;
  const { image } = props;
  const { money } = props;
  const { item_info } = props;

  // const renderImage = (imageName) => {
  //   // Aquí asumimos que tus imágenes están en el mismo directorio que el componente
  //   return require(`../../assets/images/${imageName}`).default;
  // };

  // console.log('la imagen es', image)
  let vida_base = null;
  let bomba_base = null;

  if (item_info && item_info.length !== 0) {
    vida_base = item_info[0];
    bomba_base = item_info[1];
  }

  let content = null;
  if (money !== '0') {
    content = <div className='money-container'>{money}</div>;
  }
  const { onClick } = props;
  

  return (
        // <button className='power-button'
        // onClick={}></button>
        
        <button className='power-button' onClick={onClick}>
            <div className='title'><p>{title}</p></div>
            <div className='image'><img src={(image==='default.png') ? (def) : (
              (image==='pupi.png') ? (pupi) : (
                (image==='kuca.png') ? (kuca) : (
                  (image==='pepe.png') ? (pepe) : (
                    (image==='koizk.png') ? (koizk) : (
                      (image==='epsilon.png') ? (epsilon) : (
                        (image==='pyro.png') ? (pyro) : (
                          (image==='astrid.png') ? (astrid) : (
                            (image==='bomba.png') ? (bomba) : (
                              (image==='jugador.png') ? (jugador) : (vida)
                            )
              )))))))
            )}/></div>
            {/* {console.log('la url', url + image)} */}
            {vida_base !== null || bomba_base !== null ? (
                <div className='info'>
                    <div className='info-details'>
                        <img src={vida}/>
                        <p>{vida_base}</p>
                    </div>
                    <div className='info-details'>
                        <img src={bomba}/>
                        <p>{bomba_base}</p>
                    </div>
                </div>
            ) : null}
            <div className='content'>{content}</div>

        </button>
  );
}
