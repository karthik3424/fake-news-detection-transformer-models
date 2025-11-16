
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 border-4 border-t-cyan-500 border-r-cyan-500 border-b-cyan-500 border-l-slate-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-300">
        AI is analyzing the text... Please wait.
      </p>
    </div>
  );
};

export default Loader;
