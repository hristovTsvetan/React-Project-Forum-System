import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ModalProvider} from './context/ModalContext';
import {UserProvider} from './context/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
