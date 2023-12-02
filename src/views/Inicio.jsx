import '../assets/styles/style_paginas_principales.css';
import logoImg from '../../public/images/logo.png';

export default function Inicio() {
  return (
        <div className='landing'>
            <div className='contenedor-landing'>
                <div className='box izquierda'>
                    <div className='contenedor-botones-y-titulo'>
                        <h1>Bomber</h1>
                        <h1>Checho Man!</h1>
                        <br/>
                        <a href='/iniciosesion' className='boton-color-1'>Iniciar sesión</a>
                        <a href='/registro' className='boton-color-2'>Registrarse</a>
                        <a href='/reglas' className='boton-color-3'>Reglas</a>
                        <a href='/acercade' className='boton-color-4'>Acerca de...</a>
                    </div>
                </div>
                <div className='box derecha'>
                    <img src={logoImg} alt="Logo" />
                </div>
            </div>
        </div>
  );
}
