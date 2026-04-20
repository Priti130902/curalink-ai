import React from 'react';
import { User, Activity, MapPin, Send, Sun, Moon} from 'lucide-react';

const LandingPage = ({ form, setForm, onSearch, darkMode, setDarkMode }) => {
  const theme = {
    bg: darkMode ? 'bg-[#0A0B0D]' : 'bg-[#FDFDFC]',
    text: darkMode ? 'text-white' : 'text-slate-900',
    card: darkMode ? 'bg-[#111214] border-white/5 shadow-2xl' : 'bg-white border-slate-100 shadow-xl shadow-orange-100/50',
    accent: 'text-[#C5A572]',
    input: darkMode ? 'bg-[#0A0B0D] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900',
    button: 'bg-[#C5A572] text-black hover:bg-[#B3945F]'
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col items-center justify-center px-4 md:px-6 py-10 ${theme.bg} ${theme.text}`}>
      
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-8 right-8 p-3 rounded-2xl border transition-all z-50 ${theme.card}`}
      >
        {darkMode ? <Sun size={20} className="text-[#C5A572]" /> : <Moon size={20} className="text-orange-600" />}
      </button>

      <div className="relative z-10 max-w-5xl w-full text-center space-y-12">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter italic leading-[1] md:leading-[0.85]">
          CuraLink <span className={theme.accent}>AI</span>
        </h1>
        
        <div className={`${theme.card} border rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-14 w-full backdrop-blur-md`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-10 text-left">
            {[
              { label: 'Patient Identity', key: 'patientName', icon: User, ph: 'Full Name' },
              { label: 'Condition', key: 'disease', icon: Activity, ph: 'Diagnosis' },
              { label: 'Location', key: 'location', icon: MapPin, ph: 'City, Country' }
            ].map(f => (
              <div key={f.key} className="space-y-3">
                <label className={`text-[9px] font-black uppercase flex items-center gap-2 italic tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  <f.icon size={12} className={theme.accent} /> {f.label}
                </label>
                <input 
                  required
                  className={`w-full border rounded-2xl p-4 md:p-5 text-xs font-bold outline-none transition-all ${theme.input}`}
                  placeholder={f.ph}
                  value={form[f.key]}
                  onChange={e => setForm({...form, [f.key]: e.target.value})}
                />
              </div>
            ))}
          </div>

          <form onSubmit={onSearch} className="group relative">
            <div className={`relative flex flex-col md:flex-row border rounded-2xl md:rounded-[2.5rem] p-2 gap-2 ${theme.input}`}>
              <input 
                required
                className={`flex-1 bg-transparent px-6 py-4 md:py-5 font-bold text-sm md:text-lg outline-none italic ${darkMode ? 'placeholder:text-slate-800' : 'placeholder:text-slate-300'}`} 
                placeholder="What clinical query shall we synthesize today?" 
                value={form.query}
                onChange={e => setForm({...form, query: e.target.value})}
              />
              <button type="submit" className={`py-4 md:py-0 px-10 rounded-2xl md:rounded-[2rem] font-black text-[11px] uppercase transition-all flex items-center justify-center gap-3 shadow-lg ${theme.button}`}>
                Begin Synthesis <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;