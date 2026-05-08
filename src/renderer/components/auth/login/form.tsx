import React from 'react';
import Page from '../../layout/page';
import { useLogin } from './useLogin';
import { KeyboardModifiersAlert } from './KeyboardModifiersAlert';

const LoginForm: React.FC = () => {
  const { data, loading, error, setData, onSubmit } = useLogin();

  return (
    <Page>
      <div className="flex flex-col gap-12 justify-between h-full">
        <form onSubmit={onSubmit} className="space-y-4 p-8">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Bem-vindo
            </h1>
            <p className="text-sm text-slate-500">
              Identifique-se para acessar o painel.
            </p>
          </header>

          {error && (
            <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-red-600 text-[13px] animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              E-mail
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800 placeholder:text-slate-400"
              placeholder="exemplo@deliverit.com"
              disabled={loading}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Senha
            </label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-800 placeholder:text-slate-400"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <KeyboardModifiersAlert />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-md text-sm transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 mt-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Entrar'
            )}
          </button>
        </form>
        
        <footer className="mt-auto p-6">
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              ERP Lite
            </span>
            <span className="text-[11px] text-slate-300">
              v{window.api.version}
            </span>
          </div>
        </footer>
      </div>
    </Page>
  );
};

export default LoginForm;
