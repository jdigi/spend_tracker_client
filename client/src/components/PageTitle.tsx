export const PageTitle = ({ title }: { title: string }) => {
  return (
    <header className="w-full py-4 border-b border-t border-slate-300 flex items-center">
      <img
        src="https://empower.me/static/icon-empower-trademark.f9c0947b.svg"
        alt="Empower Logo"
        className="invert w-10 h-10 mr-4"
      />
      <h1 className="text-2xl md:text-3xl font-serif font-bold">{title}</h1>
    </header>
  );
};
