// mobile/Settings.tsx
import React, { useState } from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  Image
} from 'react-native';
import { 
  Terminal, 
  User, 
  Moon, 
  Bell, 
  CloudSync, 
  LogOut, 
  ChevronRight, 
  ListTodo, 
  Calendar as CalendarIcon, 
  Settings as SettingsIcon 
} from 'lucide-react-native';
import { styles } from './styles';

interface SettingsProps {
  colors: any;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onSignOut: () => void;
  onNavigate: (screen: 'dashboard' | 'calendar' | 'settings') => void;
}

export default function Settings({ colors, isDarkMode, onToggleDarkMode, onSignOut, onNavigate }: SettingsProps) {

  return (
    <View style={[styles.outerCanvas, { backgroundColor: colors.background }]}>
      
      {/* ─── TOP APP BAR ─── */}
      <View style={[styles.dashboardHeader, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <View style={styles.headerTitleBlock}>
          <Terminal color={colors.primary} size={24} style={{ marginRight: 10 }} />
          <View>
            <Text style={[styles.dashboardTitleText, { color: colors.textMain }]}>DevFlow</Text>
            <Text style={[styles.dashboardSubtitleText, { color: colors.textMuted }]}>System Settings</Text>
          </View>
        </View>

        <View style={[styles.avatarCircle, { backgroundColor: colors.surfaceLow }]}>
          <Text style={[styles.avatarFallbackText, { color: colors.textMuted }]}>AC</Text>
        </View>
      </View>

      {/* ─── SCROLLABLE CONTENT BODY ─── */}
      <ScrollView 
        contentContainerStyle={[styles.listScrollPadding, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.dashboardTitleText, { color: colors.textMain, fontSize: 28, marginBottom: 20 }]}>
          Settings
        </Text>

        {/* ─── PROFILE HERO CARD ─── */}
        <View style={[styles.taskItemCard, { 
          backgroundColor: colors.surfaceContainer, 
          borderColor: colors.border, 
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{ 
              width: 56, 
              height: 56, 
              borderRadius: 28, 
              backgroundColor: colors.surfaceLow, 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: 16,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <User color={colors.textMain} size={24} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textMain }}>Alex Carter</Text>
              <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>alex.carter@devflow.io</Text>
              <View style={{ 
                alignSelf: 'flex-start', 
                backgroundColor: colors.surfaceLow, 
                paddingHorizontal: 8, 
                paddingVertical: 2, 
                borderRadius: 4, 
                marginTop: 6,
                borderWidth: 1,
                borderColor: colors.border
              }}>
                <Text style={{ fontSize: 11, fontWeight: '600', color: colors.primary }}>Pro Plan</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
            backgroundColor: colors.surfaceLow,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: colors.textMain }}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* ─── PREFERENCES CONTAINER ─── */}
        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textMain, marginTop: 24, marginBottom: 10 }}>
          Preferences
        </Text>
        <View style={{ backgroundColor: colors.surfaceContainer, borderRadius: 12, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' }}>
          
          {/* Dark Mode Custom Toggle Item */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surfaceLow, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Moon color={colors.primary} size={18} />
              </View>
              <View>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.textMain }}>Dark Mode</Text>
                <Text style={{ fontSize: 12, color: colors.textMuted }}>Adjust appearance profile</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={onToggleDarkMode}
              style={{
                width: 48,
                height: 26,
                borderRadius: 13,
                backgroundColor: isDarkMode ? colors.primary : colors.surfaceLow,
                justifyContent: 'center',
                paddingHorizontal: 4
              }}
            >
              <View style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: '#ffffff',
                alignSelf: isDarkMode ? 'flex-end' : 'flex-start',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
              }} />
            </TouchableOpacity>
          </View>

          {/* Notifications Link */}
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surfaceLow, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Bell color={colors.textPlaceholder} size={18} />
              </View>
              <View>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.textMain }}>Notifications</Text>
                <Text style={{ fontSize: 12, color: colors.textMuted }}>Manage alerts and emails</Text>
              </View>
            </View>
            <ChevronRight color={colors.textPlaceholder} size={18} />
          </TouchableOpacity>
        </View>

        {/* ─── ACCOUNT CONTAINER ─── */}
        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textMain, marginTop: 24, marginBottom: 10 }}>
          Account
        </Text>
        <View style={{ backgroundColor: colors.surfaceContainer, borderRadius: 12, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' }}>
          
          {/* Sync Data Row Link */}
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surfaceLow, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <CloudSync color={colors.textPlaceholder} size={18} />
              </View>
              <View>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.textMain }}>Sync Data</Text>
                <Text style={{ fontSize: 12, color: colors.textMuted }}>Last synced 2 mins ago</Text>
              </View>
            </View>
            <ChevronRight color={colors.textPlaceholder} size={18} />
          </TouchableOpacity>

          {/* Destructive Log Out Row Link */}
          <TouchableOpacity 
            onPress={onSignOut}
            style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}
          >
            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(239, 68, 68, 0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
              <LogOut color="#ef4444" size={18} />
            </View>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#ef4444' }}>Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* ─── PERSISTENT SYSTEM BOTTOM TAB BAR ─── */}
      <View style={[styles.tabBarFixedContainer, {
        bottom: 0,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
        backgroundColor: colors.background,
        borderTopColor: colors.border
      }]}>
        
        {/* Navigation Destination: Tasks */}
        <TouchableOpacity 
          onPress={() => onNavigate('dashboard')}
          style={styles.tabBarNavButtonCell}
          activeOpacity={0.7}
        >
          <ListTodo color={colors.textPlaceholder} size={20} />
          <Text style={[styles.labelCapsIndicator, { fontSize: 11, color: colors.textPlaceholder, marginTop: 4, marginBottom: 0, marginLeft: 0 }]}>Tasks</Text>
        </TouchableOpacity>

        {/* Navigation Destination: Calendar */}
        <TouchableOpacity 
          onPress={() => onNavigate('calendar')}
          style={styles.tabBarNavButtonCell}
          activeOpacity={0.7}
        >
          <CalendarIcon color={colors.textPlaceholder} size={20} />
          <Text style={[styles.labelCapsIndicator, { fontSize: 11, color: colors.textPlaceholder, marginTop: 4, marginBottom: 0, marginLeft: 0 }]}>Calendar</Text>
        </TouchableOpacity>

        {/* Navigation Target: Settings (Active Focus Highlight state) */}
        <View style={[styles.tabBarNavButtonCell, { backgroundColor: colors.surfaceLow }]}>
          <SettingsIcon color={colors.primary} size={20} />
          <Text style={[styles.labelCapsIndicator, { fontSize: 11, color: colors.textMain, marginTop: 4, marginBottom: 0, marginLeft: 0, fontWeight: '700' }]}>Settings</Text>
        </View>
      </View>

    </View>
  );
}