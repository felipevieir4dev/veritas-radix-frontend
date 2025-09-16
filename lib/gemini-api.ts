// Configuração da API do Gemini
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'sua-chave-aqui';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

interface MorphologyData {
  palavra: string;
  origin: string;
  prefix: { text: string; meaning: string };
  root: { text: string; meaning: string };
  suffix: { text: string; meaning: string };
  completeMeaning: string;
  etymology: string;
  processo_formacao: string;
  confianca_analise: string;
}

interface EtymologyTreeData {
  palavra_central: string;
  center: { word: string; meaning: string };
  connections: Array<{
    word: string;
    meaning: string;
    relation: string;
  }>;
  confianca_analise: string;
}

// Gerar análise morfológica
export async function generateMorphology(word: string): Promise<MorphologyData> {
  const prompt = `
Você é um especialista em linguística e filologia da Língua Portuguesa. Sua especialidade é a análise morfológica e a decomposição precisa de palavras.

Para a palavra "${word}", siga estritamente os seguintes passos:
1. Identifique o radical (elemento central) da palavra
2. Identifique todos os prefixos, na ordem em que aparecem
3. Identifique todos os sufixos, na ordem em que aparecem
4. Determine a origem etimológica precisa
5. Classifique o processo de formação da palavra

Exemplos de análises corretas:
- "infelizmente": prefixo "in-" + radical "feliz" + sufixo "-mente"
- "democracia": radical "demo" + radical "crac" + sufixo "-ia"

Sua resposta DEVE SER um objeto JSON válido, sem texto adicional:

{
  "palavra": "${word}",
  "origin": "Do [idioma] [palavra original] ([transliteração])",
  "prefix": {
    "text": "[prefixo ou '-' se não houver]",
    "meaning": "[significado do prefixo ou 'sem prefixo']"
  },
  "root": {
    "text": "[radical da palavra]",
    "meaning": "[significado do radical]"
  },
  "suffix": {
    "text": "[sufixo ou '-' se não houver]",
    "meaning": "[significado do sufixo ou 'sem sufixo']"
  },
  "completeMeaning": "[significado completo detalhado]",
  "etymology": "[contexto histórico e evolução]",
  "processo_formacao": "[tipo de formação: derivação, composição, etc.]",
  "confianca_analise": "alta"
}

Seja preciso e acadêmico. Use terminologia linguística correta.
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    console.log('Resposta da API:', data);
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Resposta inválida da API');
    }
    
    const text = data.candidates[0].content.parts[0].text;
    
    // Extrair JSON da resposta
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Formato de resposta inválido');
  } catch (error) {
    console.error('Erro ao gerar morfologia:', error);
    throw error;
  }
}

// Gerar árvore etimológica
export async function generateEtymologyTree(word: string): Promise<EtymologyTreeData> {
  const prompt = `
Você é um especialista em etimologia e linguística histórica. Sua tarefa é criar uma árvore etimológica precisa.

Para "${word}", siga estes passos:
1. Identifique os morfemas (prefixos, radicais, sufixos) da palavra
2. Encontre 6 palavras que compartilhem esses morfemas
3. Explique a relação morfológica específica
4. Garanta que as relações sejam linguisticamente corretas

Exemplos de relações válidas:
- "democracia" e "demografia": compartilham o radical "demo-" (povo)
- "filosofia" e "filologia": compartilham o prefixo "filo-" (amor)

Sua resposta DEVE SER um objeto JSON válido:

{
  "palavra_central": "${word}",
  "center": {
    "word": "${word}",
    "meaning": "[significado preciso]"
  },
  "connections": [
    {
      "word": "[palavra relacionada 1]",
      "meaning": "[significado]",
      "relation": "Compartilha o [prefixo/radical/sufixo] '[elemento]' que significa [significado]"
    },
    {
      "word": "[palavra relacionada 2]",
      "meaning": "[significado]",
      "relation": "Compartilha o [prefixo/radical/sufixo] '[elemento]' que significa [significado]"
    },
    {
      "word": "[palavra relacionada 3]",
      "meaning": "[significado]",
      "relation": "Compartilha o [prefixo/radical/sufixo] '[elemento]' que significa [significado]"
    },
    {
      "word": "[palavra relacionada 4]",
      "meaning": "[significado]",
      "relation": "Compartilha o [prefixo/radical/sufixo] '[elemento]' que significa [significado]"
    },
    {
      "word": "[palavra relacionada 5]",
      "meaning": "[significado]",
      "relation": "Compartilha o [prefixo/radical/sufixo] '[elemento]' que significa [significado]"
    },
    {
      "word": "[palavra relacionada 6]",
      "meaning": "[significado]",
      "relation": "Compartilha o [prefixo/radical/sufixo] '[elemento]' que significa [significado]"
    }
  ],
  "confianca_analise": "alta"
}

Seja preciso e use apenas relações etimológicas reais.
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    console.log('Resposta da API (árvore):', data);
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Resposta inválida da API');
    }
    
    const text = data.candidates[0].content.parts[0].text;
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Formato de resposta inválido');
  } catch (error) {
    console.error('Erro ao gerar árvore:', error);
    throw error;
  }
}

// Verificar se a API está configurada
export function isGeminiConfigured(): boolean {
  const configured = GEMINI_API_KEY !== 'sua-chave-aqui' && GEMINI_API_KEY && GEMINI_API_KEY.length > 0;
  console.log('Gemini configurado:', configured, 'Chave:', GEMINI_API_KEY?.substring(0, 10) + '...');
  return configured;
}