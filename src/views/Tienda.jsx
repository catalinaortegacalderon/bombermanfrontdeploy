import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Tienda.css';
import BackButton from '../components/buttons/BackButton';
import PowerButton from '../components/buttons/PowerButton';
import jugador from '../../public/images/jugador.png';
import vida from '../../public/images/vida.png';
import bomba from '../../public/images/bomba.png';
import moneda from '../../public/images/moneda.png';
import axios from 'axios';
import { UserContext } from '../assets/UserContext';


export default function Tienda() {
  const [isLoading, setIsLoading] = useState(true);
  const [playerInfo, setPlayerInfo] = useState({});
  const [itemsInfo, setItemsInfo] = useState({});
  const { userName, setUserName } = useContext(UserContext);
  const { jwtoken, setJwtoken } = useContext(UserContext);
  const { id, setId} = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigateToSkins = (event) => {
    event.preventDefault();
    navigate('/tienda/skins');
  };

  async function handleBuyLife() {
    if (playerInfo.monedas < itemsInfo.vida) {
      alert('No tienes suficientes monedas para comprar una vida. ¡Ve a jugar!');
    } else {
      const a = confirm(`¿Seguro que deseas comprar una vida por ${itemsInfo.vida} monedas`);
      if (a) {
        // const vida_base = playerInfo.vida_base + 1;
        // const monedas = playerInfo.monedas - itemsInfo.vida
        const nuevasVidas = {
          "vida_base": playerInfo.vida_base + 1,
          "monedas": playerInfo.monedas - itemsInfo.vida};
        console.log('Peticion al backend de comprar bomba con la request:', nuevasVidas);
        await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${id}`, nuevasVidas);
        fetchInfo();
      }
    }
  }

  async function handleBuyBomb() {
    if (playerInfo.monedas < itemsInfo.bomba) {
      alert('No tienes suficientes monedas para comprar una bomba. ¡Ve a jugar!');
    } else {
      const a = confirm(`¿Seguro que deseas comprar una bomba por ${itemsInfo.bomba} monedas`);
      if (a) {
        const nuevasBombas = {
          "bombas_base": playerInfo.bombas_base + 1,
          "monedas": playerInfo.monedas - itemsInfo.bomba};
        console.log('Peticion al backend de comprar bomba con la request:', nuevasBombas);
        await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${id}`, nuevasBombas);
        fetchInfo();
      }
    }
  }


//   const fetchItemsInfo = () => {
//     axios.get(`${import.meta.env.VITE_BACKEND_URL}/items`)
//         .then((response) => {
//         }).catch((error) => {
//             console.log("error en traerme los items", error);
//         })
// };


  const fetchInfo = async () => {
    try {
      console.log('fetching info');
      console.log('el id de usuario y nombre es:', id, userName);
      
      const info = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${userName}`);
      console.log('la info del jugador es', info.data);
      setPlayerInfo(info.data);
      setItemsInfo({
        bomba: 26,
        vida: 11,
      });
    } catch (error) {
      console.log('Error al realizar la solicitud', error);
    }
  };
    

  // recibir la info del backend de forma asincrona
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
          <>
        {id ? (
        <div className='contenedor-tienda'>
            {/* {id ? () : (alert('Primero debes iniciar sesion'))}          */}
            
            {(Object.keys(playerInfo)>1) ? (<p>Cargando...</p>) : (
                <>
                <div className='box-arriba'>
                    <div className='contenido-izquierda'>
                        <img src={moneda} alt="Moneda"/><h1>{playerInfo.monedas}</h1>
                    </div>
                    <div className='contenido-almedio'>
                      {/* <div className='mostrar-items'> */}
                        <h2>Items</h2>
                        <div className='mostrar-bomba'>
                          <img src={bomba}/>: {playerInfo.bombas_base}
                        </div>
                        <div className='mostrar-vida'>
                          <img src={vida}/>: {playerInfo.vida_base}
                        </div>
                      {/* </div> */}
                    </div>
                    <div className='contenido-derecha'>
                        <h1>Tienda</h1>
                    </div>
                </div>
                <div className='box-abajo'>
                        <a href="#" onClick={handleNavigateToSkins}><PowerButton title={'SKINS'} image={'jugador.png'} money={'0'}></PowerButton></a>
                    <PowerButton title={'VIDAS'} image={'vida.png'} money={<><img src={moneda} alt="Moneda"/> {itemsInfo.vida}</>} onClick={handleBuyLife}/>
                    <PowerButton title={'BOMBA'} image={'bomba.png'} money={<><img src={moneda} alt="Moneda"/> {itemsInfo.bomba}</>} onClick={handleBuyBomb}/>
                </div>
                <div className='contenedor-botones'>
                    <BackButton />
                </div>
                </>
            )}
        </div>
      ) : (<p>Debes iniciar sesión primero</p>)}
      </>
  );
}
