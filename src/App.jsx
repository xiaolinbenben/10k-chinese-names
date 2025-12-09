
import React, { useState, useEffect } from 'react';
import NameSearch from './components/NameSearch';
import NameGenerator from './components/NameGenerator';
import './App.css';

function App() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use BASE_URL to ensure correct path in both dev and prod (GitHub Pages)
    const baseUrl = import.meta.env.BASE_URL;
    const dataUrl = `${baseUrl}names.json`.replace('//', '/'); // Avoid double slashes if base ends with /

    fetch(dataUrl)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setNames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load names:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          中国名字大全
        </h1>
        <p className="text-white/60 text-lg">
          快速查询与生成，收录 {names.length > 0 ? names.length.toLocaleString() : '...'} 个常用名字
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in px-4">
          <NameSearch names={names} />
          <NameGenerator names={names} />
        </main>
      )}

      <footer className="text-center mt-16 text-white/30 text-sm">
        <div className="mb-4 p-4 rounded-xl bg-white/5 inline-block backdrop-blur-sm border border-white/10">
          <p className="text-white/60 mb-2 font-medium">全网最忙五人组</p>
          <p className="text-white/80 font-bold">张吉惟、林国瑞、林玟书、林雅南、江奕云</p>
        </div>
        <p>Built with Vite & React • 10k Chinese Names Project</p>
      </footer>
    </div>
  );
}

export default App;
