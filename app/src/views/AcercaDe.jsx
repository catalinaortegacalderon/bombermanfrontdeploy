import '../assets/styles/style_paginas_principales.css';
import BackButton from '../components/buttons/BackButton';

export default function AcercaDe() {
  return (
        <div className='login'>
            <div className='contenedor-about'>
                <h1>Nosotros...</h1>
                <div className='contenedor-persona'>
                    <h2>Lucía Fardella</h2>
                    <p>Lucía es una ingeniera. Ha trabajado en una variedad de proyectos de ingeniería civil y geociencias a lo largo de su carrera. Ha participado en la planificación y diseño de infraestructuras civiles, la evaluación de riesgos geológicos y geotécnicos, y la implementación de soluciones tecnológicas para mejorar la eficiencia en la gestión de datos geoespaciales. </p>
                    <br />
                </div>
                <div className='contenedor-persona'>
                    <h2>Catalina Ortega</h2>
                    <p>Catalina es una ingeniera de software apasionada y altamente especializada que combina su experiencia en tecnología con su pasión por el deporte y su habilidad para liderar proyectos. Su enfoque en el desarrollo de software de calidad se refleja en su capacidad para liderar equipos, resolver desafíos técnicos y alcanzar metas tanto en el mundo de la tecnología como en el deportivo. Su mentalidad de liderazgo y su compromiso con la excelencia la convierten en un recurso valioso en proyectos tecnológicos.</p>
                    <br />
                </div>
                <div className='contenedor-persona'>
                    <h2>Nicolás Raddatz</h2>
                    <p>Nicolás es un profesional altamente calificado que combina su sólida formación en ingeniería civil con un profundo conocimiento de las finanzas y la programación. Su capacidad para tomar decisiones informadas y desarrollar soluciones tecnológicas innovadoras lo convierten en un recurso valioso en proyectos que requieren una perspectiva financiera y tecnológica sólida. Su enfoque interdisciplinario es un activo importante en la industria de la ingeniería y las finanzas.</p>
                    <br />
                </div>
                <div className='contenedor-botones'>
                    <BackButton />
                </div>
            </div>
        </div>
  );
}
