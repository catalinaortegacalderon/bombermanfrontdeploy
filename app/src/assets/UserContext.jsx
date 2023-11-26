import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [nombreLobby, setNombreLobby] = useState('');

  return (
        <UserContext.Provider value={{
          userName, setUserName, nombreLobby, setNombreLobby,
        }}>
            {children}
        </UserContext.Provider>
  );
};
