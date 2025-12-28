import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserAnswers, AnalysisResult } from "../types";

const resultSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    tipo_metabolico: {
      type: Type.STRING,
      enum: ["A", "B", "C"],
      description: "Tipo metabólico classificado (A: Acelerado/Inflamado, B: Bloqueado/Resistente, C: Lento/Hormonal)",
    },
    titulo_perfil: {
      type: Type.STRING,
      description: "Um título curto e impactante para o perfil (ex: Metabolismo Resistente à Insulina)",
    },
    foco_principal: {
      type: Type.STRING,
      description: "O foco principal da estratégia em 1-3 palavras (ex: Reset Metabólico Total)",
    },
    recomendacoes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 recomendações práticas e curtas.",
    },
    expectativa_kg: {
      type: Type.NUMBER,
      description: "Estimativa de perda de peso em kg para 21 dias (entre 4 e 8).",
    },
    descricao_detalhada: {
        type: Type.STRING,
        description: "Um texto LONGO (3 a 4 parágrafos), persuasivo e explicativo. Deve explicar cientificamente por que as dietas falharam (inflamação, insulina, antinutrientes) e por que a carnívora é a solução."
    },
    scores: {
      type: Type.OBJECT,
      properties: {
        energia: { type: Type.NUMBER, description: "Nível estimado de energia atual (0-100)" },
        sono: { type: Type.NUMBER, description: "Qualidade estimada do sono (0-100)" },
        inflamacao: { type: Type.NUMBER, description: "Nível de inflamação corporal (0-100, quanto maior, mais inflamado)" },
        autoestima: { type: Type.NUMBER, description: "Nível estimado de autoestima (0-100)" },
      },
      required: ["energia", "sono", "inflamacao", "autoestima"]
    }
  },
  required: ["tipo_metabolico", "titulo_perfil", "foco_principal", "recomendacoes", "expectativa_kg", "descricao_detalhada", "scores"],
};

export const analyzeProfile = async (answers: UserAnswers): Promise<AnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Calculate BMI if height and weight exist
    let bmiInfo = "";
    if (answers.altura_cm && answers.peso_atual) {
      const h = Number(answers.altura_cm) / 100;
      const w = Number(answers.peso_atual);
      const bmi = (w / (h * h)).toFixed(1);
      bmiInfo = `Dados Corporais: Altura ${answers.altura_cm}cm, Peso ${answers.peso_atual}kg, IMC: ${bmi}`;
    }

    const prompt = `
      Atue como a maior especialista do mundo em Nutrição Ancestral e Dieta Carnívora (Protocolo da Selva).
      Analise o perfil de ${answers.nome}:
      
      RESPOSTAS DO QUIZ:
      ${JSON.stringify(answers, null, 2)}
      
      ${bmiInfo}
      
      Gere um diagnóstico METABÓLICO PROFUNDO e PERSUASIVO.
      
      Diretrizes para a 'descricao_detalhada':
      1. NÃO seja genérico. Fale diretamente com a dor do usuário baseada nas respostas (ex: se marcou cansaço, foque nisso).
      2. A CULPA NÃO É DELA: Explique que a falha em dietas anteriores ocorre devido à toxicidade das plantas (oxalatos, lectinas), óleos vegetais e excesso de carboidratos que mantêm a insulina alta e bloqueiam a queima de gordura.
      3. A CIÊNCIA: Mencione que o corpo humano evoluiu por 2 milhões de anos comendo carne. O Protocolo da Selva elimina a inflamação na raiz, permitindo que o corpo acesse os estoques de gordura naturalmente.
      4. O RESULTADO: Prometa clareza mental, fim do inchaço e energia estável, não apenas perda de peso.
      5. Use tom de autoridade médica e empatia.
      6. O texto deve ser fluído, longo e convincente (aprox. 150-200 palavras).

      Lógica de Perfil:
      - IMC Alto ou "Dificuldade em perder peso" -> Foco em Resistência à Insulina e Inflamação Crônica.
      - Cansaço/Sono ruim -> Foco em Desequilíbrio Cortisol/Melatonina e falta de nutrientes biodisponíveis.
      
      Retorne APENAS o JSON conforme o schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: resultSchema,
        temperature: 0.7,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }
    
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      tipo_metabolico: 'B',
      titulo_perfil: "Bloqueio Metabólico Inflamatório",
      foco_principal: "Desinflamação Sistêmica",
      recomendacoes: [
        "Jejum intermitente fisiológico",
        "Eliminação total de sementes e óleos",
        "Prioridade em proteínas animais"
      ],
      expectativa_kg: 6.5,
      descricao_detalhada: "Sua análise indica um estado de resistência metabólica. Não é falta de força de vontade; é química. Anos de consumo de 'alimentos saudáveis' carregados de antinutrientes vegetais e óleos de sementes criaram uma inflamação crônica silenciosa em seu corpo. Isso mantém sua insulina cronicamente elevada, o que biologicamente impede suas células de liberarem gordura para energia.\n\nO Protocolo da Selva não é uma dieta, é um retorno à biologia humana original. Ao remover os gatilhos inflamatórios e nutrir seu corpo com a gordura e proteína para as quais ele foi projetado evolutivamente, nós 'destravamos' esse mecanismo. Em dias, o inchaço desaparece conforme seu intestino cura, e seu corpo finalmente volta a usar sua própria gordura como combustível primário.",
      scores: {
        energia: 40,
        sono: 50,
        inflamacao: 85,
        autoestima: 40
      }
    };
  }
};