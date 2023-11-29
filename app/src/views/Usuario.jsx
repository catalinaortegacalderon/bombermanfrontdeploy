import '../assets/styles/style_paginas_principales.css';
import { useState, useContext, useEffect } from 'react';
import BackButton from '../components/buttons/BackButton';
import { UserContext } from '../assets/UserContext';
import axios from 'axios';

//use state crea variables dinamicas para actualizacion automatica en front

export default function Usuario() {
    const [mail, setMail] = useState(''); //adentro de usastate va el valor inicial de la variable y su tipo (string, diccionario seria {}, etc)
    const { userName } = useContext(UserContext);
    const [expereincia, setExperiencia] = useState('');
    const [monedas, setMonedas] = useState('');


    //usefect se ejecuta cuando cambia el estado de la variable, en eeste caso solo
    // se ejecuta el comienzo, pusimos variable vacia []
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${userName}`)
            .then((response) => {
                // console.log('La response es:', response) 
                // console.log('La response data es:', response.data) // la response.data es lo que me aparece exacto en postman al hacer el request
                // la unica excepcion a lo anterior, es q si devuelvo una lista de diccionarios, la request.data me va a ajustar eso para poner key-value en el diccionario. Entonces
                // en este caso me pone de key, indices q parten desde el 0.
                // console.log('La response data en posicion 0 es:', response.data[0])
                //setSkinsInfo(response.data)
                setMail(response.data.mail);
                setExperiencia(response.data.experiencia);
                setMonedas(response.data.monedas);
            }).catch((error) => {
                console.log("error al obtener usuario", error);
            })
    }, []);

    return (
        <div className='login'>
            <div className='contenedor-usuario'>
                <h1>Usuario</h1>
                <p>Nombre de Usuario: {userName}</p>
                <br />
                <p>Mail: {mail}</p>
                <br />
                <p>Experiencia: {expereincia}</p>
                <br />
                <p>Monedas: {monedas}</p>
                <div className='contenedor-botones'>
                    <BackButton />
                </div>
            </div>
        </div>
    );
}
