import React from 'react';
import { User, Activity, MapPin, Sparkles, Send,  } from 'lucide-react';

const LandingPage = ({ form, setForm, onSearch }) => {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white font-sans relative overflow-x-hidden flex flex-col items-center justify-center px-4 md:px-6 py-10">
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,_rgba(197,165,114,0.1)_0%,_transparent_50%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full text-center space-y-6 md:space-y-10">
        <div className="inline-flex items-center gap-2 bg-[#C5A572]/10 border border-[#C5A572]/20 px-4 py-2 rounded-full animate-pulse">
          <Sparkles size={14} className="text-[#C5A572]" />
          <span className="text-[8px] md:text-[10px] font-black text-[#C5A572] uppercase tracking-[0.3em]">Neural Reasoning Engine Active</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter italic leading-[1] md:leading-[0.9]">
          CuraLink <span className="text-[#C5A572]">Studio.</span>
        </h1>
        
        <p className="text-slate-500 text-sm md:text-xl font-medium italic max-w-2xl mx-auto px-4">
          Deep-retrieval clinical synthesis powered by local LLMs. 
          Setup profile to begin.
        </p>

        <div className="bg-[#111214] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 text-left">
            {[
              { label: 'Patient Identity', key: 'patientName', icon: User, ph: 'Full Name' },
              { label: 'Clinical Condition', key: 'disease', icon: Activity, ph: 'Diagnosis' },
              { label: 'Region/Location', key: 'location', icon: MapPin, ph: 'City, Country' }
            ].map(f => (
              <div key={f.key} className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-2 italic tracking-widest">
                  <f.icon size={10} className="text-[#C5A572]" /> {f.label}
                </label>
                <input 
                  required
                  className="w-full bg-[#0A0B0D] border border-white/10 rounded-xl p-3 md:p-4 text-xs font-bold outline-none focus:border-[#C5A572]/50 transition-all"
                  placeholder={f.ph}
                  value={form[f.key]}
                  onChange={e => setForm({...form, [f.key]: e.target.value})}
                />
              </div>
            ))}
          </div>

          <form onSubmit={onSearch} className="flex flex-col md:flex-row bg-[#0A0B0D] border border-[#C5A572]/30 rounded-2xl md:rounded-[2rem] p-2 gap-2">
            <input 
              required
              className="flex-1 bg-transparent px-4 md:px-6 py-3 md:py-4 text-white font-bold text-sm md:text-lg outline-none placeholder:text-slate-800 italic" 
              placeholder="Inject clinical query..." 
              value={form.query}
              onChange={e => setForm({...form, query: e.target.value})}
            />
            <button type="submit" className="bg-[#C5A572] text-[#0A0B0D] py-3 md:py-0 px-8 md:px-12 rounded-xl md:rounded-[1.5rem] font-black text-[10px] uppercase hover:scale-105 transition-all flex items-center justify-center gap-2">
              Begin Synthesis <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;