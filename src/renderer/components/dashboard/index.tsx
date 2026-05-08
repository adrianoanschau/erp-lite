import React from 'react';
import { useAuth } from '@/renderer/contexts/auth-context';
import Page from '../layout/page';

const Dashboard: React.FC = () => {
  const { profile, logout } = useAuth();

  const stats = [
    { label: 'Pedidos Pendentes', value: '12', color: 'bg-blue-500' },
    { label: 'Produtos Ativos', value: '142', color: 'bg-emerald-500' },
    { label: 'Alertas de Estoque', value: '3', color: 'bg-amber-500' },
  ];

  return (
    <Page>
      <div className="flex h-full bg-slate-50 font-sans text-slate-900">
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
          <div className="p-6 text-white font-bold text-xl border-b border-slate-800">
            ERP <span className="text-blue-400">Lite</span>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <div className="text-xs uppercase text-slate-500 font-semibold px-2 mb-2">
              Principal
            </div>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg bg-blue-600 text-white shadow-sm"
            >
              <span>📊</span> Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <span>📦</span> MDM (Produtos)
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <span>🛒</span> OMS (Pedidos)
            </a>

            <div className="text-xs uppercase text-slate-500 font-semibold px-2 mt-6 mb-2">
              Administração
            </div>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <span>👥</span> Usuários
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <span>⚙️</span> Configurações
            </a>
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors"
            >
              <span>🚪</span> Sair do Sistema
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-700">
              Visão Geral
            </h2>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 leading-tight">
                  {profile?.full_name || 'Carregando...'}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  Acesso: {profile?.role || 'Visitante'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold">
                {profile?.full_name?.charAt(0) || 'U'}
              </div>
            </div>
          </header>

          <div className="p-8 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-sm text-slate-500 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold mt-2 flex items-baseline gap-2">
                    {stat.value}
                    <span
                      className={`w-2 h-2 rounded-full ${stat.color}`}
                    ></span>
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm h-96 flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">
                  Atividades Recentes
                </h3>
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  Ver tudo
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center text-slate-400 italic">
                Nenhuma atividade registrada no momento.
              </div>
            </div>
          </div>
        </main>
      </div>
    </Page>
  );
};

export default Dashboard;
