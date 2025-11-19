import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Users, BarChart3, MessageSquare, ArrowRight, FileText, Target } from 'lucide-react';
import { MBM_IDENTITY } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Bem-vindo, <span className="text-mbm-gold">Especialista MBM</span>
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Seu assistente de inteligência artificial focado em comunicação, growth e funil de vendas.
          Aumente a inclusão produtiva com estratégias baseadas em dados.
        </p>
      </header>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-slate-900 to-mbm-dark border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Rocket size={120} className="text-mbm-purple" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-mbm-purple/20 rounded-lg flex items-center justify-center text-mbm-purple border border-mbm-purple/30">
              <MessageSquare size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Criador de Conteúdo & Copy</h2>
            <p className="text-slate-400 max-w-md">
              Gere posts para LinkedIn, sequências de e-mail, artigos de blog e scripts de vídeo 
              alinhados ao tom de voz afrofuturista do MBM.
            </p>
            <Link 
              to="/generator" 
              className="inline-flex items-center gap-2 text-mbm-gold font-semibold hover:text-white transition-colors"
            >
              Começar Agora <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-mbm-gold/30 transition-colors">
          <div className="absolute -bottom-4 -right-4 p-4 opacity-5 group-hover:opacity-15 transition-opacity">
            <Target size={100} className="text-mbm-gold" />
          </div>
          <div className="relative z-10 space-y-4 h-full flex flex-col">
             <div className="w-12 h-12 bg-mbm-gold/10 rounded-lg flex items-center justify-center text-mbm-gold border border-mbm-gold/20">
              <BarChart3 size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Estratégia de Funil</h2>
            <p className="text-slate-400 text-sm flex-1">
              Desenhe jornadas de conversão, diagnósticos de leads e qualificação MQL para SQL.
            </p>
            <Link 
              to="/strategy" 
              className="mt-auto inline-flex items-center gap-2 text-sm text-white bg-slate-800 hover:bg-slate-700 py-2 px-4 rounded-lg transition-colors w-fit"
            >
              Acessar Ferramenta
            </Link>
          </div>
        </div>
      </div>

      {/* Context Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users size={20} className="text-mbm-accent" />
            Públicos-Alvo Ativos
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase mb-2">B2B (Corporativo)</p>
              <div className="flex flex-wrap gap-2">
                {MBM_IDENTITY.context.audiences.b2b.map((aud) => (
                  <span key={aud} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
                    {aud}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase mb-2">B2C (Comunidade)</p>
              <div className="flex flex-wrap gap-2">
                {MBM_IDENTITY.context.audiences.b2c.map((aud) => (
                  <span key={aud} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
                    {aud}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText size={20} className="text-mbm-accent" />
            Diretrizes Ativas
          </h3>
          <ul className="space-y-3">
            {MBM_IDENTITY.behavior.rules.slice(0, 4).map((rule, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                <span className="mt-1.5 w-1.5 h-1.5 bg-mbm-gold rounded-full flex-shrink-0"></span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;