import React from 'react';
import { Home, Book, TreePine, Trophy, User } from 'lucide-react';
import { Screen } from '../App';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'main' as Screen, icon: Home, label: 'Início' },
    { id: 'morphology' as Screen, icon: Book, label: 'Análise' },
    { id: 'tree' as Screen, icon: TreePine, label: 'Árvore' },
    { id: 'challenges' as Screen, icon: Trophy, label: 'Desafios' },
    { id: 'profile' as Screen, icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-aged-paper border-t border-deep-red-light shadow-lg z-50">
      <div className="nav-container px-[1px] py-[6px] px-[2px] py-[6px] px-[3px] py-[6px]">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`nav-item ${
                currentScreen === id 
                  ? 'bg-deep-red text-white' 
                  : 'text-sepia hover:bg-deep-red hover:bg-opacity-10 hover:text-deep-red'
              }`}
            >
              <Icon size={20} strokeWidth={1.5} className="flex-shrink-0" />
              <span className="nav-item-text">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}