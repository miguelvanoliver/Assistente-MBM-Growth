
import React, { useState } from 'react';
import { PieChart, Loader2, Search, FileBarChart, Lightbulb, Presentation } from 'lucide-react';
import { generateMBMContent } from '../services/geminiService';
import MarkdownRenderer from '../components/MarkdownRenderer';

const DataAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    analysisType: 'STORYTELLING',
    dataContext: '',
  });

  const handleAnalysis = async () => {
    if (!form.dataContext) return;

    setLoading(true);
    setResponse(null);

    const analysisTypes = {
      'STORYTELLING': 'Storytelling com Dados (Narrativa de Impacto)',
      'DASHBOARD': 'Especificação de Dashboard e Infográficos',
      'CRITICAL': 'Análise Crítica e Identificação de Gargalos'
    };

    const context: Record<string, string> = {
      "Tipo de Análise": analysisTypes[form.analysisType as keyof typeof analysisTypes],
      "Ferramenta": "MBM Data Intelligence",
      "Perfil": "Especialista de Growth e Comunicação (Analítico e Crítico)"
    };

    const prompt = `
      Atue como o Especialista Sênior do MBM (focado em Growth e Dados).
      Analise o seguinte conjunto de dados ou contexto e forneça o resultado solicitado no tipo de análise: ${form.analysisType}.
      
      Se for DASHBOARD: Descreva detalhadamente quais gráficos (Barras, Linhas, Pizza, etc.) devem ser usados, quais KPIs destacar e como dispor isso visualmente para a diretoria.
      Se for STORYTELLING: Conte a história por trás dos números. O que subiu? O que caiu? Por que isso importa para a inclusão produtiva e o ecossistema MBM?
      Se for CRÍTICO: Encontre o erro, o padrão oculto ou a oportunidade desperdiçada. Seja direto e estratégico.

      DADOS/CONTEXTO:
      ${form.dataContext}
    `;
    
    const result = await generateMBMContent(prompt, context);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <PieChart className="text-mbm-gold" /> Análise de Dados
        </h1>
        <p className="text-slate-400">
          Transforme números frios em insights estratégicos, dashboards visuais e storytelling de impacto.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-5 shadow-lg">
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Tipo de Análise</label>
              <div className="space-y-2">
                <button 
                  onClick={() => setForm({...form, analysisType: 'STORYTELLING'})}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    form.analysisType === 'STORYTELLING' 
                      ? 'bg-slate-800 border-mbm-gold text-white' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <Presentation size={18} className={form.analysisType === 'STORYTELLING' ? 'text-mbm-gold' : ''} />
                  <div className="text-left">
                    <span className="block text-sm font-bold">Storytelling</span>
                    <span className="text-xs opacity-70">Narrativa de dados</span>
                  </div>
                </button>

                <button 
                  onClick={() => setForm({...form, analysisType: 'DASHBOARD'})}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    form.analysisType === 'DASHBOARD' 
                      ? 'bg-slate-800 border-mbm-gold text-white' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <FileBarChart size={18} className={form.analysisType === 'DASHBOARD' ? 'text-mbm-gold' : ''} />
                  <div className="text-left">
                    <span className="block text-sm font-bold">Dashboard Spec</span>
                    <span className="text-xs opacity-70">Infográficos e KPIs</span>
                  </div>
                </button>

                <button 
                  onClick={() => setForm({...form, analysisType: 'CRITICAL'})}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    form.analysisType === 'CRITICAL' 
                      ? 'bg-slate-800 border-mbm-gold text-white' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <Lightbulb size={18} className={form.analysisType === 'CRITICAL' ? 'text-mbm-gold' : ''} />
                  <div className="text-left">
                    <span className="block text-sm font-bold">Análise Crítica</span>
                    <span className="text-xs opacity-70">Insights e Oportunidades</span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Dados ou Contexto</label>
              <textarea 
                rows={10}
                placeholder="Cole aqui seus dados (CSV, texto), descreva o cenário ou cole métricas de campanha..."
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-mbm-gold/50 focus:border-mbm-gold outline-none transition-all placeholder:text-slate-600 resize-none font-mono text-sm"
                value={form.dataContext}
                onChange={(e) => setForm({...form, dataContext: e.target.value})}
              />
            </div>

            <button 
              onClick={handleAnalysis}
              disabled={loading || !form.dataContext}
              className="w-full bg-mbm-gold hover:bg-yellow-500 text-mbm-black font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search size={18} />}
              {loading ? 'Analisando Dados...' : 'Gerar Análise'}
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl min-h-[600px] flex flex-col shadow-lg">
             <div className="border-b border-slate-800 p-4 flex justify-between items-center bg-slate-950/50 rounded-t-xl">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  Relatório de Inteligência
                </h3>
             </div>
             
             <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[700px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-slate-800 border-t-mbm-gold rounded-full animate-spin"></div>
                      <PieChart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-600" size={24} />
                    </div>
                    <p className="animate-pulse">Processando métricas e extraindo insights...</p>
                  </div>
                ) : response ? (
                  <div className="animate-fade-in">
                    <MarkdownRenderer content={response} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-600 space-y-4">
                     <FileBarChart size={48} className="opacity-20" />
                     <p className="text-center max-w-sm">
                       Insira dados de vendas, tráfego ou campanhas para receber uma análise profissional com o padrão MBM.
                     </p>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
