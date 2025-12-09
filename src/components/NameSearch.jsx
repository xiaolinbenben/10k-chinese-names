
import React, { useState } from 'react';

const NameSearch = ({ names }) => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const exists = names.includes(query.trim());
        setResult(exists ? 'found' : 'not-found');
    };

    return (
        <div className="glass-panel p-6 rounded-2xl w-full max-w-md mx-auto mb-8 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-white text-center">姓名查询</h2>
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setResult(null);
                        }}
                        placeholder="输入姓名..."
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all box-border"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                    查询
                </button>
            </form>

            {result && (
                <div className={`mt-4 p-4 rounded-xl text-center animate-fade-in ${result === 'found' ? 'bg-green-500/20 text-green-200 border border-green-500/30' : 'bg-red-500/20 text-red-200 border border-red-500/30'}`}>
                    {result === 'found' ? (
                        <p className="flex items-center justify-center gap-2">
                            <span className="text-xl">✓</span> 找到名字 "{query}"
                        </p>
                    ) : (
                        <p className="flex items-center justify-center gap-2">
                            <span className="text-xl">✗</span> 未找到名字 "{query}"
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default NameSearch;
