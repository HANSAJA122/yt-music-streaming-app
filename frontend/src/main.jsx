import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </AuthProvider>
  </React.StrictMode>
);
