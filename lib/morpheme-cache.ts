// Cache local para análises morfológicas
const CACHE_KEY = 'veritas_morphology_cache';

interface CachedAnalysis {
  word: string;
  analysis: any;
  timestamp: number;
  validated: boolean;
}

// Salvar análise no cache
export function saveMorphologyToCache(word: string, analysis: any, validated = false) {
  try {
    const cache = getMorphologyCache();
    cache[word.toLowerCase()] = {
      word,
      analysis,
      timestamp: Date.now(),
      validated
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    console.log(`Análise de "${word}" salva no cache`);
  } catch (error) {
    console.error('Erro ao salvar no cache:', error);
  }
}

// Buscar análise no cache
export function getMorphologyFromCache(word: string): any | null {
  try {
    const cache = getMorphologyCache();
    const cached = cache[word.toLowerCase()];
    
    if (cached) {
      // Cache válido por 7 dias
      const isExpired = Date.now() - cached.timestamp > 7 * 24 * 60 * 60 * 1000;
      if (!isExpired) {
        console.log(`Análise de "${word}" encontrada no cache`);
        return cached.analysis;
      } else {
        console.log(`Cache de "${word}" expirado`);
        delete cache[word.toLowerCase()];
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      }
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar no cache:', error);
    return null;
  }
}

// Obter todo o cache
function getMorphologyCache(): Record<string, CachedAnalysis> {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch (error) {
    console.error('Erro ao ler cache:', error);
    return {};
  }
}

// Limpar cache expirado
export function cleanExpiredCache() {
  try {
    const cache = getMorphologyCache();
    const now = Date.now();
    let cleaned = 0;
    
    Object.keys(cache).forEach(key => {
      const isExpired = now - cache[key].timestamp > 7 * 24 * 60 * 60 * 1000;
      if (isExpired) {
        delete cache[key];
        cleaned++;
      }
    });
    
    if (cleaned > 0) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      console.log(`${cleaned} análises expiradas removidas do cache`);
    }
  } catch (error) {
    console.error('Erro ao limpar cache:', error);
  }
}