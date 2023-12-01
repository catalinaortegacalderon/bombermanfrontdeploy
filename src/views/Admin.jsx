import '../assets/styles/style_paginas_principales.css';
import { useState, useContext, useEffect } from 'react';
import BackButton from '../components/buttons/BackButton';
import { UserContext } from '../assets/UserContext';
import InputBox from '../components/input_box';
import StandardButton from '../components/buttons/Boton_estandar';
import axios from 'axios';

//use state crea variables dinamicas para actualizacion automatica en front

export default function Usuario() {
    const { userName, jwtoken } = useContext(UserContext);
    const [mail, setMail] = useState('');
    const [contador, setContador] = useState(0);
    const [experiencia, setExperiencia] = useState('');
    const [monedas, setMonedas] = useState('');
    const [ideliminar, setIdeliminar] = useState('');
    const [userNames, setUserNames] = useState([]);
    const [info, setInfo] = useState([]);
    const [admin, setAdmin] = useState('');
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      // Lógica para verificar autorización y establecer admin
      axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/scope-example/protectedadmin`,
        {
          headers: {
            'Authorization': `Bearer ${jwtoken}`
          }
        }
      ).then((response) => {
        setAdmin("si");
      }).catch((error) => {
        console.log("No autorizado", error);
        setAdmin("no");
      });
    }, []); // 
  
    useEffect(() => {
      // Lógica para obtener la lista de usuarios
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios`)
        .then((response) => {
          const names = response.data.map(user => user.nombre);
        // setUserNames(names);
        // setInfo(response.data);
        // console.log(response.data);
        // console.log("el largo es",response.data.length);
        // console.log("la info es",info);
        // console.log("elemento 1 de la info es",info[0]);
        // console.log("elemento user de elemento 1 de la info es",info[0][1]);
        // setContador(response.data.length);
          setUsers(response.data)
        }).catch((error) => {
          console.log("error al obtener usuario", error);
        });
    }, []);
  
    const Redirect = () => {
      // Lógica para eliminar usuario
      axios.delete(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${ideliminar}`,       {
        headers: {
          'Authorization': `Bearer ${jwtoken}`
        }
      })
        .then((response) => {
          console.log(response.data);
          alert("usuario eliminado con éxito");
          setIdeliminar("");
        }).catch((error) => {
          console.log("error al eliminar usuario", error);
          alert("ingrese un id válido");
        });

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios`)
        .then((response) => {
          const names = response.data.map(user => user.nombre);
        // setUserNames(names);
        // setInfo(response.data);
        // console.log(response.data);
        // console.log("el largo es",response.data.length);
        // console.log("la info es",info);
        // console.log("elemento 1 de la info es",info[0]);
        // console.log("elemento user de elemento 1 de la info es",info[0][1]);
        // setContador(response.data.length);
          setUsers(response.data)

          history('/admin');
        }).catch((error) => {
          console.log("error al obtener usuario", error);
        });
    };

    if (admin == "no") {
        return (
            <div className='login'>
                <div className='contenedor-usuario'>
                    <h1>No tienes acceso a este recurso</h1>
                    <div className='contenedor-botones'>
                        <BackButton />
                    </div>
                </div>
            </div>
        );
    }
    else if (admin == "si") {
    //usefect se ejecuta cuando cambia el estado de la variable, en eeste caso solo
    // se ejecuta el comienzo, pusimos variable vacia []
    // useEffect(() => {
    //     axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios`)
    //         .then((response) => {
    //             const names = response.data.map(user => user.nombre);
    //             setUserNames(names);
    //             setInfo(response.data);
    //             console.log(response.data);
    //         }).catch((error) => {
    //             console.log("error al obtener usuario", error);
    //         })
    // }, []);


    return (
        <div className='login'>
        <div className='contenedor-iniciosesion'>
          <h1>Página de administrador: </h1>
          <h2>Ingrese el id del usuario que desea eliminar</h2>

          {/* <div>
                    {userNames.map((name, index) => (
                        <p key={index}>{name}</p>
                    ))}
                </div> */}
          <InputBox setter={setIdeliminar} value={ideliminar} />
                <h1>Lista de usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            Id: {user.id}, Usuario: {user.usuario}, Mail: {user.mail}
          </li>
        ))}
      </ul>

          {/* {info.map((s) => (
        <p>{s}</p>
      ))} */}



          {/* {info.map((usuario, index) => (
                        <p key={index}>{usuario.nombre}</p>
                    ))} */}
          <div className='contenedor-botones'>
            <BackButton />
            <StandardButton text='Eliminar' redirect_function={Redirect} />
          </div>
        </div>
      </div>
    );
}
}
