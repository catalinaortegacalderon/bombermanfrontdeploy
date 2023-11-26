import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './Inicio';
import InicioSesion from './InicioSesion';
import Registro from './Registro';
import Reglas from './Reglas';
import AcercaDe from './AcercaDe';
import Tienda from './Tienda';
import Partida from './Partida';
import EsperandoJugadores from './Esperando_Jugadores';
import IniciarPartida from './IniciarPartida';
import InicioRegistrado from './InicioRegistrado';
import Skins from './Skins';
import CrearLobbyPrivado from './Lobbys/CrearLobbyPrivado';
import CrearLobbyPublico from './Lobbys/CrearLobbyPublico';
import UnirseLobbyPrivado from './Lobbys/UnirseLobbyPrivado';
import UnirseLobbyPublico from './Lobbys/UnirseLobbyPublico';
import Usuario from './Usuario';
import Estadisticas from './Estadisticas';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Routing() {
  return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path={'/'} element={<Inicio/>} />
                    <Route path={'/iniciosesion'} element={<InicioSesion/>} />
                    <Route path={'/registro'} element={<Registro/>} />
                    <Route path={'/reglas'} element={<Reglas/>} />
                    <Route path={'/acercade'} element={<AcercaDe/>} />
                    <Route path={'/tienda'} element={<Tienda/>} />
                    <Route path={'/tienda/skins'} element={<Skins/>} />
                    <Route path={'/partida'} element={<Partida/>} />
                    <Route path={'/iniciarpartida'} element={<IniciarPartida/>} />
                    <Route path={'/inicioregistrado'} element={<InicioRegistrado/>} />
                    <Route path={'/crearlobbyprivado'} element={<CrearLobbyPrivado/>} />
                    <Route path={'/unirselobbyprivado'} element={<UnirseLobbyPrivado/>} />
                    <Route path={'/crearlobbypublico'} element={<CrearLobbyPublico/>} />
                    <Route path={'/unirselobbypublico'} element={<UnirseLobbyPublico/>} />
                    <Route path={'/usuario'} element={<Usuario/>} />
                    <Route path={'/estadisticas'} element={<Estadisticas/>} />
                    <Route path={'/esperando'} element={<EsperandoJugadores/>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
  );
}
