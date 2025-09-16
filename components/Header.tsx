import React from 'react';
import { LogOut, Crown, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentScreen: string;
  onLogout: () => void;
  studentData: {
    name: string;
    level: number;
    xp: number;
    xpToNext: number;
  };
}

export function Header({ currentScreen, onLogout, studentData }: HeaderProps) {
  const getScreenTitle = (screen: string) => {
    switch (screen) {
      case 'main': return 'Pesquisa Etimológica';
      case 'morphology': return 'Análise Morfológica';
      case 'challenges': return 'Desafios';
      case 'profile': return 'Perfil';
      case 'tree': return 'Árvore Etimológica';
      default: return 'Veritas Radix';
    }
  };

  return (
    <div className="parchment-card p-2 mb-3 mx-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-deep-red" />
          <div>
            <h1 className="text-deep-red font-display text-lg">Veritas Radix</h1>
            <p className="text-sepia text-xs">{getScreenTitle(currentScreen)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Crown className="w-3 h-3 text-sepia-light" />
                <span className="font-medium text-deep-red">Nível {studentData.level}</span>
              </div>
              <div className="text-sepia text-xs">
                {studentData.xp} / {studentData.xp + studentData.xpToNext} XP
              </div>
            </div>
            <div className="w-16 h-1.5 bg-parchment-aged rounded-full">
              <div 
                className="h-full bg-deep-red rounded-full transition-all duration-300"
                style={{ 
                  width: `${(studentData.xp / (studentData.xp + studentData.xpToNext)) * 100}%` 
                }}
              />
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-1 px-2 py-1.5 text-deep-red hover:bg-parchment-aged rounded-lg transition-colors text-xs"
            title="Sair"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
}