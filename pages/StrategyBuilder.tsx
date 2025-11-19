
import React, { useState } from 'react';
import { GitMerge, Loader2, Play, CheckCircle2, Target, ShieldAlert, Layers } from 'lucide-react';
import { generateMBMContent } from '../services/geminiService';
import MarkdownRenderer from '../components/MarkdownRenderer';

const StrategyBuilder: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  
  // Strategy State
  const [strategyType, setStrategyType] = useState<'FUNNEL' | 'ABM' | 'INFRA'>('FUNNEL');
  const [funnelStage, setFunnelStage] = useState('MOFU'); // Only for FUNNEL type
  
  const [objective, setObjective] = useState('');
  const [target, setTarget] = useState(''); // Used as "Contas Alvo" for ABM
  const [contextData, setContextData] = useState(''); // Extra context
  
  const handleStrategyGen = async () => {
    if (!objective) return;
    
    setLoading(true);
    setResponse(null);

    let promptContext = "";
    let promptInstruction = "";

    if (strategyType === 'FUNNEL') {
        promptContext = `Tipo: Funil de Conversão (Marketing). Estágio: ${funnelStage}. Público: ${target}.`;
        promptInstruction = `Crie uma estratégia de funil para atingir o objetivo: "${objective}". Defina canais, táticas de conteúdo e KPIs.`;
    } else if (strategyType === 'ABM') {
        promptContext = `Tipo: Prospecção B2B e ABM. Contas Alvo/Perfil: ${target}.`;
        promptInstruction = `Desenvolva uma estratégia de Prospecção/ABM para: "${objective}". Inclua cadência multi-toque (LinkedIn, Email, Call), abordagem para decisores e roteiro de discovery.`;
    } else if (strategyType === 'INFRA') {
        promptContext = `Tipo: Infraestrutura e Entregabilidade de E-mail. Contexto Atual: ${target}.`;
        promptInstruction = `Crie um plano de recuperação de domínio ou melhoria de entregabilidade para: "${objective}". Sugira cronograma de aquecimento, segmentação de listas e boas práticas técnicas.`;
    }
    
    const context = {
      "Ferramenta": "Construtor Estratégico MBM",
      "Modo": strategyType,
      "Contexto Técnico": promptContext
    };
    
    const prompt = `${promptInstruction}\n\nDetalhes Adicionais: ${contextData}`;
    
    const result = await generateMBMContent(prompt, context);
    setResponse(result);
    setLoading(false);
  };

  const stages = [
    { id: 'TOFU', label: 'Topo (Atração)', color: 'border-blue-500/50 bg-blue-500/10' },
    { id: 'MOFU', label: 'Meio (Nutrição)', color: 'border-purple-500/50 bg-purple-500/10' },
    { id: 'BOFU', label: 'Fundo (Conversão)', color: 'border-mbm-gold/50 bg-mbm-gold/10' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
       <header>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <GitMerge className="text-mbm-gold" /> Estratégia & Vendas
        </h1>
        <p className="text-slate-400">
          Desenvolva funis de marketing, estratégias de ABM/Prospecção e planos de infraestrutura.
        </p>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
        
        {/* Strategy Type Selector */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-800 pb-6">
            <button 
                onClick={() => setStrategyType('FUNNEL')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${strategyType === 'FUNNEL' ? 'bg-mbm-purple text-white' : 'bg-slate-950 text-slate-400 hover:bg-slate-800'}`}
            >
                <Layers size={16} /> Funil de Marketing
            </button>
            <button 
                onClick={() => setStrategyType('ABM')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${strategyType === 'ABM' ? 'bg-mbm-purple text-white' : 'bg-slate-950 text-slate-400 hover:bg-slate-800'}`}
            >
                <Target size={16} /> Prospecção & ABM
            </button>
            <button 
                onClick={() => setStrategyType('INFRA')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${strategyType === 'INFRA' ? 'bg-mbm-purple text-white' : 'bg-slate-950 text-slate-400 hover:bg-slate-800'}`}
            >
                <ShieldAlert size={16} /> Infra & Entregabilidade
            </button>
        </div>

        {/* Conditional Visual Funnel Selector (Only for FUNNEL) */}
        {strategyType === 'FUNNEL' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in">
            {stages.map((stage) => (
                <button
                key={stage.id}
                onClick={() => setFunnelStage(stage.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                    funnelStage === stage.id 
                    ? `${stage.color} border-opacity-100 ring-1 ring-white/10` 
                    : 'border-slate-800 bg-slate-950 hover:bg-slate-900'
                }`}
                >
                <div className="flex justify-between items-start mb-2">
                    <span className={`font-bold ${funnelStage === stage.id ? 'text-white' : 'text-slate-400'}`}>
                    {stage.label}
                    </span>
                    {funnelStage === stage.id && <CheckCircle2 size={18} className="text-white" />}
                </div>
                <p className="text-xs text-slate-500">
                    {stage.id === 'TOFU' && 'Atração de tráfego'}
                    {stage.id === 'MOFU' && 'Nutrição de leads'}
                    {stage.id === 'BOFU' && 'Passagem para Vendas'}
                </p>
                </button>
            ))}
            </div>
        )}

        {/* Inputs */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                 {strategyType === 'INFRA' ? 'Problema Identificado / Meta' : 'Objetivo Principal'}
              </label>
              <input 
                type="text"
                placeholder={strategyType === 'ABM' ? "Ex: Agendar 5 reuniões com C-Levels de Fintechs" : "Ex: Aumentar conversão de MQL para SQL"}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-mbm-purple focus:border-mbm-purple outline-none transition-all"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                {strategyType === 'ABM' ? 'Perfil de Conta / Decisor' : strategyType === 'INFRA' ? 'Contexto Atual (Reputação/Lista)' : 'Público Alvo / Persona'}
              </label>
              <input 
                type="text"
                placeholder={strategyType === 'ABM' ? "Ex: Diretores de ESG em empresas > 1000 func" : "Ex: Leads da base antiga"}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-mbm-purple focus:border-mbm-purple outline-none transition-all"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
          </div>

          <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Detalhes Adicionais (Opcional)</label>
              <textarea 
                rows={3}
                placeholder="Cole métricas atuais, desafios específicos ou ferramentas em uso..."
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-mbm-purple focus:border-mbm-purple outline-none transition-all placeholder:text-slate-600 resize-none"
                value={contextData}
                onChange={(e) => setContextData(e.target.value)}
              />
            </div>

          <div className="flex justify-end">
            <button 
              onClick={handleStrategyGen}
              disabled={loading || !objective}
              className="bg-mbm-purple hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Play size={18} fill="currentColor" />}
              Gerar Plano
            </button>
          </div>
        </div>

        {/* Result Container */}
        {response && (
          <div className="mt-8 border-t border-slate-800 pt-8 animate-fade-in">
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 md:p-8">
              <MarkdownRenderer content={response} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategyBuilder;
