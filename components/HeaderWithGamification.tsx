import React from 'react';
import { Header } from './Header';
import { useGamification } from './GamificationSystem';

interface HeaderWithGamificationProps {
  currentScreen: string;
  onLogout: () => void;
}

export function HeaderWithGamification({ currentScreen, onLogout }: HeaderWithGamificationProps) {
  const { studentStats } = useGamification();

  return (
    <Header 
      currentScreen={currentScreen}
      onLogout={onLogout}
      studentData={{
        name: studentStats.name,
        level: studentStats.level,
        xp: studentStats.xp,
        xpToNext: studentStats.xpToNext
      }}
    />
  );
}