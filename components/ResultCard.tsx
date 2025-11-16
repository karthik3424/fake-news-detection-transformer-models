
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultCardProps {
  result: AnalysisResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const isFake = result.prediction === 'Fake';
  const borderColor = isFake ? 'border-red-500' : 'border-green-500';
  const textColor = isFake ? 'text-red-400' : 'text-green-400';
  const confidencePercentage = (result.confidence * 100).toFixed(1);

  return (
    <div className={`bg-slate-800 p-6 rounded-lg shadow-lg border-t-4 ${borderColor} animate-fade-in`}>
      <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
      
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 bg-slate-700 p-4 rounded-md">
        <div className="text-center sm:text-left mb-2 sm:mb-0">
          <span className="text-slate-400 text-sm">Prediction</span>
          <p className={`text-3xl font-extrabold ${textColor}`}>{result.prediction}</p>
        </div>
        <div className="w-full sm:w-auto h-1 sm:h-auto sm:border-l border-slate-600 mx-4"></div>
        <div className="text-center sm:text-left">
          <span className="text-slate-400 text-sm">Confidence</span>
          <p className={`text-3xl font-extrabold ${textColor}`}>{confidencePercentage}%</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-cyan-400 mb-2">Explanation</h3>
        <p className="text-slate-300 leading-relaxed">{result.explanation}</p>
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if needed.
// For simplicity in this single-file setup, we can inject a style tag.
// A better approach in a real project is via tailwind.config.js
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
}

export default ResultCard;
