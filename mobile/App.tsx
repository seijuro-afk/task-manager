// mobile/App.tsx
import React, { useState, useRef, useEffect } from 'react';
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
import AppSettings from './Settings'; 
import SignUp from './SignUp'; 
import ForgetPassword from './ForgetPassword';
import NotificationSettings from './NotificationSettings';

type ScreenState = 'login' | 'dashboard' | 'calendar' | 'settings' | 'signup' | 'forget-password' | 'notifications';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');
  const colors = isDarkMode ? darkPalette : lightPalette;
  const [calendarAnchorDate, setCalendarAnchorDate] = useState(new Date());
  
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('login');
  
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNavigation = (screen: 'dashboard' | 'calendar' | 'settings' | 'notifications') => {
    setCurrentScreen(screen);
    
    let pageIndex = 0;
    if (screen === 'calendar') pageIndex = 1;
    // Both settings and notifications sit on page index 2 track
    if (screen === 'settings' || screen === 'notifications') pageIndex = 2; 

    scrollViewRef.current?.scrollTo({
      x: pageIndex * SCREEN_WIDTH,
      animated: screen !== 'notifications',
    });
  };

  const handleScrollMomentumEnd = (event: any) => {
    // 🛑 GUARD LAYER: Ignore scroll triggers if user is inside the nested subview overlay
    if (currentScreen === 'notifications') return;

    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / SCREEN_WIDTH);
    
    if (pageIndex === 0) setCurrentScreen('dashboard');
    else if (pageIndex === 1) setCurrentScreen('calendar');
    else if (pageIndex === 2) setCurrentScreen('settings');
  };

  const handleToggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Determine if we should show authentication/onboarding portals
  const isAuthScreen = ['login', 'signup', 'forget-password'].includes(currentScreen);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.outerCanvas, { backgroundColor: colors.background }]}>
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
          backgroundColor={colors.background} 
        />
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.outerCanvas}
        >
          
          {currentScreen === 'login' ? (
            <Login 
              colors={colors} 
              onLoginSuccess={() => {
                setCalendarAnchorDate(new Date()); // 👈 Checks system date on click
                setCurrentScreen('dashboard');
              }}
              onSignUp={() => setCurrentScreen('signup')} 
              onForgotPassword={() => setCurrentScreen('forget-password')}
            />
          ) : currentScreen === 'signup' ? (
            <SignUp 
              colors={colors}
              onSignUpSuccess={() => setCurrentScreen('dashboard')}
              onNavigateBack={() => setCurrentScreen('login')}
            />
          ) : currentScreen === 'forget-password' ? (
            <ForgetPassword 
              colors={colors}
              onNavigateBack={() => setCurrentScreen('login')}
            />
          ) : (
            
            /* Three-panel Horizontal Swipe Canvas container */
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              // Disable horizontal gestures exclusively when looking at notifications so toggles don't swipe away
              scrollEnabled={currentScreen !== 'notifications'}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              onMomentumScrollEnd={handleScrollMomentumEnd}
              onLayout={() => {
                let pageIndex = 0;
                if (currentScreen === 'calendar') pageIndex = 1;
                if (currentScreen === 'settings' || currentScreen === 'notifications') pageIndex = 2;
                
                if (pageIndex > 0) {
                  scrollViewRef.current?.scrollTo({
                    x: pageIndex * SCREEN_WIDTH,
                    animated: false,
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
                  initialDate={calendarAnchorDate} 
                  onSignOut={() => setCurrentScreen('login')}
                  onNavigate={handleNavigation} 
                />
              </View>

              {/* PAGE 3: Settings Panel OR Notification Overlay */}
              <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
                {currentScreen === 'notifications' ? (
                  <NotificationSettings 
                    colors={colors}
                    onNavigateBack={() => handleNavigation('settings')}
                    onNavigate={handleNavigation}
                  />
                ) : (
                  <AppSettings 
                    colors={colors} 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={handleToggleDarkMode}
                    onSignOut={() => setCurrentScreen('login')}
                    onNavigate={handleNavigation} 
                  />
                )}
              </View>
            </ScrollView>

          )}

        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}