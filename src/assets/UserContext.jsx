import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [nombreLobby, setNombreLobby] = useState('');
  const [jwtoken, setJwtoken] = useState('');
  const [id, setId] = useState('');
  const [idpartida, setIdpartida] = useState('');
  const [idtablero, setIdtablero] = useState('');
  const [numjugador, setNumjugador] = useState('');
  const [turno, setTurno] = useState('');
  const [idjugador, setIdjugador] = useState('');

  return (
        <UserContext.Provider value={{
          userName, setUserName, nombreLobby, setNombreLobby, jwtoken, setJwtoken, id, setId, idpartida, setIdpartida, idtablero, setIdtablero, numjugador, setNumjugador, turno, setTurno, idjugador, setIdjugador
        }}>
            {children}
        </UserContext.Provider>
  );
};
