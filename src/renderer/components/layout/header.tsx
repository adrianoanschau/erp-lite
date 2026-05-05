const Header = () => (
    <div 
        style={{ WebkitAppRegion: 'drag' } as any} 
        className="h-12 w-full flex items-center px-4 justify-between bg-slate-50/50 border-b border-slate-100"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">E</span>
          </div>
          <span className="text-xs font-semibold text-slate-600 tracking-tight">ERP Lite</span>
        </div>
        
        {/* Espaço para botões de controle se desejar (opcional em janelas de login) */}
        <div style={{ WebkitAppRegion: 'no-drag' } as any} className="flex gap-2">
           <button onClick={() => window.close()} className="text-slate-400 hover:text-red-500 transition-colors text-lg">×</button>
        </div>
    </div>
)

export default Header;
