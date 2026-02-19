import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, ScanResult } from "../types";

export const analyzeImage = async (
  base64Data: string,
  mimeType: string,
  profile: UserProfile
): Promise<ScanResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `Tu és a IA oficial da plataforma KIDIA, baseada estritamente nos ensinamentos, livros e base de dados de fitoterapia e nutrição do Dr. Viva.
TUA MISSÃO: Analisar fotos de alimentos angolanos (Funge, Calulu, Muzongué, etc.) e plantas medicinais angolanas (Mwanza, Mutamba, etc.).

REGRAS DE ANÁLISE (MODO SAÚDE):
1. Identificação: Identifica exatamente o que está na foto.
2. Valores Nutricionais: Se for comida, dá a estimativa de calorias, carboidratos (importante para diabéticos) e sódio (para hipertensos). Se for planta, preencha com N/A.
3. Visão Dr. Viva: Explica os benefícios curativos segundo a medicina integrativa do Dr. Viva.

ALERTAS DE SEGURANÇA (OBRIGATÓRIO):
- Se o prato for alto em índice glicémico e o usuário for diabético, avisa o usuário Diabético.
- Se a planta medicinal ou alimento tiver interação negativa com remédios de tensão ou alta em sódio e o usuário for hipertenso, dá o aviso em DESTAQUE.
- Se não houver risco baseado no perfil, retorne uma string vazia ("").

Linguagem: Usa um tom profissional, acolhedor e claro, como o Dr. Viva faz nos seus podcasts. Se o usuário for de uma zona rural, simplifica os termos técnicos.

PERFIL DO USUÁRIO ATUAL:
- Diabético: ${profile.diabetes ? 'SIM' : 'NÃO'}
- Hipertenso: ${profile.hypertension ? 'SIM' : 'NÃO'}
- Busca Perda de Peso: ${profile.weightLoss ? 'SIM' : 'NÃO'}

Retorne APENAS um objeto JSON válido seguindo a estrutura solicitada.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      itemName: { type: Type.STRING, description: "Nome do item identificado" },
      isFood: { type: Type.BOOLEAN, description: "Verdadeiro se for comida/prato, falso se for planta medicinal ou outro" },
      calories: { type: Type.STRING, description: "Ex: '250 kcal' ou 'N/A' para plantas" },
      carbs: { type: Type.STRING, description: "Ex: '45g' ou 'N/A' para plantas" },
      sodium: { type: Type.STRING, description: "Ex: '150mg' ou 'N/A' para plantas" },
      vitamins: { type: Type.STRING, description: "Principais vitaminas/minerais presentes" },
      drVivaAdvice: { type: Type.STRING, description: "O conselho integrativo e cultural do Dr. Viva" },
      safetyAlert: { type: Type.STRING, description: "ALERTA DE SEGURANÇA se aplicável ao perfil do usuário. Se seguro, string vazia." }
    },
    required: ["itemName", "isFood", "calories", "carbs", "sodium", "vitamins", "drVivaAdvice", "safetyAlert"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
        {
          text: "Por favor, analise esta imagem com base nas diretrizes do Dr. Viva e retorne os dados no formato JSON.",
        },
      ],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.3, // Lower temperature for more consistent, factual nutritional extraction
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Received empty response from Dr. Viva AI.");
    }

    const result = JSON.parse(text) as ScanResult;
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Não foi possível analisar a imagem no momento. Tente novamente.");
  }
};