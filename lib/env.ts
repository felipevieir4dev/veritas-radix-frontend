// Configuração de variáveis de ambiente para Vite
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
export const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';
export const NODE_ENV = import.meta.env.MODE || 'development';

// Função para verificar se as APIs estão configuradas
export function isGeminiConfigured(): boolean {
  return !!GEMINI_API_KEY;
}

export function isUnsplashConfigured(): boolean {
  return !!UNSPLASH_ACCESS_KEY;
}

export function isDevelopment(): boolean {
  return NODE_ENV === 'development';
}