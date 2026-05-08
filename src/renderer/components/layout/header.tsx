const Header = () => {
  const handleMinimize = () => {
    window.controls.minimize();
  };

  const handleMaximize = () => {
    window.controls.maximize();
  };

  const handleClose = () => {
    window.close();
  };

  return (
    <div style={{ WebkitAppRegion: 'drag' } as any} className="app-header">
      <div className="flex items-center gap-2 ml-2">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-[10px] text-white font-bold">E</span>
        </div>
        <span className="text-xs font-semibold text-slate-600 tracking-tight">
          ERP Lite
        </span>
      </div>

      <div
        style={{ WebkitAppRegion: 'no-drag' } as any}
        className="flex h-full"
      >
        <button
          onClick={handleMinimize}
          className="px-3 h-full text-slate-500 hover:bg-slate-100 transition-colors flex items-center"
          title="Minimizar"
        >
          <span className="w-3 h-[1.5px] bg-current"></span>
        </button>

        <button
          onClick={handleMaximize}
          className="px-3 h-full text-slate-500 hover:bg-slate-100 transition-colors flex items-center"
          title="Maximizar/Restaurar"
        >
          <div className="w-3 h-3 border-[1.5px] border-current"></div>
        </button>

        <button
          onClick={handleClose}
          className="px-4 h-full text-slate-500 hover:bg-red-500 hover:text-white transition-colors text-lg flex items-center"
          title="Fechar"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Header;
