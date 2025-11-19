import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION_TEXT } from '../constants';

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API Key is missing. Please ensure process.env.API_KEY is set.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const generateMBMContent = async (
  prompt: string, 
  context?: Record<string, string>
): Promise<string> => {
  try {
    // Build a rich prompt based on context if available
    let finalPrompt = prompt;
    if (context) {
      finalPrompt = `
CONTEXTO DA SOLICITAÇÃO:
${Object.entries(context).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

SOLICITAÇÃO DO USUÁRIO:
${prompt}
      `;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: finalPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_TEXT,
        temperature: 0.7, // Balanced creativity and adherence to brand voice
        topP: 0.8,
        topK: 40,
      }
    });

    return response.text || "Não foi possível gerar uma resposta. Tente novamente.";
  } catch (error) {
    console.error("Error generating content:", error);
    return "Erro ao conectar com o Assistente MBM. Verifique sua chave de API e conexão.";
  }
};