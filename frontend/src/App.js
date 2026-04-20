import React, { useState } from 'react';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import ResearchStudio from './components/ResearchStudio';

function App() {
 const [view, setView] = useState('landing');
  const [form, setForm] = useState({ query: '', disease: '', patientName: '', location: '' });
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
 
  const handleSetView = (v) => {
    setView(v);
    localStorage.setItem('view', v);
  };
  const handleSearch = async (e, customQuery) => {
    if (e) e.preventDefault();
    
    const activeQuery = customQuery || form.query;
  
    if (!activeQuery.trim() || !form.disease.trim()) {
      alert("Please enter both query and disease.");
      return;
    }

    handleSetView('studio');
    setLoading(true);

    try {
      const backendBaseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      const res = await axios.post(`${backendBaseURL}/api/chat`, { 
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
      console.error("Connection Error:", err);
      setResults(prev => [{ 
        query: activeQuery, 
        answer: ' Connection Error: Please check if backend is running or API limit is reached.', 
        sources: [] 
      }, ...prev]);
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="App overflow-x-hidden">
    {view === 'landing' ? (
      <LandingPage
        form={form}
        setForm={setForm}
        onSearch={handleSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    ) : (
      <ResearchStudio
        form={form}
        setForm={setForm}
        results={results}
        loading={loading}
        handleSearch={handleSearch}
        setView={handleSetView}
        setResults={setResults}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    )}

  </div>

);
}

export default App;