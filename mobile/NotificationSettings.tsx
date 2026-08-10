import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme
} from 'react-native';
import { 
  Terminal, 
  ArrowLeft, 
  CheckCircle, 
  Calendar, 
  Settings 
} from 'lucide-react-native';
import { lightPalette, darkPalette, styles as globalStyles } from './styles';

interface NotificationSettingsProps {
  colors: any; 
  onNavigateBack: () => void;
  onNavigate: (screen: 'dashboard' | 'calendar' | 'settings' | 'notifications') => void;
}

export default function NotificationSettings({ colors: passedColors, onNavigateBack, onNavigate }: NotificationSettingsProps) {
  const scheme = useColorScheme();
  // Read theme securely matching system parameters if needed, fallback to props design rules
  const colors = passedColors || (scheme === 'dark' ? darkPalette : lightPalette);

  // Toggle form controller states
  const [allowNotifications, setAllowNotifications] = useState(true);
  const [taskDeadlines, setTaskDeadlines] = useState(true);
  const [projectComments, setProjectComments] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  // Styled Micro Custom Toggle Switch Component
  const ToggleSwitch = ({ value, onValueChange }: { value: boolean; onValueChange: () => void }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onValueChange}
      style={[
        localStyles.switchTrack,
        { backgroundColor: value ? colors.primary : colors.surfaceVariant }
      ]}
    >
      <View
        style={[
          localStyles.switchThumb,
          value ? { right: 4 } : { left: 4 }
        ]}
      />
    </TouchableOpacity>
  );

  return (
    // Changed wrapper from SafeAreaView to a standard View container since parent handles safe tracking
    <View style={[globalStyles.outerCanvas, { backgroundColor: colors.background }]}>
      
      {/* 🖥️ APP CONTAINER NAVIGATION HEADER BAR */}
      <View style={[globalStyles.dashboardHeader, { backgroundColor: colors.surfaceContainer, borderBottomColor: colors.border }]}>
        <View style={globalStyles.headerTitleBlock}>
          <View style={[localStyles.headerLogoBadge, { backgroundColor: colors.surfaceLow }]}>
            <Terminal color={colors.primary} size={18} />
          </View>
          <Text style={[globalStyles.dashboardTitleText, { color: colors.primary }]}>DevFlow</Text>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' }}
          style={[globalStyles.avatarCircle, { borderWidth: 1, borderColor: colors.border }]}
        />
      </View>

      {/* 📜 FORM LIST SCROLL REGION */}
      <ScrollView
        contentContainerStyle={localStyles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* BACK TO DASHBOARD ACTION LAYER */}
        <View style={localStyles.headerActionGroup}>
          <TouchableOpacity
            onPress={onNavigateBack}
            style={localStyles.backInlineRow}
            activeOpacity={0.7}
          >
            <ArrowLeft color={colors.primary} size={16} />
            <Text style={[localStyles.backActionText, { color: colors.primary }]}>Back to Settings</Text>
          </TouchableOpacity>
          <Text style={[globalStyles.displayWelcomeText, { color: colors.textMain, fontSize: 28 }]}>
            Notification Settings
          </Text>
        </View>

        {/* 🔔 SEGMENT 1: PUSH CONTROLS CONFIGURATION */}
        <View style={localStyles.sectionWrapper}>
          <Text style={[localStyles.sectionLabelHeadline, { color: colors.textMain }]}>Push Notifications</Text>
          <View style={[localStyles.settingsGroupCard, { backgroundColor: colors.surfaceContainer, borderColor: colors.border }]}>
            
            {/* Master Settings Row */}
            <View style={[localStyles.interactiveRowItem, { borderBottomColor: colors.border }]}>
              <View style={localStyles.rowMetaGroup}>
                <Text style={[localStyles.rowPrimaryLabel, { color: colors.textMain }]}>Allow Notifications</Text>
                <Text style={[localStyles.rowSecondaryLabel, { color: colors.textMuted }]}>Master toggle for all push alerts</Text>
              </View>
              <ToggleSwitch value={allowNotifications} onValueChange={() => setAllowNotifications(!allowNotifications)} />
            </View>

            {/* Standard Settings Row 2 */}
            <View style={[localStyles.interactiveRowItem, { borderBottomColor: colors.border }]}>
              <Text style={[localStyles.rowStandardLabel, { color: colors.textMain }]}>Task Deadlines</Text>
              <ToggleSwitch value={taskDeadlines} onValueChange={() => setTaskDeadlines(!taskDeadlines)} />
            </View>

            {/* Standard Settings Row 3 */}
            <View style={[localStyles.interactiveRowItem, { borderBottomColor: colors.border }]}>
              <Text style={[localStyles.rowStandardLabel, { color: colors.textMain }]}>Project Comments</Text>
              <ToggleSwitch value={projectComments} onValueChange={() => setProjectComments(!projectComments)} />
            </View>

            {/* Standard Settings Row 4 */}
            <View style={localStyles.interactiveRowItem}>
              <Text style={[localStyles.rowStandardLabel, { color: colors.textMain }]}>System Updates</Text>
              <ToggleSwitch value={systemUpdates} onValueChange={() => setSystemUpdates(!systemUpdates)} />
            </View>
          </View>
        </View>

        {/* ✉️ SEGMENT 2: EMAIL NOTIFICATION MATRIX */}
        <View style={localStyles.sectionWrapper}>
          <Text style={[localStyles.sectionLabelHeadline, { color: colors.textMain }]}>Email Notifications</Text>
          <View style={[localStyles.settingsGroupCard, { backgroundColor: colors.surfaceContainer, borderColor: colors.border }]}>
            
            {/* Email Alerts Submaster Row */}
            <View style={[localStyles.interactiveRowItem, { borderBottomColor: colors.border }]}>
              <View style={localStyles.rowMetaGroup}>
                <Text style={[localStyles.rowPrimaryLabel, { color: colors.textMain }]}>Email Alerts</Text>
                <Text style={[localStyles.rowSecondaryLabel, { color: colors.textMuted }]}>Receive updates via email</Text>
              </View>
              <ToggleSwitch value={emailAlerts} onValueChange={() => setEmailAlerts(!emailAlerts)} />
            </View>

            {/* Email Item 2 */}
            <View style={[localStyles.interactiveRowItem, { borderBottomColor: colors.border }]}>
              <Text style={[localStyles.rowStandardLabel, { color: colors.textMain }]}>Weekly Productivity Digest</Text>
              <ToggleSwitch value={weeklyDigest} onValueChange={() => setWeeklyDigest(!weeklyDigest)} />
            </View>

            {/* Email Item 3 */}
            <View style={localStyles.interactiveRowItem}>
              <Text style={[localStyles.rowStandardLabel, { color: colors.textMain }]}>Security Alerts</Text>
              <ToggleSwitch value={securityAlerts} onValueChange={() => setSecurityAlerts(!securityAlerts)} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 🗺️ PERSISTENT PLATFORM BOTTOM NAVIGATION TAB-BAR */}
      <View style={[globalStyles.tabBarFixedContainer, { backgroundColor: colors.background, borderTopColor: colors.border, paddingBottom: 24 }]}>
        {/* Tasks Button */}
        <TouchableOpacity 
          style={globalStyles.tabBarNavButtonCell} 
          activeOpacity={0.7}
          onPress={() => onNavigate('dashboard')} // 👈 Added navigation execution handler
        >
          <CheckCircle color={colors.textPlaceholder} size={22} />
          <Text style={[localStyles.bottomBarNavLabel, { color: colors.textPlaceholder }]}>Tasks</Text>
        </TouchableOpacity>

        {/* Calendar Button */}
        <TouchableOpacity 
          style={globalStyles.tabBarNavButtonCell} 
          activeOpacity={0.7}
          onPress={() => onNavigate('calendar')} // 👈 Added navigation execution handler
        >
          <Calendar color={colors.textPlaceholder} size={22} />
          <Text style={[localStyles.bottomBarNavLabel, { color: colors.textPlaceholder }]}>Calendar</Text>
        </TouchableOpacity>

        {/* Settings Button (Active Layout Focus Context State Indicator) */}
        <TouchableOpacity 
          style={[globalStyles.tabBarNavButtonCell, { backgroundColor: colors.surfaceLow }]} 
          activeOpacity={0.7}
          onPress={() => onNavigate('settings')} // 👈 Returns clean baseline state view focus wrapper safely
        >
          <Settings color={colors.primary} size={22} />
          <Text style={[localStyles.bottomBarNavLabel, { color: colors.primary, fontWeight: '700' }]}>Settings</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const localStyles = StyleSheet.create({
  headerLogoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  scrollContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
  headerActionGroup: {
    marginBottom: 24,
  },
  backInlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backActionText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  sectionWrapper: {
    marginBottom: 24,
  },
  sectionLabelHeadline: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    paddingLeft: 2,
  },
  settingsGroupCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  interactiveRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  rowMetaGroup: {
    flexDirection: 'column',
    flex: 1,
    paddingRight: 12,
  },
  rowPrimaryLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  rowSecondaryLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  rowStandardLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    position: 'relative',
    justifyContent: 'center',
  },
  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  bottomBarNavLabel: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  }
});