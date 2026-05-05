import React from 'react';
import { createRoot } from 'react-dom/client';
import LoginForm from './components/auth/login/form';
import './assets/index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginForm />
  </React.StrictMode>,
);
