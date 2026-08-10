// mobile/Login.tsx
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { CheckCircle2, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { styles } from './styles';

interface LoginProps {
  colors: any;
  onLoginSuccess: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

export default function Login({ colors, onLoginSuccess, onSignUp, onForgotPassword }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      onLoginSuccess();
    } else {
      Alert.alert('Authentication Error', 'Please enter both an email and password to sign in.');
    }
  };

  return (
    <View style={[styles.mainLayoutContainer, { backgroundColor: colors.background }]}> 
      <View style={styles.brandHeaderSection}>
        <View style={[styles.brandIconBadge, { backgroundColor: colors.primary }]}>
          <CheckCircle2 color="#ffffff" size={24} />
        </View>
        <Text style={[styles.displayWelcomeText, { color: colors.textMain }]}>Welcome Back</Text>
        <Text style={[styles.bodySubtitleText, { color: colors.textMuted }]}>Sign in to continue to Task Manager</Text>
      </View>

      <View style={[styles.formCardBody, { backgroundColor: colors.surfaceContainer, borderColor: colors.border }]}>
        <View style={styles.inputStackGroup}>
          <Text style={[styles.labelCapsIndicator, { color: colors.textMuted }]}>EMAIL</Text>
          <View style={[styles.fieldLayoutInputWrapper, { backgroundColor: colors.inputBg }]}>
            <Mail color={colors.textPlaceholder} size={18} style={styles.fieldInlineIcon} />
            <TextInput 
              style={[styles.nativeTextInputField, { color: colors.textMain }]}
              placeholder="name@company.com"
              placeholderTextColor={colors.textPlaceholder}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputStackGroup}>
          <Text style={[styles.labelCapsIndicator, { color: colors.textMuted }]}>PASSWORD</Text>
          <View style={[styles.fieldLayoutInputWrapper, { backgroundColor: colors.inputBg }]}>
            <Lock color={colors.textPlaceholder} size={18} style={styles.fieldInlineIcon} />
            <TextInput 
              style={[styles.nativeTextInputField, { color: colors.textMain }]}
              placeholder="••••••••"
              placeholderTextColor={colors.textPlaceholder}
              secureTextEntry={secureText}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.visibilityToggleTouchTarget}>
              {secureText ? <EyeOff color={colors.textMuted} size={20} /> : <Eye color={colors.textMuted} size={20} />}
            </TouchableOpacity>
          </View>
          <View style={styles.forgotPasswordAlignWrapper}>
            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={[styles.forgotPasswordLinkText, { color: colors.primary }]}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[styles.primaryActionButtonSubmit, { backgroundColor: colors.primary }]} onPress={handleLogin}>
          <Text style={styles.headlineButtonTextLabel}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={[styles.bodySubtitleText, { color: colors.textMuted }, { fontSize: 14 }, {textAlign: 'center'}]}>Don't have an account? <Text style={{ color: colors.primary }} onPress={onSignUp}>Sign Up</Text></Text>
      </View>
    </View>

  );
}