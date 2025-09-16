import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MainScreen } from './components/MainScreen';
import { MorphologyScreen } from './components/MorphologyScreen';
import { ChallengesScreen } from './components/ChallengesScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { EtymologyTreeScreen } from './components/EtymologyTreeScreen';
import { TeacherDashboard } from './components/TeacherDashboard';
import { Navigation } from './components/Navigation';
import { HeaderWithGamification } from './components/HeaderWithGamification';
import { GamificationProvider } from './components/GamificationSystem';

export type Screen = 'login' | 'main' | 'morphology' | 'challenges' | 'profile' | 'tree' | 'teacher-dashboard';
export type UserType = 'student' | 'teacher';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType>('student');

  const handleLogin = (type: UserType) => {
    setIsLoggedIn(true);
    setUserType(type);
    setCurrentScreen(type === 'teacher' ? 'teacher-dashboard' : 'main');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
    setSelectedWord('');
    setUserType('student');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'main':
        return <MainScreen onWordSelect={(word) => {
          setSelectedWord(word);
          setCurrentScreen('morphology');
        }} />;
      case 'morphology':
        return <MorphologyScreen 
          word={selectedWord} 
          onChallengeStart={() => setCurrentScreen('challenges')}
          onBackToSearch={() => setCurrentScreen('main')}
          onWordSelect={(word) => {
            setSelectedWord(word);
            // Permanece na mesma tela para mostrar a nova palavra
          }}
        />;
      case 'challenges':
        return <ChallengesScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'tree':
        return <EtymologyTreeScreen selectedWord={selectedWord} />;
      case 'teacher-dashboard':
        return <TeacherDashboard />;
      default:
        if (userType === 'teacher') {
          return <TeacherDashboard />;
        }
        return <MainScreen onWordSelect={(word) => {
          setSelectedWord(word);
          setCurrentScreen('morphology');
        }} />;
    }
  };

  return (
    <GamificationProvider>
      <div className="min-h-screen parchment-bg">
        {isLoggedIn && userType === 'student' && (
          <HeaderWithGamification 
            currentScreen={currentScreen}
            onLogout={handleLogout}
          />
        )}
        {isLoggedIn && userType === 'teacher' && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-aged-paper border-b border-deep-red-light p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-xl font-display text-deep-red">Veritas Radix - Professor</h1>
              <button 
                onClick={handleLogout}
                className="btn-primary text-sm px-4 py-2"
              >
                Sair
              </button>
            </div>
          </div>
        )}
        <div className={`${isLoggedIn && userType === 'teacher' ? 'pt-20' : ''} ${isLoggedIn && userType === 'student' ? 'pb-6' : ''}`}>
          {renderScreen()}
        </div>
        {isLoggedIn && userType === 'student' && (
          <Navigation 
            currentScreen={currentScreen} 
            onNavigate={setCurrentScreen}
          />
        )}
      </div>
    </GamificationProvider>
  );
}