// mobile/App.tsx
import React, { useState, useRef } from 'react';
import { 
  View,
  KeyboardAvoidingView, 
  Platform, 
  StatusBar, 
  useColorScheme, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { styles, lightPalette, darkPalette } from './styles';
import Login from './Login';
import AppDashboard from './Dashboard'; 
import AppCalendar from './Calendar';   
import AppSettings from './Settings'; // IMPORTED: Our new settings module

// UPDATED: Added 'settings' type variant
type ScreenState = 'login' | 'dashboard' | 'calendar' | 'settings';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');
  const colors = isDarkMode ? darkPalette : lightPalette;
  
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('login');
  
  const scrollViewRef = useRef<ScrollView>(null);

  // UPDATED: Extended to accept 'settings' type signature
  const handleNavigation = (screen: 'dashboard' | 'calendar' | 'settings') => {
    setCurrentScreen(screen);
    
    // Map destinations cleanly to their specific horizontal page array offset indices
    let pageIndex = 0;
    if (screen === 'calendar') pageIndex = 1;
    if (screen === 'settings') pageIndex = 2;

    scrollViewRef.current?.scrollTo({
      x: pageIndex * SCREEN_WIDTH,
      animated: true,
    });
  };

  // Detects horizontal swipe movements and syncs screen tracking highlights
  const handleScrollMomentumEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / SCREEN_WIDTH);
    
    if (pageIndex === 0) setCurrentScreen('dashboard');
    else if (pageIndex === 1) setCurrentScreen('calendar');
    else if (pageIndex === 2) setCurrentScreen('settings');
  };

  const handleToggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Helper calculation to set initial offset position if states change elsewhere
  const getHorizontalOffset = () => {
    if (currentScreen === 'calendar') return SCREEN_WIDTH;
    if (currentScreen === 'settings') return SCREEN_WIDTH * 2;
    return 0;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.outerCanvas, { backgroundColor: colors.background }]}>
        <StatusBar 
          barStyle={systemTheme === 'dark' ? 'light-content' : 'dark-content'} 
          backgroundColor={colors.background} 
        />
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.outerCanvas}
        >
          
          {currentScreen === 'login' ? (
            <Login colors={colors} onLoginSuccess={() => setCurrentScreen('dashboard')} />
          ) : (
            
            /* Three-panel Horizontal Swipe Canvas container */
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              bounces={false}
              onMomentumScrollEnd={handleScrollMomentumEnd}
              onLayout={() => {
                let pageIndex = 0;
                if (currentScreen === 'calendar') pageIndex = 1;
                if (currentScreen === 'settings') pageIndex = 2;
                
                if (pageIndex > 0) {
                  scrollViewRef.current?.scrollTo({
                    x: pageIndex * SCREEN_WIDTH,
                    animated: false, // Keep false so the user doesn't see a weird slide jump on mount
                  });
                }
              }}
              style={styles.outerCanvas}
            >
              {/* PAGE 1: Tasks Dashboard */}
              <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
                <AppDashboard 
                  colors={colors} 
                  onSignOut={() => setCurrentScreen('login')}
                  onNavigate={handleNavigation} 
                />
              </View>

              {/* PAGE 2: Calendar View */}
              <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
                <AppCalendar 
                  colors={colors} 
                  onSignOut={() => setCurrentScreen('login')}
                  onNavigate={handleNavigation} 
                />
              </View>

              {/* PAGE 3: Settings View (ADDED) */}
              <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
                <AppSettings 
                  colors={colors} 
                  isDarkMode={isDarkMode}
                  onToggleDarkMode={handleToggleDarkMode}
                  onSignOut={() => setCurrentScreen('login')}
                  onNavigate={handleNavigation} 
                />
              </View>
            </ScrollView>

          )}

        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}