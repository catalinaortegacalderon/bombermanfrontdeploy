import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Tienda.css';
import BackButton from '../components/buttons/BackButton';
import PowerButton from '../components/buttons/PowerButton';
import jugador from '../../public/images/jugador.png';
import vida from '../../public/images/vida.png';
import bomba from '../../public/images/bomba.png';
import moneda from '../../public/images/moneda.png';

export default function Tienda() {
  const [isLoading, setIsLoading] = useState(true);
  const [playerInfo, setPlayerInfo] = useState({});
  const [itemsInfo, setItemsInfo] = useState({});
  const navigate = useNavigate();

  const handleNavigateToSkins = (event) => {
    event.preventDefault();
    navigate('/tienda/skins');
  };

  function handleBuyLife() {
    if (playerInfo.monedas < itemsInfo.vida) {
      alert('No tienes suficientes monedas para comprar una vida. ¡Ve a jugar!');
    } else {
      const a = confirm(`¿Seguro que deseas comprar una vida por ${itemsInfo.vida} monedas`);
      if (a) {
        const request = {};
        request.request = 'buyLife';
        request.playerInfo = playerInfo;
        request.itemsInfo = itemsInfo;
        console.log('Peticion al backend de comprar vida con la request:', request);
      }
    }
  }

  function handleBuyBomb() {
    if (playerInfo.monedas < itemsInfo.bomba) {
      alert('No tienes suficientes monedas para comprar una bomba. ¡Ve a jugar!');
    } else {
      const a = confirm(`¿Seguro que deseas comprar una bomba por ${itemsInfo.bomba} monedas`);
      if (a) {
        const request = {};
        request.request = 'buyBomb';
        request.playerInfo = playerInfo;
        request.itemsInfo = itemsInfo;
        console.log('Peticion al backend de comprar bomba con la request:', request);
      }
    }
  }

  // recibir la info del backend de forma asincrona
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        console.log('fetching info');
        // aca en realidad va la request al backend
        // la response es la info a setear
        setPlayerInfo({
          id_jugador: 34,
          usuario: 'nicoraddatz',
          experiencia: 0,
          monedas: 200,
          purchasedSkins: ['default', 'Pupi'],
          skinSeleccionada: 'default',
        });
        setItemsInfo({
          bomba: 26,
          vida: 11,
        });

        setIsLoading(false);
        console.log('ended fetching info', playerInfo, itemsInfo);
      } catch (error) {
        console.log('Error al realizar la solicitud', error);
      }
    };
    fetchInfo();
  }, []);

  return (
        <div className='contenedor-tienda'>
            {isLoading ? (<p>Cargando...</p>) : (
                <>
                <div className='box-arriba'>
                    <div className='contenido-izquierda'>
                        <img src={moneda} alt="Moneda"/><h1>{playerInfo.monedas}</h1>
                    </div>
                    <div className='contenido-derecha'>
                        <h1>Tienda</h1>
                    </div>
                </div>
                <div className='box-abajo'>
                        <a href="#" onClick={handleNavigateToSkins}><PowerButton title={'SKINS'} image={jugador} money={'0'}></PowerButton></a>
                    <PowerButton title={'VIDAS'} image={vida} money={itemsInfo.vida} onClick={handleBuyLife}/>
                    <PowerButton title={'BOMBA'} image={bomba} money={itemsInfo.bomba} onClick={handleBuyBomb}/>
                </div>
                <div className='contenedor-botones'>
                    <BackButton />
                </div>
                </>
            )}
        </div>
  );
}
