// TestComponent.jsx
import React, { useContext } from 'react';
import { UserContext } from '../assets/UserContext';

const TestComponent = () => {
  const { userName, setUserName } = useContext(UserContext);

  return (
        <div>
            <h2>Prueba de Contexto</h2>
            <p>userName en el contexto: {userName}</p>
            <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Establece el userName"
            />
        </div>
  );
};

export default TestComponent;
