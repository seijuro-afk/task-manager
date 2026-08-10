// mobile/SignUp.tsx
import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { 
  Terminal, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg'; 
import { styles } from './styles';

interface SignUpProps {
  colors: any;
  onSignUpSuccess: () => void;
  onNavigateBack: () => void;
}

export default function SignUp({ colors, onSignUpSuccess, onNavigateBack }: SignUpProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Track network requests

  const handleSignUpSubmit = async () => {
    // 1. Validation guards
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Registration Error', 'Please populate all input fields to proceed.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Registration Error', 'Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Registration Error', 'Passwords do not match. Please try again.');
      return;
    }
    
    setIsLoading(true);

    try {
      /**
       * NETWORK TARGETING GUIDE FOR EMULATORS AND DEVICES:
       * Android Emulator: Use 'http://10.0.2.2:3001/auth/register'
       * Any physical device or LAN-connected simulator: Use your computer's LAN IP
       *   http://192.168.1.5:3001/auth/register
       */
      const targetUrl = 'http://192.168.1.5:3001/auth/register';

      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong during account provisioning.');
      }

      Alert.alert('Success', 'Account successfully built and verified inside Docker!');
      onSignUpSuccess();
      
    } catch (error: any) {
      Alert.alert('Server Connection Error', error.message || 'Could not talk to database instance container.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView 
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ 
        flexGrow: 1, 
        justifyContent: 'center', 
        paddingHorizontal: 24, 
        paddingTop: 10,
        paddingBottom: 16 
      }} 
      showsVerticalScrollIndicator={false}
    >
      {/* Transactional Minimalist Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, height: 40, paddingHorizontal: 4 }}>
        <View style={{ width: 26, height: 26, backgroundColor: colors.primary, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
          <Terminal color="#ffffff" size={14} />
        </View>
        <Text style={[styles.headlineMd, { color: colors.textMain, fontWeight: '700', letterSpacing: -0.5, fontSize: 16 }]}>
          DevFlow
        </Text>
      </View>

      {/* Hero Welcome Message Section */}
      <View style={[styles.brandHeaderSection, { marginTop: 8, marginBottom: 12, alignItems: 'flex-start' }]}>
        <Text style={[styles.displayWelcomeText, { color: colors.textMain, fontSize: 24, lineHeight: 32, fontWeight: '700', letterSpacing: -0.8 }]}>
          Create account
        </Text>
        <Text style={[styles.bodySubtitleText, { color: colors.textMuted, textAlign: 'left', marginTop: 1, fontSize: 13 }]}>
          Start optimizing your engineering workflow today.
        </Text>
      </View>

      {/* Main Structural Form Card Block */}
      <View style={[styles.formCardBody, { backgroundColor: colors.surfaceContainer, borderColor: colors.border, padding: 16, borderRadius: 12 }]}>
        
        {/* Input Field Instance: Full Name */}
        <View style={[styles.inputStackGroup, { marginBottom: 10 }]}>
          <Text style={[styles.labelCapsIndicator, { color: colors.textMuted, marginBottom: 4, fontSize: 11 }]}>FULL NAME</Text>
          <View style={[styles.fieldLayoutInputWrapper, { backgroundColor: colors.inputBg }]}>
            <User color={colors.textPlaceholder} size={16} style={styles.fieldInlineIcon} />
            <TextInput 
              style={[styles.nativeTextInputField, { color: colors.textMain, paddingVertical: 8, fontSize: 14 }]}
              placeholder="John Doe"
              placeholderTextColor={colors.textPlaceholder}
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              editable={!isLoading}
            />
          </View>
        </View>

        {/* Input Field Instance: Email */}
        <View style={[styles.inputStackGroup, { marginBottom: 10 }]}>
          <Text style={[styles.labelCapsIndicator, { color: colors.textMuted, marginBottom: 4, fontSize: 11 }]}>EMAIL ADDRESS</Text>
          <View style={[styles.fieldLayoutInputWrapper, { backgroundColor: colors.inputBg }]}>
            <Mail color={colors.textPlaceholder} size={16} style={styles.fieldInlineIcon} />
            <TextInput 
              style={[styles.nativeTextInputField, { color: colors.textMain, paddingVertical: 8, fontSize: 14 }]}
              placeholder="dev@example.com"
              placeholderTextColor={colors.textPlaceholder}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />
          </View>
        </View>

        {/* Input Field Instance: Password Frame */}
        <View style={[styles.inputStackGroup, { marginBottom: 10 }]}>
          <Text style={[styles.labelCapsIndicator, { color: colors.textMuted, marginBottom: 4, fontSize: 11 }]}>PASSWORD</Text>
          <View style={[styles.fieldLayoutInputWrapper, { backgroundColor: colors.inputBg }]}>
            <Lock color={colors.textPlaceholder} size={16} style={styles.fieldInlineIcon} />
            <TextInput 
              style={[styles.nativeTextInputField, { color: colors.textMain, paddingVertical: 8, fontSize: 14 }]}
              placeholder="••••••••"
              placeholderTextColor={colors.textPlaceholder}
              secureTextEntry={secureText}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              editable={!isLoading}
            />
            <TouchableOpacity 
              onPress={() => setSecureText(!secureText)} 
              style={styles.visibilityToggleTouchTarget}
              activeOpacity={0.7}
            >
              {secureText ? <EyeOff color={colors.textMuted} size={16} /> : <Eye color={colors.textMuted} size={16} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Field Instance: Confirm Password Frame */}
        <View style={[styles.inputStackGroup, { marginBottom: 14 }]}>
          <Text style={[styles.labelCapsIndicator, { color: colors.textMuted, marginBottom: 4, fontSize: 11 }]}>CONFIRM PASSWORD</Text>
          <View style={[styles.fieldLayoutInputWrapper, { backgroundColor: colors.inputBg }]}>
            <Lock color={colors.textPlaceholder} size={16} style={styles.fieldInlineIcon} />
            <TextInput 
              style={[styles.nativeTextInputField, { color: colors.textMain, paddingVertical: 8, fontSize: 14 }]}
              placeholder="••••••••"
              placeholderTextColor={colors.textPlaceholder}
              secureTextEntry={secureConfirmText}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
              editable={!isLoading}
            />
            <TouchableOpacity 
              onPress={() => setSecureConfirmText(!secureConfirmText)} 
              style={styles.visibilityToggleTouchTarget}
              activeOpacity={0.7}
            >
              {secureConfirmText ? <EyeOff color={colors.textMuted} size={16} /> : <Eye color={colors.textMuted} size={16} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Execution Submit Button */}
        <TouchableOpacity 
          style={[styles.primaryActionButtonSubmit, { backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 10, borderRadius: 8, opacity: isLoading ? 0.6 : 1 }]} 
          onPress={handleSignUpSubmit}
          activeOpacity={0.9}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <>
              <Text style={[styles.headlineButtonTextLabel, { fontSize: 15, fontWeight: '600' }]}>Create account</Text>
              <ArrowRight color="#ffffff" size={16} />
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Alternative Social Oauth Breakout Blocks */}
      <View style={{ marginTop: 14, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 4, marginBottom: 10 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.border, opacity: 0.4 }} />
          <Text style={[styles.labelCapsIndicator, { color: colors.textMuted, marginHorizontal: 12, fontSize: 10 }]}>
            OR CONTINUE WITH
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.border, opacity: 0.4 }} />
        </View>

        <View style={{ flexDirection: 'row', gap: 12, width: '100%', paddingHorizontal: 4 }}>
          <TouchableOpacity 
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 8, borderWidth: 1, borderColor: colors.border, borderRadius: 10, backgroundColor: colors.surfaceContainer }}
            onPress={() => Alert.alert('OAuth Integration', 'Google sign-in coming soon.')}
            activeOpacity={0.8}
          >
            <Svg width="14" height="14" viewBox="0 0 24 24">
              <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </Svg>
            <Text style={{ fontWeight: '600', color: colors.textMain, fontSize: 13 }}>Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 8, borderWidth: 1, borderColor: colors.border, borderRadius: 10, backgroundColor: colors.surfaceContainer }}
            onPress={() => Alert.alert('OAuth Integration', 'GitHub sign-in coming soon.')}
            activeOpacity={0.8}
          >
            <Svg width="14" height="14" viewBox="0 0 24 24" fill={colors.textMain}>
              <Path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </Svg>
            <Text style={{ fontWeight: '600', color: colors.textMain, fontSize: 13 }}>GitHub</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Structural Footer Segment */}
      <View style={{ marginTop: 'auto', paddingTop: 16, alignItems: 'center' }}>
        <Text style={[styles.bodySubtitleText, { color: colors.textMuted, fontSize: 13 }]}>
          Already have an account?{' '}
          <Text style={{ color: colors.primary, fontWeight: '600' }} onPress={onNavigateBack}>
            Sign In
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}