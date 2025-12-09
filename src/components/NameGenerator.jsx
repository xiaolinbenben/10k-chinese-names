
import React, { useState } from 'react';

const NameGenerator = ({ names }) => {
    const [count, setCount] = useState(5);
    const [generatedNames, setGeneratedNames] = useState([]);
    const [copied, setCopied] = useState(false);

    const generateNames = () => {
        const shuffled = [...names].sort(() => 0.5 - Math.random());
        setGeneratedNames(shuffled.slice(0, Math.min(count, 100)));
        setCopied(false);
    };

    const copyToClipboard = () => {
        const text = generatedNames.join('\n');
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="glass-panel p-6 rounded-2xl w-full max-w-md mx-auto transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-white text-center">随机生成</h2>

            <div className="flex items-center justify-between gap-4 mb-6 bg-white/5 p-3 rounded-xl border border-white/10">
                <label className="text-white/90 font-medium whitespace-nowrap">生成数量</label>
                <input
                    type="number"
                    min="1"
                    max="50"
                    value={count}
                    onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (val >= 1 && val <= 50) setCount(val);
                    }}
                    className="w-24 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
            </div>

            <button
                onClick={generateNames}
                className="w-full py-3 mb-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
            >
                生成名字
            </button>

            {generatedNames.length > 0 && (
                <div className="bg-black/20 rounded-xl p-4 relative group">
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto custom-scrollbar">
                        {generatedNames.map((name, index) => (
                            <div key={index} className="text-white/90 p-2 rounded hover:bg-white/5 transition-colors text-center">
                                {name}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-all opacity-0 group-hover:opacity-100"
                        title="复制全部"
                    >
                        {copied ? (
                            <span className="text-green-400">✓</span>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default NameGenerator;
