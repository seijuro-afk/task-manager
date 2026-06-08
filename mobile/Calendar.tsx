// mobile/Calendar.tsx
import React from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, ListTodo, Settings, Circle } from 'lucide-react-native';
import { styles } from './styles';

interface CalendarProps {
  colors: any;
  onSignOut?: () => void;
  onNavigate: (screen: 'dashboard' | 'calendar' | 'settings') => void;
}

export default function Calendar({ colors, onSignOut, onNavigate }: CalendarProps) {
  // Calendar Matrix Simulation Data
  const previousMonthDays = [24, 25, 26, 27, 28, 29, 30];
  const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const nextMonthDays = [1, 2, 3, 4];
  
  // Simulated day dot indicator flags
  const daysWithDots = [4, 5, 16];
  const activeDay = 14;

  return (
    <View style={[styles.outerCanvas, { backgroundColor: colors.background }]}>
      
      {/* ─── TOP APP BAR ─── */}
      <View style={[styles.dashboardHeader, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <View style={styles.headerTitleBlock}>
          <CalendarIcon color={colors.primary} size={24} style={{ marginRight: 10 }} />
          <View>
            <Text style={[styles.dashboardTitleText, { color: colors.textMain }]}>Calendar</Text>
            <Text style={[styles.dashboardSubtitleText, { color: colors.textMuted }]}>Track dates & workflow metrics</Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={onSignOut} 
          style={[styles.avatarCircle, { backgroundColor: colors.surfaceLow }]}
        >
          <Text style={[styles.avatarFallbackText, { color: colors.textMuted }]}>Dev</Text>
        </TouchableOpacity>
      </View>

      {/* ─── MAIN SCROLLABLE AGENDA CANVAS ─── */}
      <ScrollView 
        contentContainerStyle={[styles.listScrollPadding, { paddingBottom: 160 }]}
        showsVerticalScrollIndicator={false}
      >
        
        {/* MONTH CONTROLLER HEADER */}
        <View style={styles.calendarMonthHeaderRow}>
          <Text style={[styles.displayWelcomeText, { fontSize: 22, color: colors.textMain }]}>
            October 2023
          </Text>
          <View style={styles.calendarChevronGroup}>
            <TouchableOpacity style={[styles.calendarSmallNavCircle, { backgroundColor: colors.surfaceLow }]}>
              <ChevronLeft color={colors.textMuted} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calendarSmallNavCircle, { backgroundColor: colors.surfaceLow }]}>
              <ChevronRight color={colors.textMuted} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* DAYS OF WEEK INDICATORS */}
        <View style={styles.calendarWeekDayLabelRow}>
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
            <Text key={day} style={[styles.labelCapsIndicator, styles.calendarWeekDayCellWidth, { 
              color: colors.textPlaceholder,
              marginLeft: 0,
              marginBottom: 0
            }]}>{day}</Text>
          ))}
        </View>

        {/* CALENDAR MONTH GRID TILES */}
        <View style={styles.calendarGridMatrixWrapper}>
          
          {/* Out-of-bounds previous month days */}
          {previousMonthDays.map((day, idx) => (
            <View key={`prev-${idx}`} style={[styles.calendarWeekDayCellWidth, { paddingVertical: 8, alignItems: 'center', opacity: 0.3 }]}>
              <Text style={{ color: colors.textPlaceholder, fontSize: 14 }}>{day}</Text>
            </View>
          ))}

          {/* Active current month days */}
          {currentMonthDays.map((day) => {
            const isActive = day === activeDay;
            const hasDot = daysWithDots.includes(day);

            return (
              <TouchableOpacity 
                key={`curr-${day}`} 
                style={[styles.calendarDayTileTouchTarget, { 
                  backgroundColor: isActive ? colors.primary : 'transparent'
                }]}
              >
                <Text style={[styles.footerRegularBodyText, { 
                  fontSize: 14, 
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#ffffff' : colors.textMain 
                }]}>
                  {day}
                </Text>
                {hasDot && !isActive && (
                  <View style={[styles.calendarActiveIndicatorDot, { backgroundColor: colors.textPlaceholder }]} />
                )}
              </TouchableOpacity>
            );
          })}

          {/* Out-of-bounds future month days */}
          {nextMonthDays.map((day, idx) => (
            <View key={`next-${idx}`} style={[styles.calendarWeekDayCellWidth, { paddingVertical: 8, alignItems: 'center', opacity: 0.3 }]}>
              <Text style={{ color: colors.textPlaceholder, fontSize: 14 }}>{day}</Text>
            </View>
          ))}
        </View>

        {/* SEPARATOR MATRIX BAR */}
        <View style={[styles.calendarContentDividerLine, { backgroundColor: colors.border }]} />

        {/* ─── AGENDA DEADLINES FOR TODAY ─── */}
        <View style={styles.calendarSectionHeaderRow}>
          <Text style={[styles.dashboardTitleText, { fontSize: 18, color: colors.textMain }]}>
            Deadlines for Today
          </Text>
          <View style={[styles.calendarBadgeCapsWrapper, { backgroundColor: colors.surfaceLow }]}>
            <Text style={[styles.labelCapsIndicator, { color: colors.textMuted, marginBottom: 0, marginLeft: 0 }]}>OCT 14</Text>
          </View>
        </View>

        {/* Task Card Objective 1 */}
        <View style={[styles.taskItemCard, { backgroundColor: colors.surfaceContainer, borderColor: colors.border }]}>
          <Circle color={colors.primary} size={20} style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.taskTitleLabel, { color: colors.textMain }]}>Finalize API Documentation</Text>
            <Text style={[styles.dashboardSubtitleText, { color: colors.textMuted, marginTop: 2 }]}>Include OAuth2 flow examples</Text>
          </View>
          <View style={[styles.calendarBadgeCapsWrapper, { backgroundColor: colors.completedBg }]}>
            <Text style={[styles.labelCapsIndicator, { fontSize: 11, fontWeight: '600', color: colors.primary, marginBottom: 0, marginLeft: 0 }]}>2:00 PM</Text>
          </View>
        </View>

        {/* Task Card Objective 2 */}
        <View style={[styles.taskItemCard, { backgroundColor: colors.surfaceContainer, borderColor: colors.border }]}>
          <Circle color={colors.primary} size={20} style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.taskTitleLabel, { color: colors.textMain }]}>Review Q3 Analytics Report</Text>
          </View>
          <View style={[styles.calendarBadgeCapsWrapper, { backgroundColor: colors.surfaceLow }]}>
            <Text style={[styles.labelCapsIndicator, { fontSize: 11, fontWeight: '600', color: colors.textPlaceholder, marginBottom: 0, marginLeft: 0 }]}>4:30 PM</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={[styles.calendarDashedAddButton, { borderColor: colors.border }]}>
          <Plus color={colors.textMuted} size={18} style={{ marginRight: 8 }} />
          <Text style={[styles.labelCapsIndicator, { color: colors.textMuted, marginBottom: 0, marginLeft: 0 }]}>ADD TASK</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ─── PERSISTENT UNRESPONSIVE BOTTOM TAB BAR ─── */}
      <View style={[styles.tabBarFixedContainer, {
        bottom: 0,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
        backgroundColor: colors.background,
        borderTopColor: colors.border
      }]}>
        
        {/* CHANGED: View became TouchableOpacity with an onPress navigation target */}
        <TouchableOpacity 
          onPress={() => onNavigate('dashboard')}
          style={[styles.tabBarNavButtonCell, { opacity: 0.8 }]}
          activeOpacity={0.7}
        >
          <ListTodo color={colors.textPlaceholder} size={20} />
          <Text style={[styles.labelCapsIndicator, { fontSize: 11, color: colors.textPlaceholder, marginTop: 4, marginBottom: 0, marginLeft: 0 }]}>Tasks</Text>
        </TouchableOpacity>

        {/* Calendar Tab Link (Remains static active state wrapper since we are on Calendar) */}
        <View style={[styles.tabBarNavButtonCell, { backgroundColor: colors.surfaceLow }]}>
          <CalendarIcon color={colors.primary} size={20} />
          <Text style={[styles.labelCapsIndicator, { fontSize: 11, color: colors.textMain, marginTop: 4, marginBottom: 0, marginLeft: 0, fontWeight: '700' }]}>Calendar</Text>
        </View>

        {/* Settings Tab Link (Muted structural placeholder) */}
        {/* Navigation Destination: Settings (Now Interactive) */}
        <TouchableOpacity 
        onPress={() => onNavigate('settings')}
        style={styles.tabBarNavButtonCell}
        activeOpacity={0.7}
        >
            <Settings color={colors.textPlaceholder} size={20} />
            <Text style={[styles.labelCapsIndicator, { fontSize: 11, color: colors.textPlaceholder, marginTop: 4, marginBottom: 0, marginLeft: 0 }]}>
                Settings
            </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}