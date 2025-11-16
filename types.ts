
export enum ModelType {
  BERT = 'BERT',
  RoBERTa = 'RoBERTa',
}

export interface AnalysisResult {
  prediction: 'Real' | 'Fake';
  confidence: number;
  explanation: string;
}
