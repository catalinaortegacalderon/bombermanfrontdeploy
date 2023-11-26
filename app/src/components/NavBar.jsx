import '../assets/styles/components/NavBar.css';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../assets/UserContext';

export default function NavBar() {
  const { userName, setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserName('');
    navigate('/');
  };

  const handleNavigation = (event, route) => {
    event.preventDefault();
    navigate(route);
  };

  return (
        <nav className='container-navbar'>
            <div className='izquierda-navbar'>
                <a href="#" onClick={(e) => handleNavigation(e, userName ? '/inicioregistrado' : '/')} style={{ cursor: 'pointer' }}>Inicio</a>
                <a href="#" onClick={(e) => handleNavigation(e, '/reglas')} style={{ cursor: 'pointer' }}>Reglas</a>
                <a href="#" onClick={(e) => handleNavigation(e, '/acercade')} style={{ cursor: 'pointer' }}>Acerca de</a>
            </div>
            <div className='derecha-navbar'>
                {userName ? (
                    <>
                        <a href="#" onClick={(e) => handleNavigation(e, '/usuario')} style={{ cursor: 'pointer' }}>{userName}</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} style={{ cursor: 'pointer' }}>Salir</a>
                    </>
                ) : (
                    <>
                        <a href="#" onClick={(e) => handleNavigation(e, '/iniciosesion')} style={{ cursor: 'pointer' }}>Iniciar Sesión</a>
                        <a href="#" onClick={(e) => handleNavigation(e, '/registro')} style={{ cursor: 'pointer' }}>Registrarse</a>
                    </>
                )}
            </div>
        </nav>
  );
}
