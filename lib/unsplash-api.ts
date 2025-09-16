// API do Unsplash para imagens
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';
const UNSPLASH_API_URL = 'https://api.unsplash.com';

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
    username: string;
  };
}

// Buscar imagem relacionada à palavra
export async function searchUnsplashImage(word: string, etymology?: string): Promise<string | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.log('Unsplash não configurado');
    return null;
  }

  try {
    // Mapear palavras para termos em inglês para melhor busca
    const wordTranslations: Record<string, string> = {
      'Filosofia': 'philosophy ancient greek wisdom',
      'Democracia': 'democracy ancient greece politics',
      'Biblioteca': 'library ancient books scrolls',
      'Psicologia': 'psychology mind brain ancient',
      'Tecnologia': 'technology ancient tools innovation',
      'Nostalgia': 'nostalgia memory vintage old'
    };
    
    // Usar tradução se disponível, senão usar palavra + contexto
    const searchTerms = wordTranslations[word] || `${word} ancient classical historical manuscript`;
    
    console.log(`Buscando no Unsplash: "${searchTerms}"`);

    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(searchTerms)}&per_page=10&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Pegar uma imagem aleatória dos primeiros resultados
      const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length));
      const image: UnsplashImage = data.results[randomIndex];
      console.log(`Imagem encontrada para "${word}":`, image.urls.regular);
      return image.urls.regular;
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar imagem no Unsplash:', error);
    return null;
  }
}

// Mapear termos para busca em inglês
function translateToEnglish(term: string): string {
  const translations: Record<string, string> = {
    'grego': 'greek ancient',
    'latim': 'latin roman',
    'romano': 'roman classical',
    'antigo': 'ancient historical',
    'clássico': 'classical',
    'medieval': 'medieval manuscript',
    'manuscrito': 'manuscript scroll',
    'pergaminho': 'parchment scroll'
  };
  
  return translations[term.toLowerCase()] || term;
}

// Verificar se está configurado
export function isUnsplashConfigured(): boolean {
  return UNSPLASH_ACCESS_KEY.length > 0;
}