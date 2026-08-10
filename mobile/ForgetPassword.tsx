// mobile/ForgetPassword.tsx
import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { 
  Terminal, 
  Mail, 
  ArrowRight,
  ArrowLeft,
  MailCheck
} from 'lucide-react-native';
import { styles } from './styles';

interface ForgetPasswordProps {
  colors: any;
  onNavigateBack: () => void;
}

export default function ForgetPassword({ colors, onNavigateBack }: ForgetPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetRequest = () => {
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your work email address.');
      return;
    }

    setIsLoading(true);

    // Simulate the 1200ms timeout micro-interaction from your original HTML file
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleResendEmail = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', `A new recovery link has been dispatched to ${email}`);
    }, 800);
  };

  return (
    <ScrollView 
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ 
        flexGrow: 1, 
        justifyContent: 'center', 
        paddingHorizontal: 24, 
        paddingTop: 24,     
        paddingBottom: 32 
      }} 
      showsVerticalScrollIndicator={false}
    >
      {/* Brand Identity: Logo Container */}
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <View style={{ width: 44, height: 44, backgroundColor: colors.primary, borderRadius: 12, alignItems: 'center', justifyContent: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 }}>
          <Terminal color="#ffffff" size={22} />
        </View>
        <Text style={[styles.labelCapsIndicator, { color: colors.primary, letterSpacing: 2.5, fontSize: 11, marginTop: 8, fontWeight: '700' }]}>
          DEVFLOW
        </Text>
      </View>

      {/* Content Shell / Main Form Card */}
      <View style={[styles.formCardBody, { backgroundColor: colors.surfaceContainerLowest || colors.surfaceContainer, borderColor: colors.border, padding: 24, borderRadius: 16 }]}>
        
        {!isSubmitted ? (
          /* ==================== STATE A: UN-SUBMITTED RESET FORM ==================== */
          <View>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ color: colors.textMain, fontSize: 24, fontWeight: '600', letterSpacing: -0.3, marginBottom: 6 }}>
                Reset Password
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: 14, textAlign: 'center', lineHeight: 20 }}>
                Enter your email address and we'll send you a link to reset your password.
              </Text>
            </View>

            {/* Input Stack: Work Email */}
            <View style={[styles.inputStackGroup, { marginBottom: 20 }]}>
              <Text style={[styles.labelCapsIndicator, { color: colors.textMuted, marginBottom: 6, marginLeft: 4, fontSize: 11 }]}>
                WORK EMAIL
              </Text>
              <View style={[styles.fieldLayoutInputWrapper, { backgroundColor: colors.inputBg || colors.background }]}>
                <Mail color={colors.textPlaceholder} size={18} style={styles.fieldInlineIcon} />
                <TextInput 
                  style={[styles.nativeTextInputField, { color: colors.textMain, paddingVertical: 10 }]}
                  placeholder="name@company.com"
                  placeholderTextColor={colors.textPlaceholder}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Execution Button */}
            <TouchableOpacity 
              style={{ backgroundColor: '#6366f1', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 8, paddingVertical: 12, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 2 }} 
              onPress={handleResetRequest}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <>
                  <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 15 }}>Send Reset Link</Text>
                  <ArrowRight color="#ffffff" size={16} />
                </>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          /* ==================== STATE B: SUCCESS STATE INBOX DELIVERED ==================== */
          <View style={{ alignItems: 'center', paddingVertical: 8 }}>
            <View style={{ width: 56, height: 56, backgroundColor: colors.secondaryContainer || '#dae2fd', borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <MailCheck color={colors.onSecondaryContainer || '#5c647a'} size={28} />
            </View>
            
            <Text style={{ color: colors.textMain, fontSize: 20, fontWeight: '600', marginBottom: 6 }}>
              Check your inbox
            </Text>
            
            <Text style={{ color: colors.textMuted, fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 20 }}>
              We've sent a recovery link to <Text style={{ fontWeight: '600', color: colors.textMain }}>{email}</Text>.
            </Text>

            <TouchableOpacity 
              onPress={handleResendEmail} 
              activeOpacity={0.7}
              disabled={isLoading}
              style={{ paddingVertical: 4 }}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.primary} size="small" />
              ) : (
                <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 12, letterSpacing: 0.5 }}>
                  RESEND EMAIL
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Footer Navigation Actions */}
      <TouchableOpacity 
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 24, paddingVertical: 8 }}
        onPress={onNavigateBack}
        activeOpacity={0.7}
      >
        <ArrowLeft color={colors.textMuted} size={16} />
        <Text style={{ color: colors.textMuted, fontSize: 14, fontWeight: '500' }}>
          Back to Sign In
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}