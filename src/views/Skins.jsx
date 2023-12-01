import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Skins.css'
import BackButton from '../components/buttons/BackButton'
import PowerButton from '../components/buttons/PowerButton'
// import logo from '../assets/images/jugador.png'
// import skinDefault from '../assets/images/skins/jugador.png'
// import skinDefault from '../assets/images/skins/jugador.png'
// import skinDefault from '../assets/images/skins/jugador.png'
// import skinDefault from '../assets/images/skins/jugador.png'
// import skinDefault from '../assets/images/skins/jugador.png'
// import skinDefault from '../assets/images/skins/jugador.png'
// import skinDefault from '../assets/images/skins/jugador.png'
import green_check from '../../public/images/green_check.png'
import moneda from '../../public/images/moneda.png'
import axios from 'axios';
import { UserContext } from '../assets/UserContext';


// DOCUMENTACION:
//
// Si se quiere comprar skin se envia json:
// {
//     "id_usuario": 
//     "id_personaje"
// }
// y se mete eso a la tabla Compra
// Se devuelve


export default function Skins() {

    const [isLoadUser, setIsLoadUser] = useState(true)
    const [isLoadBought, setIsLoadBought] = useState(true)
    const [isLoadSkins, setIsLoadSkins] = useState(true)
    const [playerInfo, setPlayerInfo] = useState({}) // {}
    const [skinsInfo, setSkinsInfo] = useState([]) // []
    const [playerSkinsInfo, setPlayerSkinsInfo] = useState([]) // []
    const { userName, setUserName } = useContext(UserContext);
    const { jwtoken, setJwtoken } = useContext(UserContext);
    const { id, setId} = useContext(UserContext);
    const navigate = useNavigate();
    // const [fetchPlayerSkinsInfo, setFetchPlayerSkinsInfo] = useState(true) // []
    // const [quantity, setQuantity] = useState(0)
    // const [selectedSkin, setSelectedSkin] = useState({})
    // const [userId, setUserId] = useState(0)

    
    // Loading variables:
    // Si skinsInfo es null, skinsInfo es false.
    // Si skinsInfo es un array, skinsInfo es true.

    // recibir la info del backend de forma asincrona. En este caso esta simulado.
    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         try {
    //             console.log("fetching info");
    //             setPlayerInfo({
    //                 "id_usuario": 2,
    //                 "usuario": 'nicoraddatz',
    //                 "experiencia": 0,
    //                 "monedas": 200,
    //                 "skinSeleccionada": "default",
    //             });
    //             setUserId(2)
    //             setIsLoadingPlayerInfo(false);
    //         } catch (error) {
    //             console.log("Error al realizar la solicitud", error);
    //         }
    //     };
    //     fetchUserInfo()
    // }, []);


    // const fetchUserInfo = () => {
    //     axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${id}`)
    //         .then((response) => {
    //             console.log('La info del jugador', response.data);
    //             setPlayerInfo(response.data)
    //         }).catch((error) => {
    //             console.log("error en traerme las compras de un usuario", error);
    //         })
    // }

    const fetchUserInfo = async () => {
        try {
        //   console.log('fetching info');
        //   console.log('el id de usuario y nombre es:', id, userName);
        // console.log("username:", userName);
        if (userName) {
            const info = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${userName}`);
            console.log('la info del jugador es', info.data);
            setPlayerInfo(info.data);
            }
        } catch (error) {
          console.log('Error al realizar la solicitud', error);
        }
      };

    
    const fetchUserPurchases = async () => {
        console.log("el id es:", id);
        if (id) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/compras/${id}`)
                const idPersonajesArray = response.data.map(compra => compra.id_personaje)    
                setPlayerSkinsInfo(idPersonajesArray);
            } catch (error) {
                console.log('Error al traerme las compras de un usuario', error);
            }
        }
    };

    // traerme la info de las skins desde el backend
    const fetchSkins = async () => {
        if (id) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/personajes`)
                console.log('La data de los personajes es:', response.data);
                setSkinsInfo(response.data);
            } catch (error) {
                console.log('Error al traerme las compras de un usuario', error);
            }
        }
    }

    // Traer las compras del usuario
    useEffect(() => {
        fetchUserInfo();
        fetchUserPurchases();
        fetchSkins();
    }, []);

    
    // useEffect(() => {
    //     const idPersonajesArray = playerSkinsInfo.map(compra => compra.id_personaje)
    //     console.log("idarrays", idPersonajesArray)
    //     const purchasedSkins = [];
    //     skinsInfo.forEach(skin => {
    //         if (idPersonajesArray.includes(skin.id)) {
    //             purchasedSkins.push(skin.name);
    //         }
    //     })
    //     console.log("Skins de este usuario", purchasedSkins);
    //     const agregarPurchasedSkins = { ...playerInfo };
    //     agregarPurchasedSkins["purchasedSkins"] = purchasedSkins;
    //     console.log("agregarPurchasedSkins", agregarPurchasedSkins);
    //     setPlayerInfo(agregarPurchasedSkins);
    // }, [playerSkinsInfo]);

    async function sendPatch(request) {
        console.log(`El jugador ${userName} de id ${id} quiere hacer patch con ${request}`)
        try {
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${id}`, request);
            fetchUserInfo();
        } catch (error) {
            console.log('Error al realizar enviar patch', error);
        }
    }


    async function sendBuy(skinId, nuevas_monedas) {
        const request = {
            "id_usuario": id,
            "id_personaje": skinId
        }
        console.log(`El jugador ${userName} de id ${id} quiere comprar la skin ${skinId}`);
        const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/compras`, request);
        console.log('resp', resp);
        console.log('respstatus', resp.status);
        if (resp.status === 201) {
            const mensaje = {
                "monedas": nuevas_monedas
            }
            sendPatch(mensaje);
        } else {
            alert('Hubo un error al realizar la compra');
        }
        fetchUserPurchases();
    }

    function unSelectSkin() {
        setSelectedSkin({});
    }

    function handleSkin(skin) {
        console.log("Se hizo click en boton de skin:", skin)
        console.log("la info de playerskins", playerSkinsInfo)
        console.log("la info del jugador", playerInfo)
        // console.log("El jugador tiene puesta la skin:", playerInfo.skinSeleccionada)
        // console.log(playerInfo.purchasedSkins.includes(skin.name))
        // console.log(playerInfo.skinSeleccionada !== skin.name)
        // console.log(playerInfo.purchasedSkins.includes(skin.name) && playerInfo.skinSeleccionada !== skin.name)
        const request = {}
        // setSelectedSkin(skin)
        if (playerSkinsInfo.includes(skin.id)) {
            if (playerInfo.personajeSeleccionado === skin.name) {
                console.log("apreta la misma skin que tiene puesta, no pasa nada")
            } else {
                console.log("apreta una skin que tiene");
                const eleccion = confirm(`¿Quieres equiparte con la skin ${skin.name}?`);
                if (eleccion) {
                    request['personajeSeleccionado'] = skin.name
                    sendPatch(request);
                }
            }
        }
        else {
            if (playerInfo.monedas < skin.cost) {
                console.log('No tienes suficientes monedas para comprar esta skin. ¡Ve a jugar!');
                alert("No tienes suficientes monedas para comprar esta skin. ¡Ve a jugar!");
            } else {
                console.log("quiere comprar la skin")
                const comprar = confirm(`¿Quieres comprar la skin ${skin.name}?`);
                if (comprar) {
                    const nuevas_monedas = playerInfo.monedas - skin.cost;
                    sendBuy(skin.id, nuevas_monedas);
                }
            }

        }
      }


    return (
        <>
        {id ? (
        <div className='contenedor-skins'>
            {/* {console.log("lengths", Object.keys(playerInfo).length>0, skinsInfo.length>0, playerSkinsInfo.length>0)} */}
            {(Object.keys(playerInfo) >0 && skinsInfo.length>0 && playerSkinsInfo.length>0) ? (<p>Cargando...</p>) : (
                <>
                <div className='box-arriba'>
                    <div className='contenido-izquierda'>
                        <img src={moneda} alt="Moneda"/><h1>{playerInfo.monedas}</h1>
                    </div>
                    <div className='contenido-derecha'>
                        <h2>Skins de {userName}</h2>
                    </div>
                </div>
                    {/* <div className='box-medio'>
                    {Object.keys(selectedSkin).length == 0 ? null : (
                        <div className="skin-info">
                            <p>{selectedSkin.name}</p>
                            <button onClick={unSelectSkin}/>
                        </div>
                        )
                    }
                    </div> */}

                <div className='box-abajo-skins'>
                    <div className='fila'>
                        {Object.keys(skinsInfo).map((skinName) => {
                          const skin = skinsInfo[skinName];
                        //   console.log("la skin es", skin);
                          return <PowerButton
                            key={skinName}
                            title={skin.name}
                            image={skin.logo}
                            item_info = {[skin.vida_base, skin.bomba_base]}
                            money={playerInfo.personajeSeleccionado === skin.name ?
                             <img className="check" src={green_check} alt="Checkmark" />
                              : (playerSkinsInfo.includes(skin.id) ? "Seleccionar skin" : <><img src={moneda} alt="Moneda"/> {skin.cost} </>)}
                            onClick={handleSkin.bind(this, skin)}
                            />
                        })}
                    </div>
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
