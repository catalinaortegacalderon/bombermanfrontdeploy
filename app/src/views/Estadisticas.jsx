import '../assets/styles/style_paginas_principales.css';
import BackButton from '../components/buttons/BackButton';

export default function Estadisticas() {
  return (
        <div className='login'>
            <div className='contenedor-estadisticas'>
                <h1>Estadísticas</h1>
                <p>Nivel: 21</p>
                <br/>
                <p>Monedas: 103</p>
                <br/>
                <p>Experiencia total: 10092</p>
                <br/>
                <p>Partidas Ganadas: 20</p>
                <br/>
                <p>Partidas Perdidas: 3</p>
                <div className='contenedor-botones'>
                    <BackButton />
                </div>
            </div>
        </div>
  );
}
