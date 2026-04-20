import React, { useRef, useEffect } from 'react';
import { 
  Plus, Globe, Loader2, Send, Trash2, BrainCircuit, X,Sun, Moon,
  Beaker, BookOpen, Info
} from 'lucide-react';

const ResearchStudio = ({ form, setForm, results, loading, handleSearch, setView, setResults, darkMode, setDarkMode }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [results, loading]);

  const deleteSingleChat = (i) => setResults(results.filter((_, idx) => idx !== i));

  // Theme logic for both modes
  const theme = {
    bg: darkMode ? 'bg-[#050505]' : 'bg-[#F8FAFC]',
    side: darkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-xl',
    text: darkMode ? 'text-white' : 'text-slate-900',
    card: darkMode ? 'bg-[#0F0F0F] border-white/5' : 'bg-white border-slate-200 shadow-md',
    accent: 'text-[#C5A572]',
    borderAccent: 'border-[#C5A572]',
    bgAccent: 'bg-[#C5A572]'
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-all duration-500 font-sans ${theme.bg} ${theme.text}`}>
      
      <aside className={`w-full md:w-[320px] border-r p-6 flex flex-col space-y-8 shrink-0 ${theme.side} z-50`}>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <BrainCircuit size={28} className={theme.accent}/>
            <span className="font-black text-2xl tracking-tighter italic">CuraLink</span>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl ${darkMode ? 'text-[#C5A572] bg-white/5' : 'text-orange-600 bg-orange-50'}`}>
            {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
        </div>

        <button onClick={() => setView('landing')} className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${darkMode ? 'bg-white text-black hover:bg-[#C5A572]' : 'bg-slate-900 text-white hover:bg-black'}`}>
          <Plus size={16}/> <span>New Analysis</span>
        </button>
        
        <div className="flex-1 space-y-6 overflow-y-auto scrollbar-hide">
          <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] px-2 italic text-left">Synthesis Nodes</p>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className={`group relative p-4 rounded-xl border transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                <p className="text-[11px] font-bold truncate pr-6 italic text-left">{r.query}</p>
                <button onClick={() => deleteSingleChat(i)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={14}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-screen relative">
        <header className={`h-20 border-b flex items-center justify-between px-8 backdrop-blur-xl sticky top-0 z-40 ${darkMode ? 'bg-black/80 border-white/5' : 'bg-white/80 border-slate-100'}`}>
          <div className="flex flex-col text-left">
             <span className={`text-[10px] font-black uppercase tracking-[0.4em] italic ${theme.accent}`}>Neural Research Stream</span>
             <span className="text-[8px] font-bold opacity-50 uppercase tracking-widest mt-1">Subject: {form.patientName} • {form.disease}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setResults([])} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={18}/></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-16 scrollbar-hide">
          {results.map((res, i) => (
            <div key={i} className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8">
              
              {/* User Identity Block */}
              <div className="flex justify-end italic">
                <span className={`px-6 py-2 rounded-full text-[10px] font-black border ${darkMode ? 'bg-white/5 border-white/5 text-[#C5A572]' : 'bg-white border-slate-200 text-[#C5A572]'}`}>
                  INQUIRY: {res.query}
                </span>
              </div>
              <div className={`${theme.card} rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 border shadow-2xl space-y-12 text-left relative overflow-hidden`}>
                
                {/* 1. Condition Overview */}
                <section className="space-y-4 relative z-10">
                  <div className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-widest ${theme.accent}`}>
                    <Info size={16}/> Condition Overview
                  </div>
                  <div className={`text-md md:text-xl leading-relaxed italic border-l-4 ${theme.borderAccent} pl-6 md:pl-10 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    
                    Based on current clinical protocols for <b>{form.disease}</b>, the primary focus remains on diagnostic precision and evidence-based interventions as synthesized below.
                  </div>
                </section>

                {/* 2. Research Insights */}
                <section className="space-y-6">
                  <div className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-widest ${theme.accent}`}>
                    <BookOpen size={16}/> Research Insights (PubMed/OpenAlex)
                  </div>
                  <div className={`text-sm md:text-lg leading-[1.8] font-medium italic ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {res.answer}
                  </div>
                </section>

                {/* 3. Clinical Trials & Sources */}
                <section className="space-y-6 pt-10 border-t border-white/5">
                  <div className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-widest ${theme.accent}`}>
                    <Beaker size={16}/> Source Attribution & Trials
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {res.sources?.map((src, idx) => (
                      <a key={idx} href={src.url} target="_blank" rel="noreferrer" className={`p-5 rounded-2xl border transition-all flex items-center justify-between group ${darkMode ? 'bg-black border-white/5 hover:border-[#C5A572]' : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-[#C5A572]'}`}>
                        <div className="flex flex-col overflow-hidden text-left">
                          <span className={`text-[8px] font-black uppercase italic ${theme.accent} bg-[#C5A572]/10 px-2 py-0.5 rounded-full w-fit mb-2`}>
                            {src.type || 'Research Paper'} • {src.year || '2026'}
                          </span>
                          <h5 className="font-bold text-[11px] truncate w-56 italic opacity-80 group-hover:opacity-100 transition-all">{src.title}</h5>
                          <p className="text-[9px] text-slate-500 mt-1 uppercase font-black truncate">{src.authors || 'Medical Board'}</p>
                        </div>
                        <Globe size={16} className="opacity-20 group-hover:opacity-100 group-hover:text-[#C5A572] transition-all shrink-0" />
                      </a>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          ))}

          {loading && (
            <div className="max-w-4xl mx-auto flex flex-col items-center py-20 animate-pulse">
              <Loader2 size={40} className={`animate-spin mb-4 ${theme.accent}`} />
              <p className={`text-[11px] font-black uppercase tracking-[0.8em] ${theme.accent}`}>Consulting Global Repositories</p>
            </div>
          )}
          <div ref={scrollRef} className="h-32" />
        </div>

        {/*  Input Bar: Clinical follow-up */}
        <div className={`p-8 sticky bottom-0 z-50 ${darkMode ? 'bg-gradient-to-t from-black' : 'bg-gradient-to-t from-white'}`}>
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className={`flex border rounded-[2.5rem] p-2.5 transition-all shadow-3xl ${darkMode ? 'bg-[#0F0F0F] border-white/10 focus-within:border-[#C5A572]' : 'bg-white border-slate-200 focus-within:border-[#C5A572]'}`}>
              <input 
                className={`flex-1 bg-transparent px-8 py-4 font-bold text-lg outline-none italic ${darkMode ? 'text-white placeholder:text-slate-900' : 'text-slate-900 placeholder:text-slate-300'}`} 
                placeholder="Deepen research or ask clinical follow-up..." 
                value={form.query} 
                onChange={e => setForm({...form, query: e.target.value})} 
              />
              <button type="submit" disabled={loading} className={`${theme.bgAccent} text-black w-16 h-16 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-xl active:scale-95`}>
                {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24}/>}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearchStudio;