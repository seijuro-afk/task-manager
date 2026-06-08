import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  StatusBar
} from 'react-native';
import { CheckCircle2, Circle, Eye, EyeOff, Mail, Lock } from 'lucide-react-native';

export default function App() {
  // Navigation tracking state
  const [currentScreen, setCurrentScreen] = useState<'login' | 'dashboard'>('login');
  
  // Input fields tracking state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      setCurrentScreen('dashboard');
    } else {
      alert('Please fill out your Email and Password fields.');
    }
  };

  return (
    <SafeAreaView style={styles.outerCanvas}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f9fb" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.outerCanvas}
      >
        
        {/* ==================== SCREEN 1: SIGN IN (LIGHT PREFERENCE) ==================== */}
        {currentScreen === 'login' && (
          <View style={styles.mainLayoutContainer}>
            
            {/* Brand / Header Region */}
            <View style={styles.brandHeaderSection}>
              <View style={styles.brandIconBadge}>
                {/* Replicating task_alt styling from your HTML file */}
                <CheckCircle2 color="#ffffff" size={24} />
              </View>
              <Text style={styles.displayWelcomeText}>Welcome Back</Text>
              <Text style={styles.bodySubtitleText}>Sign in to continue to Task Manager</Text>
            </View>

            {/* Form Card */}
            <View style={styles.formCardBody}>
              
              {/* Email Input Field Group */}
              <View style={styles.inputStackGroup}>
                <Text style={styles.labelCapsIndicator}>EMAIL</Text>
                <View style={styles.fieldLayoutInputWrapper}>
                  <Mail color="#767586" size={18} style={styles.fieldInlineIcon} />
                  <TextInput 
                    style={styles.nativeTextInputField}
                    placeholder="name@company.com"
                    placeholderTextColor="#767586"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              {/* Password Input Field Group */}
              <View style={styles.inputStackGroup}>
                <Text style={styles.labelCapsIndicator}>PASSWORD</Text>
                <View style={styles.fieldLayoutInputWrapper}>
                  <Lock color="#767586" size={18} style={styles.fieldInlineIcon} />
                  <TextInput 
                    style={styles.nativeTextInputField}
                    placeholder="••••••••"
                    placeholderTextColor="#767586"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureText}
                    autoCapitalize="none"
                  />
                  {/* Interactive visibility toggle button matching your script file logic */}
                  <TouchableOpacity 
                    onPress={() => setSecureText(!secureText)} 
                    style={styles.visibilityToggleTouchTarget}
                  >
                    {secureText ? (
                      <EyeOff color="#464554" size={20} />
                    ) : (
                      <Eye color="#464554" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                
                {/* Forgot Password Link Wrapper */}
                <View style={styles.forgotPasswordAlignWrapper}>
                  <TouchableOpacity>
                    <Text style={styles.forgotPasswordLinkText}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Submit Button Component */}
              <TouchableOpacity style={styles.primaryActionButtonSubmit} onPress={handleLogin}>
                <Text style={styles.headlineButtonTextLabel}>Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* Footer Form Alternatives Link */}
            <View style={styles.footerRedirectArea}>
              <Text style={styles.footerRegularBodyText}>
                Don't have an account?{' '}
                <Text style={styles.footerActiveHighlightLink}>Sign up</Text>
              </Text>
            </View>

          </View>
        )}

        {/* ==================== SCREEN 2: SUCCESS DOCKING LAYOUT ==================== */}
        {currentScreen === 'dashboard' && (
          <View style={styles.successScreenPlaceholder}>
            <CheckCircle2 color="#4648d4" size={64} />
            <Text style={styles.displayWelcomeText}>Authenticated!</Text>
            <Text style={[styles.bodySubtitleText, { textAlign: 'center', marginTop: 8 }]}>
              Your backend communication channels are active.
            </Text>
            <TouchableOpacity 
              style={[styles.primaryActionButtonSubmit, { width: '80%', marginTop: 24 }]}
              onPress={() => setCurrentScreen('login')}
            >
              <Text style={styles.headlineButtonTextLabel}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// 🎨 Clean CSS Token Object Mapper (Harmonized Layout Theme)
const styles = StyleSheet.create({
  outerCanvas: {
    flex: 1,
    backgroundColor: '#f7f9fb', // Mapped from tailwind.config background variable
  },
  mainLayoutContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24, // Consistent structural layout padding
  },
  brandHeaderSection: {
    alignItems: 'center',
    marginBottom: 32, // Harmonized from spacing.xl token
  },
  brandIconBadge: {
    backgroundColor: '#4648d4', // Mapped from primary color variable
    width: 48,
    height: 48,
    borderRadius: 12, // Mapped from rounded-[12px]
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16, // Consistent spacing metric
  },
  displayWelcomeText: {
    fontFamily: Platform.OS === 'ios' ? 'Hanken Grotesk' : 'sans-serif-condensed',
    fontSize: 32, // Mapped from fontSize.display token
    fontWeight: '700',
    color: '#191c1e', // Mapped from on-surface token
  },
  bodySubtitleText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
    fontSize: 16, // Mapped from fontSize.body-lg token
    color: '#464554', // Mapped from on-surface-variant token
    marginTop: 8,
  },
  formCardBody: {
    backgroundColor: '#ffffff', // Mapped from surface-container-lowest token
    borderRadius: 12,
    padding: 24, // Mapped from spacing.lg token
    borderWidth: 1,
    borderColor: '#eceef0', // Mapped from surface-container border line
    shadowColor: '#191c1e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  inputStackGroup: {
    marginBottom: 16, // Consistent spacing stack gap block
  },
  labelCapsIndicator: {
    fontFamily: Platform.OS === 'ios' ? 'JetBrains Mono' : 'monospace',
    fontSize: 12, // Mapped from fontSize.label-caps token
    fontWeight: '500',
    color: '#464554', // Mapped from on-surface-variant token
    marginBottom: 6,
    marginLeft: 4,
  },
  fieldLayoutInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f4f6', // Mapped from surface-container-low token
    borderRadius: 12, // Consistent border radius across design elements
    paddingHorizontal: 16,
  },
  fieldInlineIcon: {
    marginRight: 10,
  },
  nativeTextInputField: {
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
    fontSize: 14, // Mapped from fontSize.body-md token
    color: '#191c1e', // Mapped from on-surface token
    paddingVertical: 14, // Vertical sizing matching your form input
  },
  visibilityToggleTouchTarget: {
    padding: 8,
  },
  forgotPasswordAlignWrapper: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordLinkText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
    fontSize: 14,
    color: '#4648d4', // Mapped from primary link color variable
    fontWeight: '500',
  },
  primaryActionButtonSubmit: {
    backgroundColor: '#4648d4', // Mapped from primary layout button color
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  headlineButtonTextLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Hanken Grotesk' : 'sans-serif-bold',
    fontSize: 20, // Mapped from fontSize.headline-md token
    fontWeight: '600',
    color: '#ffffff', // Mapped from on-primary token
  },
  footerRedirectArea: {
    alignItems: 'center',
    marginTop: 32, // Mapped from spacing.xl token
  },
  footerRegularBodyText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
    fontSize: 14,
    color: '#464554', // Mapped from on-surface-variant token
  },
  footerActiveHighlightLink: {
    color: '#4648d4', // Mapped from primary token
    fontWeight: '600',
  },
  successScreenPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  }
});