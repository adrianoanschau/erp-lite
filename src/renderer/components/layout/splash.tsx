import React, { useEffect } from 'react';
import { useAuth } from '@/renderer/contexts/auth-context';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Splash: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    async function checkAuth() {
      try {
        if (!loading) {
          if (mode === 'initial_boot') {
            window.electron.send('ready', isAuthenticated);
          } else {
            navigate('/dashboard');
          }
        }
      } catch (err) {
        console.error('Erro no Splash:', err);
      }
    }

    const timer = setTimeout(checkAuth, 1000);
    return () => clearTimeout(timer);
  }, [loading, isAuthenticated, mode, navigate]);

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
