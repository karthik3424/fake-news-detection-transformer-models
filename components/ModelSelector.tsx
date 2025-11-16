
import React from 'react';
import { ModelType } from '../types';

interface ModelSelectorProps {
  selectedModel: ModelType;
  setSelectedModel: (model: ModelType) => void;
  disabled: boolean;
}

const ModelCard: React.FC<{ model: ModelType; isSelected: boolean; onSelect: () => void; disabled: boolean; logo: string; description: string; }> = ({ model, isSelected, onSelect, disabled, logo, description }) => (
  <div
    onClick={!disabled ? onSelect : undefined}
    className={`
      flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
      ${isSelected ? 'bg-cyan-900 border-cyan-500' : 'bg-slate-700 border-slate-600 hover:border-cyan-600'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    <div className="flex items-center">
      <div className="text-3xl mr-4">{logo}</div>
      <div>
        <h3 className="text-lg font-bold">{model}</h3>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
    </div>
  </div>
);

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, setSelectedModel, disabled }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <ModelCard
        model={ModelType.BERT}
        isSelected={selectedModel === ModelType.BERT}
        onSelect={() => setSelectedModel(ModelType.BERT)}
        disabled={disabled}
        logo="🤖"
        description="Bidirectional Encoder Representations from Transformers."
      />
      <ModelCard
        model={ModelType.RoBERTa}
        isSelected={selectedModel === ModelType.RoBERTa}
        onSelect={() => setSelectedModel(ModelType.RoBERTa)}
        disabled={disabled}
        logo="🧠"
        description="A Robustly Optimized BERT Pretraining Approach."
      />
    </div>
  );
};

export default ModelSelector;
