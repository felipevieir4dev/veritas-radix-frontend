import React, { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Loader2, Image as ImageIcon, Sparkles, RefreshCw } from 'lucide-react';
import { searchUnsplashImage, isUnsplashConfigured } from '../lib/unsplash-api';

interface EtymologyImageProps {
  word: string;
  etymology?: string;
  className?: string;
  useDallE?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// Imagens de fallback garantidas (Unsplash com URLs diretos)
const FALLBACK_IMAGES: Record<string, string> = {
  'Filosofia': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format&q=80',
  'Democracia': 'https://images.unsplash.com/photo-1541872703-74c34d2846b5?w=400&h=300&fit=crop&auto=format&q=80',
  'Biblioteca': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format&q=80',
  'Psicologia': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format&q=80',
  'Tecnologia': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format&q=80',
  'Nostalgia': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80',
  'default': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format&q=80'
};

export function EtymologyImage({ 
  word, 
  etymology, 
  className = "", 
  useDallE = false,
  size = 'medium' 
}: EtymologyImageProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [attribution, setAttribution] = useState<any>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-32 h-32', 
    large: 'w-64 h-48'
  };

  // Função para obter imagem de fallback imediatamente
  const getStaticFallback = (searchWord: string): string => {
    return FALLBACK_IMAGES[searchWord] || FALLBACK_IMAGES.default;
  };

  const generateImage = async () => {
    if (!word.trim()) {
      setImageUrl(getStaticFallback('default'));
      return;
    }

    setLoading(true);
    setError('');
    setAttribution(null);

    try {
      let finalImageUrl = '';
      
      // 1. Tentar Unsplash se configurado
      if (isUnsplashConfigured()) {
        console.log('Buscando imagem no Unsplash para:', word);
        const unsplashUrl = await searchUnsplashImage(word, etymology);
        if (unsplashUrl) {
          finalImageUrl = unsplashUrl;
          setUsingFallback(false);
          setAttribution({ photographer: 'Unsplash' });
        }
      }
      
      // 2. Fallback para imagens estáticas
      if (!finalImageUrl) {
        finalImageUrl = getStaticFallback(word);
        setUsingFallback(true);
      }
      
      setImageUrl(finalImageUrl);

    } catch (err) {
      console.error('Erro geral ao gerar imagem:', err);
      
      // Sempre garantir uma imagem, mesmo em caso de erro
      const fallbackUrl = getStaticFallback(word);
      setImageUrl(fallbackUrl);
      setUsingFallback(true);
      setError('Usando imagem padrão');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (word) {
      // Sempre tentar gerar imagem (Unsplash ou fallback)
      generateImage();
    } else {
      setImageUrl(getStaticFallback('default'));
    }
  }, [word, etymology, useDallE]);

  if (loading && !imageUrl) {
    return (
      <div className={`${sizeClasses[size]} ${className} flex items-center justify-center parchment-card`}>
        <div className="text-center">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--color-deep-red)] mx-auto mb-2" />
          <p className="text-xs text-sepia font-body">
            {useDallE ? 'Gerando ilustração IA...' : 'Buscando imagem...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative group`}>
      <div className={`${sizeClasses[size]} overflow-hidden parchment-card hover-lift transition-all duration-300 relative`}>
        <ImageWithFallback
          src={imageUrl}
          alt={`Ilustração etimológica de ${word}`}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay com informações */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-2 left-2 right-2">
            <div className="flex items-center justify-between">
              <p className="text-white text-xs font-body truncate">{word}</p>
              <div className="flex items-center gap-1">
                {useDallE && !usingFallback ? (
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                ) : (
                  <ImageIcon className="w-3 h-3 text-white/70" />
                )}
              </div>
            </div>
            
            {/* Atribuição do Unsplash */}
            {attribution && !usingFallback && (
              <div className="mt-1">
                <p className="text-white/80 text-xs font-body">
                  Por {attribution.photographer}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Indicador de tipo de imagem */}
        <div className="absolute top-2 right-2">
          {useDallE && !usingFallback ? (
            <div className="w-5 h-5 bg-yellow-400 text-black rounded-full flex items-center justify-center opacity-80">
              <Sparkles className="w-3 h-3" />
            </div>
          ) : (
            <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center opacity-80">
              <ImageIcon className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>
      
      {/* Botão de regeneração */}
      {useDallE && (
        <button
          onClick={generateImage}
          disabled={loading}
          className="absolute -top-2 -right-2 w-7 h-7 bg-[var(--color-deep-red)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-deep-red-dark)] transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
          title="Gerar nova imagem"
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <RefreshCw className="w-3 h-3" />
          )}
        </button>
      )}
    </div>
  );
}