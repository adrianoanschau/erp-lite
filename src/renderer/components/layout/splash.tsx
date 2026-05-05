import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInitialSession } from '@/renderer/functions/session';

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await getInitialSession();
        
        if (data && data.profile?.status === 'active') {
          navigate('/dashboard');
        } else {
          window.electron.send('logout');
        }
      } catch (err) {
        console.error('Erro na inicialização:', err);
        window.electron.send('logout');
      }
    }

    const timer = setTimeout(checkAuth, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold tracking-widest uppercase italic">
          ERP <span className="text-blue-500">Lite</span>
        </h1>
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <footer className="absolute bottom-8 text-slate-500 text-[10px] uppercase tracking-[0.3em]">
        Carregando módulos de sistema
      </footer>
    </div>
  );
};

export default Splash;
