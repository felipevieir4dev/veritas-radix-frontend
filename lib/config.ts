// Frontend-only configuration - no backend URLs needed

export const APP_CONFIG = {
  NAME: 'Veritas Radix',
  VERSION: '2.0.0',
  DESCRIPTION: 'Aplicação de Etimologia - Frontend Only',
  
  // Feature flags
  FEATURES: {
    MOCK_DATA: true,
    LOCAL_STORAGE: true,
    OFFLINE_MODE: true,
  },
  
  // UI Settings
  UI: {
    THEME: 'parchment',
    DEFAULT_LANGUAGE: 'pt-BR',
    ANIMATION_DURATION: 300,
  },
  
  // Gamification settings
  GAMIFICATION: {
    XP_PER_WORD: 25,
    XP_PER_CHALLENGE: 50,
    LEVELS: [
      { level: 1, xp_required: 0, title: 'Iniciante' },
      { level: 2, xp_required: 100, title: 'Explorador' },
      { level: 3, xp_required: 250, title: 'Conhecedor' },
      { level: 4, xp_required: 500, title: 'Especialista' },
      { level: 5, xp_required: 1000, title: 'Mestre' },
    ],
  },
  
  // Default mock data
  MOCK: {
    WORDS: [
      'Filosofia', 'Democracia', 'Biblioteca', 
      'Psicologia', 'Tecnologia', 'Nostalgia'
    ],
    DELAY_MS: 500,
  }
};

export default APP_CONFIG;