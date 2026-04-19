import React, { useRef, useEffect } from 'react';
import { 
  Brain, User, Activity, MapPin, RotateCcw, FileText, Sparkles, 
  Zap, Loader2, Send, MessageSquare, ChevronLeft, Trash2 
} from 'lucide-react';

const ResearchStudio = ({ form, setForm, results, loading, handleSearch, setView, setResults }) => {
  const scrollRef = useRef(null);
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [loading]);

  const suggestions = [`Side effects?`, `Success rates?`, `Active trials?` ];

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white font-sans selection:bg-[#C5A572]/20 overflow-x-hidden">
      <nav className="fixed top-0 w-full z-50 bg-[#111214]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <button onClick={() => setView('landing')} className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase text-slate-400 hover:text-[#C5A572]">
          <ChevronLeft size={16}/> <span className="hidden md:inline">Edit Profile</span>
        </button>
        <div className="flex gap-2 md:gap-3">
          <button onClick={() => setResults([])} className="p-2 md:p-2.5 bg-red-500/10 text-red-400 rounded-lg border border-red-400/10"><Trash2 size={16}/></button>
          <button onClick={() => window.print()} className="p-2 md:p-2.5 bg-white/5 text-slate-400 rounded-lg border border-white/10"><FileText size={16}/></button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-60 flex flex-col lg:flex-row gap-6 md:gap-10">
        <aside className="w-full lg:w-[320px]">
  <div className="bg-[#111214] border border-white/5 rounded-[2.5rem] p-10 sticky top-32 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-10">
    <h3 className="text-[10px] font-black text-[#C5A572] uppercase tracking-[0.5em] border-b border-white/5 pb-5 italic">Profile Data</h3>
    
    <div className="flex flex-row lg:flex-col gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
      {/* Patient Name */}
      <div className="min-w-[120px] space-y-1 text-left">
        <span className="text-[8px] font-black text-slate-500 uppercase flex items-center gap-2 tracking-[0.2em] italic">
          <User size={10} className="text-[#C5A572]"/> Patient
        </span>
        <span className="text-sm font-bold block truncate text-white">{form.patientName || 'N/A'}</span>
      </div>

      {/* Condition */}
      <div className="min-w-[120px] space-y-1 text-left">
        <span className="text-[8px] font-black text-slate-500 uppercase flex items-center gap-2 tracking-[0.2em] italic">
          <Activity size={10} className="text-[#C5A572]"/> Condition
        </span>
        <span className="text-sm font-bold block truncate text-[#C5A572]">{form.disease || 'N/A'}</span>
      </div>
      <div className="min-w-[120px] space-y-1 text-left">
        <span className="text-[8px] font-black text-slate-500 uppercase flex items-center gap-2 tracking-[0.2em] italic">
          <MapPin size={10} className="text-[#C5A572]"/> Location
        </span>
        <span className="text-sm font-bold block truncate text-white">{form.location || 'Global'}</span>
      </div>
    </div>

    <div className="hidden lg:block pt-6 border-t border-white/5">
      <div className="p-4 bg-[#0A0B0D] rounded-2xl border border-white/5 text-[9px] font-bold text-slate-500 italic leading-relaxed text-left">
        Real-time synthesis active using PubMed & ClinicalTrials.gov streams.
      </div>
    </div>
  </div>
</aside>
        <section className="w-full lg:w-3/4 space-y-8 md:y-12">
          {results.map((res, i) => (
            <div key={i} className="bg-[#111214] rounded-[2rem] md:rounded-[3rem] p-6 md:p-14 border border-white/5 shadow-2xl space-y-6 md:space-y-10 text-left">
              <div className="flex items-center gap-3 text-[#C5A572] font-black italic uppercase text-[10px] md:text-[11px] tracking-[0.4em]"><Sparkles size={16}/> Neural Synthesis</div>
              <div className="text-md md:text-2xl leading-relaxed text-slate-100 border-l-4 border-[#C5A572] pl-4 md:pl-12 whitespace-pre-line font-medium italic">
                {res.answer}
              </div>
              
              <div className="pt-6 border-t border-white/5">
                <p className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-2 mb-4 tracking-widest"><MessageSquare size={10}/> Research Branches</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, idx) => (
                    <button key={idx} onClick={() => handleSearch(null, s)} className="text-[9px] font-bold py-2 px-3 bg-white/5 border border-white/10 rounded-full hover:bg-[#C5A572] hover:text-black transition-all">{s}</button>
                  ))}
                </div>
              </div>

              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {res.sources?.map((src, idx) => (
                  <a key={idx} href={src.url} target="_blank" rel="noreferrer" className="p-4 bg-[#0A0B0D] border border-white/5 rounded-2xl hover:border-[#C5A572]/40 transition-all block">
                    <span className="text-[8px] font-black text-[#C5A572] uppercase bg-[#C5A572]/10 px-2 py-1 rounded">Source • {src.year}</span>
                    <h5 className="font-bold text-[10px] mt-2 text-white line-clamp-1 italic">{src.title}</h5>
                  </a>
                ))}
              </div>
            </div>
          ))}

          {loading && (
            <div className="bg-[#111214] border border-[#C5A572]/20 rounded-[2rem] p-10 md:p-16 flex flex-col items-center animate-pulse">
              <Loader2 size={30} className="text-[#C5A572] animate-spin mb-4" />
              <p className="text-[10px] font-black text-[#C5A572] uppercase tracking-[0.5em]">Assembling Evidence...</p>
            </div>
          )}
          <div ref={scrollRef} className="h-10" />
        </section>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-4 md:p-12 bg-gradient-to-t from-[#0A0B0D] via-[#0A0B0D] to-transparent z-50">
        <div className="max-w-4xl mx-auto lg:pl-[25%]">
          <form onSubmit={handleSearch} className="flex bg-[#111214] border border-white/10 rounded-full md:rounded-[2.5rem] p-2 shadow-2xl focus-within:border-[#C5A572]/50 transition-all">
            <input className="flex-1 bg-transparent px-4 md:px-8 py-3 md:py-4 text-white font-bold text-sm md:text-lg outline-none placeholder:text-slate-800" placeholder="Ask follow-up..." value={form.query} onChange={e => setForm({...form, query: e.target.value})} />
            <button type="submit" className="bg-[#C5A572] text-[#0A0B0D] px-6 md:px-10 rounded-full md:rounded-[1.8rem] font-black text-[10px] uppercase shadow-xl transition-all">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16}/>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResearchStudio;