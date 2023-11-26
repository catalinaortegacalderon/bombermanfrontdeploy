import { useEffect, useState } from "react";
import '../assets/styles/Skins.css'
import BackButton from '../components/buttons/BackButton'
import PowerButton from '../components/buttons/PowerButton'
import logo from '../assets/images/jugador.png'
import green_check from '../assets/images/green_check.png'
import moneda from '../assets/images/moneda.png'
import axios from 'axios';
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
    const [isLoading, setIsLoading] = useState(true)
    const [playerInfo, setPlayerInfo] = useState({})
    const [skinsInfo, setSkinsInfo] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [selectedSkin, setSelectedSkin] = useState({})
    const [userId, setUserId] = useState(0)
    
    

    // recibir la info del backend de forma asincrona. En este caso esta simulado.
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                console.log("fetching info");
                setPlayerInfo({
                    "id_usuario": 2,
                    "usuario": 'nicoraddatz',
                    "experiencia": 0,
                    "monedas": 200,
                    "skinSeleccionada": "default",
                });
                setUserId(2)
            } catch (error) {
                console.log("Error al realizar la solicitud", error);
            }
        };
        fetchUserInfo()
    }, []);


    useEffect(() => {
        const fetchBackendInfo = async () => {
            try {
                // traerme la info de las skins compradas que tiene el jugador
                console.log("playerinfo en 2", userId)
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/compras/2`)
                    .then((response) => {
                        const idPersonajesArray = response.data.map(compra => compra.id_personaje)
                        console.log("idarrays", idPersonajesArray)
                        const purchasedSkins = [];
                        skinsInfo.forEach(skin => {
                            if (idPersonajesArray.includes(skin.id)) {
                                purchasedSkins.push(skin.name);
                            }
                        })
                        console.log("Skins de este usuario", purchasedSkins);
                        const agregarPurchasedSkins = { ...playerInfo }
                        agregarPurchasedSkins["purchasedSkins"] = purchasedSkins
                        setPlayerInfo(agregarPurchasedSkins)
                    }).catch((error) => {
                        console.log("error en traerme las compras de un usuario", error);
                    })

                
                // traerme la info de las skins desde el backend
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/personajes`)
                    .then((response) => {
                        // console.log('La response es:', response) 
                        // console.log('La response data es:', response.data) // la response.data es lo que me aparece exacto en postman al hacer el request
                        // la unica excepcion a lo anterior, es q si devuelvo una lista de diccionarios, la request.data me va a ajustar eso para poner key-value en el diccionario. Entonces
                        // en este caso me pone de key, indices q parten desde el 0.
                        // console.log('La response data en posicion 0 es:', response.data[0])
                        setSkinsInfo(response.data);

                    }).catch((error) => {
                        console.log("error en traerme las skins", error);
                    })
                // crear variable de purchasedSkins
                // console.log('el array de ids es:', idPersonajesArray)

                setIsLoading(false);
                console.log("ended fetching backend info", playerInfo, skinsInfo);
            } catch (error) {
                console.log("Error al realizar la solicitud", error);
            }
        };
        fetchBackendInfo()
    }, []);



    function unSelectSkin() {
        setSelectedSkin({});
    }

    function handleSkin(skin) {
        // console.log("Se hizo click en boton de skin:", skin)
        // console.log("El jugador tiene puesta la skin:", playerInfo.skinSeleccionada)
        // console.log(playerInfo.purchasedSkins.includes(skin.name))
        // console.log(playerInfo.skinSeleccionada !== skin.name)
        // console.log(playerInfo.purchasedSkins.includes(skin.name) && playerInfo.skinSeleccionada !== skin.name)
        const request = {}
        setSelectedSkin(skin)
        if (playerInfo.purchasedSkins.includes(skin.name)) {
            if (playerInfo.skinSeleccionada === skin.name) {
                console.log("apreta la misma skin que tiene puesta, no pasa nada")
            } else {
                // console.log("apreta una skin que tiene");
                const eleccion = confirm(`¿Quieres equiparte con la skin ${skin.name}?`);
                if (eleccion) {
                    // request de backend para equiparse la skin  
                    request["request"] = "equipSkin";
                    request["skinName"] = skin.name
                    request["playerInfo"] = playerInfo;
                    request["skinsInfo"] = skinsInfo;
                    console.log(`Request al backend para equiparse la skin ${skin.name} de id ${skin.id}`, request);
                    axios.post(`${import.meta.env.VITE_BACKEND_URL}/compra`, request)
                }
            }
        } else {
            if (playerInfo.monedas < skin.cost) {
                alert("No tienes suficientes monedas para comprar esta skin. ¡Ve a jugar!")
            } else {
                const comprar = confirm(`¿Quieres comprar la skin ${skin.name}?`);
                    if (comprar) {
                    request["playerInfo"] = playerInfo;
                    request["request"] = "buySkin";
                    request["skinName"] = skin.name;
                    request["purchaseInfo"] = selectedSkin;
                    request["id_usuario"] = 2;
                    request["id_personaje"] = skin.id;
                    axios.post(`${import.meta.env.VITE_BACKEND_URL}/compras`, request)
                        .then((response) => {
                            console.log('La data es:', response.data)
                            console.log('La data en 0 es:', response.data[0])
                            const data = response.data
                        }).catch((error) => {
                            console.log('eeerror', error)
                        })
                    console.log(`Request al backend para comprar la skin ${skin.name}`, request)
                    // y ahora se manda al backend la peticion de compra de una skin
                }
            }
        }
    }

  return (
        <div className='contenedor-skins'>
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
                          return <PowerButton
                            key={skinName}
                            title={skin.name}
                            image={logo}
                            item_info = {[skin.vida_base, skin.bomba_base]}
                            money={playerInfo.skinSeleccionada === skin.name ?
                             <img className="check" src={green_check} alt="Checkmark" />
                              : (playerInfo.purchasedSkins.includes(skin.name) ? "Select skin" : skin.cost)}
                            onClick={handleSkin.bind(this, skin)}/>
                            

                        })}
                    </div>
                </div>
                <div className='contenedor-botones'>
                    <BackButton />
                </div>
                </>
            )}
        </div>
  );
}
