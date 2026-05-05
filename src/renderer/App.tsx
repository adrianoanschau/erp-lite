import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Splash from "./components/layout/splash";
import { useAuth } from "./contexts/auth-context";

function App() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    return await logout();
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/dashboard" element={<div>
          Dashboard
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair do Sistema
          </button>
        </div>} />
      </Routes>
    </Router>
  );
}

export default App;
