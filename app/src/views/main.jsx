import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from './Routing';
import { UserProvider } from '../assets/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <Routing />
    </UserProvider>
  </React.StrictMode>,
);
