const Footer = () => (
  <footer className="mt-auto pb-6">
    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
      <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
        ERP Lite
      </span>
      <span className="text-[11px] text-slate-300">v{window.api.version}</span>
    </div>
  </footer>
);

export default Footer;
