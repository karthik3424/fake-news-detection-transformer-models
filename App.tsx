
import React, { useState, useCallback } from 'react';
import { ModelType, AnalysisResult } from './types';
import { analyzeNews } from './services/geminiService';
import Header from './components/Header';
import ModelSelector from './components/ModelSelector';
import ResultCard from './components/ResultCard';
import Loader from './components/Loader';
import ErrorAlert from './components/ErrorAlert';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<ModelType>(ModelType.BERT);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const analysisResult = await analyzeNews(inputText, selectedModel);
      setResult(analysisResult);
    } catch (e) {
      console.error(e);
      setError('An error occurred during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, selectedModel]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto">
        <Header />

        <main className="mt-8 space-y-8">
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">1. Enter News Text</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste a news headline or a short article here..."
              className="w-full h-40 p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200 resize-none"
              disabled={isLoading}
            />
          </div>

          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">2. Select Detection Model</h2>
            <ModelSelector
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleAnalysis}
              disabled={isLoading || !inputText.trim()}
              className="w-full sm:w-auto px-12 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              {isLoading ? 'Analyzing...' : 'Analyze News'}
            </button>
          </div>

          <div className="mt-8 min-h-[200px]">
            {isLoading && <Loader />}
            {error && <ErrorAlert message={error} />}
            {result && !isLoading && <ResultCard result={result} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
