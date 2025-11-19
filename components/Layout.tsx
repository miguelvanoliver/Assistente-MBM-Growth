
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PenTool, GitMerge, Menu, X, PieChart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/generator', label: 'Criador & Vendas', icon: <PenTool size={20} /> },
    { path: '/strategy', label: 'Estratégia & Vendas', icon: <GitMerge size={20} /> },
    { path: '/analysis', label: 'Análise de Dados', icon: <PieChart size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-mbm-black text-slate-200 flex flex-col md:flex-row font-sans selection:bg-mbm-gold selection:text-mbm-black">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col bg-mbm-dark border-r border-slate-800 fixed h-full z-10">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-mbm-gold shadow-lg shadow-amber-900/20">
               {/* 
                  Image used as profile icon for MBM Assistant.
                  Representing the 'attached' image from the user request.
               */}
               <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                alt="Perfil Assistente MBM"
                className="w-full h-full object-cover" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/150/000000/D4AF37?text=MBM";
                }}
               />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white">Assistente</h1>
              <p className="text-xs text-mbm-gold uppercase tracking-wider font-semibold">MBM Growth</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive(item.path)
                  ? 'bg-slate-800 text-mbm-gold font-medium shadow-md'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <span className={isActive(item.path) ? 'text-mbm-gold' : 'text-slate-500 group-hover:text-white'}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-lg p-4 text-xs text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Status do Sistema</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Online: Gemini 2.5</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-mbm-dark border-b border-slate-800 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-mbm-gold">
             <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                alt="Perfil Assistente MBM"
                className="w-full h-full object-cover" 
             />
          </div>
          <span className="font-bold text-white">MBM AI</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-mbm-black z-30 pt-20 px-6 space-y-4">
           {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-4 px-4 py-4 rounded-lg text-lg ${
                isActive(item.path) ? 'bg-slate-800 text-mbm-gold' : 'text-slate-300'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
