// Frontend-only environment configuration
// No backend environment variables needed

export const ENV = {
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  PROD: import.meta.env.PROD || false,
  DEV: import.meta.env.DEV || true,
  
  // App information
  APP_TITLE: 'Veritas Radix',
  APP_DESCRIPTION: 'Aplicação de Etimologia - Frontend Only',
  
  // Version from package.json would go here
  VERSION: '2.0.0',
  
  // Development flags
  DEBUG: import.meta.env.NODE_ENV === 'development',
  MOCK_ENABLED: true,
} as const;

export default ENV;