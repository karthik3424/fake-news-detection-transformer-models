
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ModelType } from '../types';

export async function analyzeNews(text: string, model: ModelType): Promise<AnalysisResult> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Simulate a ${model} fake news detection model.
    Analyze the following news text and determine if it is 'Real' or 'Fake'.
    Provide a confidence score between 0.0 and 1.0, and a brief explanation for your verdict.
    The explanation should be concise and justify the classification.

    News Text: "${text}"
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      prediction: {
        type: Type.STRING,
        description: "The prediction, either 'Real' or 'Fake'.",
      },
      confidence: {
        type: Type.NUMBER,
        description: "A confidence score between 0.0 and 1.0.",
      },
      explanation: {
        type: Type.STRING,
        description: "A brief explanation for the prediction, highlighting key indicators.",
      },
    },
    required: ["prediction", "confidence", "explanation"],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.3,
      },
    });

    const jsonString = response.text.trim();
    const result: AnalysisResult = JSON.parse(jsonString);
    
    // Basic validation
    if ( (result.prediction !== 'Real' && result.prediction !== 'Fake') || typeof result.confidence !== 'number' || typeof result.explanation !== 'string' ) {
        throw new Error("Received malformed JSON from API");
    }

    return result;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from the AI model.");
  }
}
