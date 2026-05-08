import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { login, logout } from '../functions/auth';
import { getInitialSession } from '../functions/session';

interface UserData {
  id: string;
  email?: string;
}

interface ProfileData {
  full_name: string;
  role: 'admin' | 'operator' | 'viewer';
  status: 'active' | 'inactive';
}

interface AuthContextData {
  user: UserData | null;
  profile: ProfileData | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredSession() {
      try {
        const data = await getInitialSession();

        if (data && data.profile?.status === 'active') {
          setUser(data.user);
          setProfile(data.profile);
        }
      } catch (error) {
        console.error('Falha ao restaurar sessão:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStoredSession();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      setUser(data.user);
      setProfile(data.profile);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        loading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
