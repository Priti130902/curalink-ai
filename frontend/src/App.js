import React, { useState } from 'react';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import ResearchStudio from './components/ResearchStudio';

function App() {
  const [view, setView] = useState(localStorage.getItem('view') || 'landing');
  const [form, setForm] = useState({ query: '', disease: '', patientName: '', location: '' });
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSetView = (v) => {
    setView(v);
    localStorage.setItem('view', v);
  };

  const handleSearch = async (e, customQuery) => {
    if (e) e.preventDefault();
    const activeQuery = customQuery || form.query;
    if (!activeQuery.trim() || !form.disease.trim()) return;

    handleSetView('studio');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/chat`, { 
        ...form, 
        query: activeQuery 
      });
      
      setResults(prev => [{
        query: activeQuery,
        answer: res.data.answer,
        sources: res.data.sources
      }, ...prev]);

      setForm(f => ({ ...f, query: '' }));

    } catch (err) {
      console.error(err);
      setResults(prev => [{ 
        query: activeQuery, 
        answer: '⚠️ Server Error / Timeout.', 
        sources: [] 
      }, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App overflow-x-hidden">
      {view === 'landing' ? (
        <LandingPage form={form} setForm={setForm} onSearch={handleSearch} />
      ) : (
        <ResearchStudio 
          form={form} setForm={setForm} results={results} 
          loading={loading} handleSearch={handleSearch} 
          setView={handleSetView} setResults={setResults} 
        />
      )}
    </div>
  );
}

export default App;