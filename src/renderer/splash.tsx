import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from "react-router-dom";
import './assets/index.css';
import Splash from './components/layout/splash';
import { AuthProvider } from './contexts/auth-context';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Splash />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
);
