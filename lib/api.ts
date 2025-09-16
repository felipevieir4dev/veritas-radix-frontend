// Frontend-only mock API for Veritas Radix
// This replaces all backend API calls with mock data

interface EtymologyData {
  word: string;
  etymology: {
    origin: string;
    originalForm: string;
    meaning: string;
    evolution: string;
  };
  morphology: {
    prefix: string;
    root: string;
    suffix: string;
    explanation: string;
  };
  relatedWords: {
    word: string;
    relationship: string;
    explanation: string;
  }[];
  historicalContext: string;
  curiosities: string[];
}

interface EtymologyResponse {
  success: boolean;
  data: EtymologyData;
  rawResponse: string;
}

interface ImageResponse {
  success: boolean;
  imageUrl: string;
  prompt: string;
}

interface AuthResponse {
  success: boolean;
  access_token?: string;
  user?: {
    id: number;
    username: string;
    email: string;
    user_type: 'student' | 'teacher';
  };
  message?: string;
}

// Mock delay to simulate API calls
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// Mock etymology data
const mockEtymologyData: Record<string, EtymologyData> = {
  'filosofia': {
    word: 'filosofia',
    etymology: {
      origin: 'Do grego φιλοσοφία (philosophía)',
      originalForm: 'φιλοσοφία',
      meaning: 'amor pela sabedoria',
      evolution: 'φιλοσοφία → philosophia (latim) → filosofia (português)'
    },
    morphology: {
      prefix: 'φίλος (philos)',
      root: 'σοφία (sophia)',
      suffix: '',
      explanation: 'Combinação de "amor" (philos) + "sabedoria" (sophia)'
    },
    relatedWords: [
      { word: 'filósofo', relationship: 'derivação', explanation: 'pessoa que pratica filosofia' },
      { word: 'filosófico', relationship: 'adjetivo', explanation: 'relativo à filosofia' }
    ],
    historicalContext: 'Termo cunhado na Grécia Antiga por Pitágoras',
    curiosities: [
      'Pitágoras foi o primeiro a usar o termo "filósofo"',
      'Antes era comum usar "sophos" (sábio) diretamente'
    ]
  }
};

// Mock authentication functions
export const login = async (username: string, password: string): Promise<AuthResponse> => {
  await mockDelay();
  
  // Simple mock authentication
  if (username && password) {
    const mockUser = {
      id: 1,
      username,
      email: `${username}@example.com`,
      user_type: username.includes('teacher') ? 'teacher' as const : 'student' as const
    };
    
    return {
      success: true,
      access_token: 'mock_token_123',
      user: mockUser,
      message: 'Login realizado com sucesso'
    };
  }
  
  return {
    success: false,
    message: 'Credenciais inválidas'
  };
};

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
  user_type: 'student' | 'teacher';
}): Promise<AuthResponse> => {
  await mockDelay();
  
  return {
    success: true,
    message: 'Conta criada com sucesso'
  };
};

export const logout = async (): Promise<void> => {
  await mockDelay();
  // No actual logout needed for frontend-only
};

// Mock etymology analysis
export const analyzeEtymology = async (word: string): Promise<EtymologyResponse> => {
  await mockDelay();
  
  const data = mockEtymologyData[word.toLowerCase()] || {
    word,
    etymology: {
      origin: `Origem de "${word}" não disponível nos dados mock`,
      originalForm: word,
      meaning: 'Significado não disponível',
      evolution: 'Evolução não disponível'
    },
    morphology: {
      prefix: '',
      root: word,
      suffix: '',
      explanation: 'Análise morfológica não disponível'
    },
    relatedWords: [],
    historicalContext: 'Contexto histórico não disponível',
    curiosities: []
  };
  
  return {
    success: true,
    data,
    rawResponse: 'Mock response'
  };
};

// Mock image generation
export const generateWordImage = async (word: string, etymology?: string): Promise<ImageResponse> => {
  await mockDelay();
  
  return {
    success: true,
    imageUrl: 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(word),
    prompt: `Mock image for ${word}`
  };
};

// Mock other API functions
export const getChallenges = async (): Promise<any> => {
  await mockDelay();
  return { data: [] };
};

export const getProfile = async (): Promise<any> => {
  await mockDelay();
  return { data: {} };
};

export const getAdminDashboard = async (): Promise<any> => {
  await mockDelay();
  return { data: {} };
};

// Error handling
export const handleApiError = (error: any): string => {
  return error?.message || 'Erro desconhecido. Tente novamente.';
};