import React, { useRef, useEffect } from 'react';
import { 
  Plus, Sparkles, Loader2, Send,  Trash2, BrainCircuit, X, FileText, Sun, Moon
} from 'lucide-react';

const ResearchStudio = ({ form, setForm, results, loading, handleSearch, setView, setResults, darkMode, setDarkMode }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [results, loading]);

  const deleteSingleChat = (i) => setResults(results.filter((_, idx) => idx !== i));

  const theme = {
    bg: darkMode ? 'bg-[#0A0B0D]' : 'bg-[#F9F9F9]',
    side: darkMode ? 'bg-[#0D0E10] border-white/5' : 'bg-white border-slate-200 shadow-2xl',
    text: darkMode ? 'text-white' : 'text-slate-900',
    card: darkMode ? 'bg-[#111214] border-white/5 shadow-2xl' : 'bg-white border-slate-100 shadow-xl shadow-orange-50/50',
    accent: 'text-[#C5A572]',
    input: darkMode ? 'bg-[#111214] border-white/10' : 'bg-white border-slate-200'
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-500 ${theme.bg} ${theme.text}`}>
      
      <aside className={`w-full md:w-[300px] border-r p-6 flex flex-col space-y-10 shrink-0 ${theme.side}`}>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <BrainCircuit size={24} className={theme.accent}/>
            <span className="font-black text-xl tracking-tighter italic">CuraLink</span>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${darkMode ? 'text-yellow-400 bg-white/5' : 'text-orange-600 bg-orange-50'}`}>
            {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
        </div>

        <button onClick={() => setView('landing')} className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${darkMode ? 'bg-white text-black hover:bg-[#C5A572]' : 'bg-slate-900 text-white hover:bg-black'}`}>
          <Plus size={16}/> <span>Back to Profile</span>
        </button>
        
        <div className="flex-1 space-y-6 overflow-y-auto scrollbar-hide pt-4">
          <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] px-2 italic text-left">Neural History</p>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className={`group relative p-4 rounded-xl border transition-all ${darkMode ? 'bg-white/[0.03] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
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
        <header className={`h-20 border-b flex items-center justify-between px-8 backdrop-blur-xl sticky top-0 z-50 ${darkMode ? 'bg-[#111214]/90 border-white/5' : 'bg-white/90 border-slate-100'}`}>
          <div className="flex flex-col text-left">
             <span className={`text-[10px] font-black uppercase tracking-[0.4em] italic ${theme.accent}`}>Neural Stream</span>
             <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">{form.patientName} • {form.disease}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setResults([])} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={18}/></button>
            <button onClick={() => window.print()} className={`p-2.5 rounded-lg border ${darkMode ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}><FileText size={18}/></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 scrollbar-hide">
          {results.map((res, i) => (
            <div key={i} className="max-w-4xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-end">
                <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase italic tracking-widest border shadow-sm ${darkMode ? 'bg-white/5 border-white/5 text-[#C5A572]' : 'bg-white border-slate-200 text-[#C5A572]'}`}>
                  {res.query}
                </div>
              </div>

              <div className={`rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-14 border shadow-2xl space-y-10 text-left ${theme.card}`}>
                <div className={`flex items-center gap-3 font-black italic uppercase text-[10px] tracking-[0.4em] ${theme.accent}`}>
                  <Sparkles size={16}/> Neural Synthesis
                </div>
                <div className={`text-md md:text-2xl leading-relaxed border-l-4 pl-8 italic border-[#C5A572] ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                  {res.answer}
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} className="h-32" />
        </div>

        <div className="p-8 z-50">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className={`flex border rounded-full md:rounded-[2.5rem] p-2 transition-all shadow-2xl ${theme.input}`}>
              <input className={`flex-1 bg-transparent px-8 py-4 font-bold text-lg outline-none italic ${darkMode ? 'text-white placeholder:text-slate-900' : 'text-slate-900 placeholder:text-slate-300'}`} placeholder="Continue research..." value={form.query} onChange={e => setForm({...form, query: e.target.value})} />
              <button type="submit" className="bg-[#C5A572] text-black w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg shadow-orange-200/50">
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20}/>}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearchStudio;