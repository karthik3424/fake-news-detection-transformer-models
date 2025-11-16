
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        AI Fake News Detector
      </h1>
      <p className="mt-3 text-lg text-slate-300 max-w-2xl mx-auto">
        Using transfer learning models (simulated by Gemini) to analyze text and predict the likelihood of it being fake news.
      </p>
    </header>
  );
};

export default Header;
