import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [nombreLobby, setNombreLobby] = useState('');
  const [jwtoken, setJwtoken] = useState('');
  const [id, setId] = useState('');
  const [idpartida, setIdpartida] = useState('');
  const [idtablero, setIdtablero] = useState('');

  return (
        <UserContext.Provider value={{
          userName, setUserName, nombreLobby, setNombreLobby, jwtoken, setJwtoken, id, setId, idpartida, setIdpartida, idtablero, setIdtablero
        }}>
            {children}
        </UserContext.Provider>
  );
};
