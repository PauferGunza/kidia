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
2. Valores Nutricionais: Estima calorias, carboidratos e sódio. Classifica o "Impacto Glicémico" como "Baixo", "Médio", "Alto" (ou "N/A" para plantas não consumíveis).
3. Visão Dr. Viva: Explica os benefícios curativos segundo a medicina integrativa do Dr. Viva de forma acolhedora.

ALERTAS DE SEGURANÇA (OBRIGATÓRIO):
- Baseado no Perfil do Utilizador abaixo, alerta em DESTAQUE se houver interações perigosas (ex: açúcar para diabéticos, sódio alto para hipertensos).
- Se for seguro, retorne string vazia "".

PERFIL DO USUÁRIO ATUAL:
- Diabético: ${profile.diabetes ? 'SIM' : 'NÃO'}
- Hipertenso: ${profile.hypertension ? 'SIM' : 'NÃO'}
- Busca Perda de Peso: ${profile.weightLoss ? 'SIM' : 'NÃO'}

Retorne APENAS um objeto JSON válido.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      itemName: { type: Type.STRING, description: "Nome do item identificado" },
      isFood: { type: Type.BOOLEAN, description: "Verdadeiro se for comida/prato, falso se for planta medicinal ou outro" },
      calories: { type: Type.STRING, description: "Ex: '350 kcal' ou 'N/A'" },
      glycemicImpact: { type: Type.STRING, description: "DEVE SER EXATAMENTE UM DESTES: 'Baixo', 'Médio', 'Alto', ou 'N/A'" },
      carbs: { type: Type.STRING, description: "Ex: '45g' ou 'N/A'" },
      sodium: { type: Type.STRING, description: "Ex: '150mg' ou 'N/A'" },
      vitamins: { type: Type.STRING, description: "Principais vitaminas/minerais presentes" },
      drVivaAdvice: { type: Type.STRING, description: "Conselho integrativo e cultural do Dr. Viva" },
      safetyAlert: { type: Type.STRING, description: "Aviso de segurança personalizado. Vazio se não houver perigo." }
    },
    required: ["itemName", "isFood", "calories", "glycemicImpact", "carbs", "sodium", "vitamins", "drVivaAdvice", "safetyAlert"]
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
          text: "Análise nutricional e botânica Dr. Viva. Retorne em JSON.",
        },
      ],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.2,
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
    throw new Error("Não foi possível analisar a imagem. Tente novamente.");
  }
};