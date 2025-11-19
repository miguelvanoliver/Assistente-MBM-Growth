
import React, { useState } from 'react';
import { PenTool, Loader2, Send, RefreshCw } from 'lucide-react';
import { generateMBMContent } from '../services/geminiService';
import MarkdownRenderer from '../components/MarkdownRenderer';

const Generator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    channel: 'LinkedIn',
    audience: 'B2B - RH e Inovação',
    decisionMaker: '', // New field for Sales/ABM
    objective: 'Gerar Autoridade',
    topic: '',
    additionalInfo: ''
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.topic) return;

    setLoading(true);
    setResponse(null);

    const context: Record<string, string> = {
      Canal: form.channel,
      "Público Alvo": form.audience,
      "Cargo do Decisor": form.decisionMaker || "Não especificado",
      Objetivo: form.objective,
      "Instrução Extra": form.additionalInfo
    };

    const prompt = `Crie um conteúdo/mensagem sobre "${form.topic}". Foco em conversão e linguagem adequada ao canal e decisor.`;
    
    const result = await generateMBMContent(prompt, context);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <PenTool className="text-mbm-gold" /> Criador de Conteúdo & Vendas
        </h1>
        <p className="text-slate-400">
          Gere posts, cold mails, scripts de discovery e abordagens comerciais personalizadas.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <form onSubmit={handleGenerate} className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-5 shadow-lg">
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Canal / Formato</label>
              <select 
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-mbm-gold/50 focus:border-mbm-gold outline-none transition-all"
                value={form.channel}
                onChange={(e) => setForm({...form, channel: e.target.value})}
              >
                <optgroup label="Marketing & Brand">
                    <option>LinkedIn (Perfil Pessoal)</option>
                    <option>LinkedIn (Company Page)</option>
                    <option>Instagram (Feed/Carrossel)</option>
                    <option>E-mail Marketing (Newsletter)</option>
                    <option>Blog Post</option>
                </optgroup>
                <optgroup label="Vendas & Prospecção (Closer)">
                    <option>Cold E-mail (Abordagem Fria)</option>
                    <option>Cold E-mail (Follow-up)</option>
                    <option>LinkedIn InMail (ABM)</option>
                    <option>WhatsApp (Mensagem Comercial)</option>
                    <option>Script de Discovery (Reunião)</option>
                    <option>Mensagem de Recuperação (Breakup)</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Público Alvo</label>
              <select 
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-mbm-gold/50 focus:border-mbm-gold outline-none transition-all"
                value={form.audience}
                onChange={(e) => setForm({...form, audience: e.target.value})}
              >
                <option>B2B - RH e Inovação</option>
                <option>B2B - C-Level e ESG</option>
                <option>B2B - TI e Tecnologia</option>
                <option>B2C - Talentos Negros</option>
                <option>B2C - Empreendedores</option>
                <option>Parceiros / Investidores</option>
              </select>
            </div>
            
            {/* Dynamic Field for Sales */}
            {(form.channel.includes('Cold') || form.channel.includes('LinkedIn') || form.channel.includes('Script')) && (
                <div className="animate-fade-in">
                <label className="block text-sm font-medium text-mbm-gold mb-2">Cargo do Decisor (Opcional)</label>
                <input 
                    type="text"
                    placeholder="Ex: CEO, Diretor de Inovação..."
                    className="w-full bg-slate-950 border border-mbm-gold/30 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-mbm-gold/50 focus:border-mbm-gold outline-none transition-all placeholder:text-slate-600"
                    value={form.decisionMaker}
                    onChange={(e) => setForm({...form, decisionMaker: e.target.value})}
                />
                </div>
            )}

             <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Objetivo</label>
              <select 
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-mbm-gold/50 focus:border-mbm-gold outline-none transition-all"
                value={form.objective}
                onChange={(e) => setForm({...form, objective: e.target.value})}
              >
                <option>Gerar Autoridade (Topo)</option>
                <option>Agendar Reunião (Prospecção)</option>
                <option>Educação de Mercado (Nutrição)</option>
                <option>Venda Direta (Fundo)</option>
                <option>Recuperação de Lead</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Tema / Tópico Principal</label>
              <input 
                type="text"
                required
                placeholder="Ex: Inclusão produtiva como inovação"
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-mbm-gold/50 focus:border-mbm-gold outline-none transition-all placeholder:text-slate-600"
                value={form.topic}
                onChange={(e) => setForm({...form, topic: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Info Adicional</label>
              <textarea 
                rows={3}
                placeholder="Contexto extra, dores específicas do cliente, dados..."
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-mbm-gold/50 focus:border-mbm-gold outline-none transition-all placeholder:text-slate-600 resize-none"
                value={form.additionalInfo}
                onChange={(e) => setForm({...form, additionalInfo: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-mbm-gold hover:bg-yellow-500 text-mbm-black font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
              {loading ? 'Gerando...' : 'Gerar Agora'}
            </button>
          </form>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl min-h-[600px] flex flex-col shadow-lg">
             <div className="border-b border-slate-800 p-4 flex justify-between items-center bg-slate-950/50 rounded-t-xl">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  Resultado
                  {response && <span className="text-xs font-normal text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">Concluído</span>}
                </h3>
                {response && (
                  <button 
                    onClick={() => {
                      setResponse(null); 
                    }} 
                    className="text-slate-400 hover:text-white transition-colors"
                    title="Limpar"
                  >
                    <RefreshCw size={16} />
                  </button>
                )}
             </div>
             
             <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[700px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                    <Loader2 className="animate-spin text-mbm-gold" size={48} />
                    <p className="animate-pulse">Acessando base de conhecimento MBM...</p>
                  </div>
                ) : response ? (
                  <MarkdownRenderer content={response} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-600 space-y-4">
                     <PenTool size={48} className="opacity-20" />
                     <p>Preencha o formulário para criar conteúdo ou scripts de vendas.</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
