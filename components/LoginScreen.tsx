import React, { useState } from 'react';
import { Mail, Lock, Facebook, Chrome, Users, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';

type UserType = 'student' | 'teacher';

interface LoginScreenProps {
  onLogin: (userType: UserType) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<UserType>('student');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Para demonstração, vamos aceitar qualquer email/senha
      // Em produção, isso faria uma chamada real para a API
      if (email && password) {
        onLogin(userType);
      } else {
        setError('Por favor, preencha todos os campos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl mb-3 sm:mb-4 font-body text-aged" style={{ fontWeight: 700 }}>
            Veritas Radix
          </h1>
          <p className="text-sm sm:text-base text-sepia italic font-body mb-3 sm:mb-4">
            "A Verdade nas Raízes das Palavras"
          </p>
          <div className="w-24 sm:w-32 h-px bg-[var(--color-deep-red)] mx-auto"></div>
        </div>

        {/* Cartão de Login */}
        <Card className="parchment-card shadow-lg">
          <CardHeader className="text-center pb-3 sm:pb-4">
            <h2 className="text-lg sm:text-xl text-aged font-body" style={{ fontWeight: 600 }}>
              Entrar na Academia
            </h2>
          </CardHeader>
          
          <CardContent className="space-y-4 sm:space-y-5 p-4 sm:p-6">
            {/* Seleção de Tipo de Usuário */}
            <div className="space-y-3">
              <p className="text-center text-[var(--color-sepia)] font-body text-sm">Selecione o tipo de acesso:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('student')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    userType === 'student'
                      ? 'border-[var(--color-deep-red)] bg-[var(--color-deep-red)]/10 text-[var(--color-deep-red)]'
                      : 'border-[var(--color-sepia-light)] text-[var(--color-sepia)] hover:border-[var(--color-sepia)]'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <GraduationCap size={20} />
                    <span className="text-sm font-body">Aluno</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('teacher')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    userType === 'teacher'
                      ? 'border-[var(--color-deep-red)] bg-[var(--color-deep-red)]/10 text-[var(--color-deep-red)]'
                      : 'border-[var(--color-sepia-light)] text-[var(--color-sepia)] hover:border-[var(--color-sepia)]'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Users size={20} />
                    <span className="text-sm font-body">Professor</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-deep-red-light)]"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[var(--color-aged-paper)] px-3 text-sm text-[var(--color-sepia)] font-body">dados de acesso</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg font-body text-sm">
                  {error}
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sepia" size={16} />
                <Input
                  type="email"
                  placeholder="Vosso endereço de correio"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="responsive-input pl-10 bg-[var(--color-aged-paper)] border-[var(--color-deep-red-light)] focus:border-[var(--color-deep-red)] rounded-lg font-body text-aged"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sepia" size={16} />
                <Input
                  type="password"
                  placeholder="Vossa palavra secreta"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="responsive-input pl-10 bg-[var(--color-aged-paper)] border-[var(--color-deep-red-light)] focus:border-[var(--color-deep-red)] rounded-lg font-body text-aged"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full btn-primary rounded-lg font-body"
                style={{ fontWeight: 600 }}
              >
                <span className="px-2">
                  {isLoading ? 'Adentrando...' : 
                   userType === 'teacher' ? 'Acessar Dashboard do Professor' : 'Adentrar o Santuário do Saber'}
                </span>
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-deep-red-light)]"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[var(--color-aged-paper)] px-3 sm:px-4 text-sm sm:text-base text-sepia font-body">ou</span>
              </div>
            </div>

            {/* Botões Sociais */}
            <div className="space-y-2 sm:space-y-3">
              <Button 
                variant="outline" 
                disabled={isLoading}
                className="w-full border-[var(--color-deep-red)] text-aged hover:bg-[var(--color-deep-red)]/10 font-body min-h-10 sm:min-h-12"
                onClick={() => onLogin(userType)}
              >
                <div className="flex items-center justify-center gap-2 px-2">
                  <Chrome size={16} className="flex-shrink-0" />
                  <span>Entrar com Google</span>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                disabled={isLoading}
                className="w-full border-[var(--color-deep-red)] text-aged hover:bg-[var(--color-deep-red)]/10 font-body min-h-10 sm:min-h-12"
                onClick={() => onLogin(userType)}
              >
                <div className="flex items-center justify-center gap-2 px-2">
                  <Facebook size={16} className="flex-shrink-0" />
                  <span>Entrar com Facebook</span>
                </div>
              </Button>
            </div>

            <div className="text-center pt-2">
              <p className="text-sm sm:text-base text-sepia italic font-body">
                "Per aspera ad astra"
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}