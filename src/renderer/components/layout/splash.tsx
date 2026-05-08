import React, { useEffect } from 'react';
import { useAuth } from '@/renderer/contexts/auth-context';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Splash: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  const isInitialBoot = mode === 'initial_boot';
  const backgroundColor = isInitialBoot ? 'bg-transparent' : 'bg-slate-900';

  useEffect(() => {
    async function checkAuth() {
      try {
        if (!loading) {
          if (isInitialBoot) {
            window.electron.send('ready', isAuthenticated);
          } else {
            navigate('/dashboard');
          }
        }
      } catch (err) {
        console.error('Erro no Splash:', err);
      }
    }

    const timer = setTimeout(checkAuth, isInitialBoot ? 3000 : 1000);
    return () => clearTimeout(timer);
  }, [loading, isAuthenticated, mode, navigate, isInitialBoot]);

  return (
    <div
      className={`h-screen w-screen flex flex-col items-center justify-center ${backgroundColor}`}
    >
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold tracking-widest uppercase italic">
          ERP <span className="text-blue-500">Lite</span>
        </h1>
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Splash;
