// mobile/Calendar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  Animated,
  Dimensions
} from 'react-native';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, ListTodo, Settings, Circle } from 'lucide-react-native';
import { styles } from './styles';

interface CalendarProps {
  colors: any;
  initialDate: Date; 
  onSignOut?: () => void;
  onNavigate: (screen: 'dashboard' | 'calendar' | 'settings') => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Calendar({ colors, initialDate, onSignOut, onNavigate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const fallback = new Date(initialDate);
    fallback.setDate(1);
    return fallback;
  });
  const [selectedDay, setSelectedDay] = useState<number>(initialDate.getDate());

  // Animation values for tracking slide transitions
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const updated = new Date(initialDate);
    updated.setDate(1);
    setCurrentDate(updated);
    setSelectedDay(initialDate.getDate());
  }, [initialDate]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // ─── TIMELINE MATHEMATICS ───
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const totalDaysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const previousMonthDays: number[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    previousMonthDays.push(totalDaysInPrevMonth - firstDayIndex + 1 + i);
  }

  const currentMonthDays = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);

  const totalGridCells = previousMonthDays.length + currentMonthDays.length;
  const nextMonthCellsNeeded = totalGridCells % 7 === 0 ? 0 : 7 - (totalGridCells % 7);
  const nextMonthDays = Array.from({ length: nextMonthCellsNeeded }, (_, i) => i + 1);

  // ─── SLIDE ANIMATION PIPELINE ───
  const animateMonthTransition = (direction: 'next' | 'prev', updateDateCallback: () => void) => {
    // Determine target start positioning based on directional context
    const startOffset = direction === 'next' ? SCREEN_WIDTH * 0.25 : -SCREEN_WIDTH * 0.25;

    // Phase 1: Quickly fade out the grid while setting up the offset path
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -startOffset,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      })
    ]).start(() => {
      // Phase 2: Apply the date update while hidden
      updateDateCallback();

      // Reset the position back to the incoming side vector
      slideAnim.setValue(startOffset);

      // Phase 3: Smoothly slide and fade the incoming grid back to center position
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handlePrevMonth = () => {
    animateMonthTransition('prev', () => {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
      setSelectedDay(1);
    });
  };

  const handleNextMonth = () => {
    animateMonthTransition('next', () => {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
      setSelectedDay(1);
    });
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const daysWithDots = [4, 5, 16];

  const gridCellLayout = {
    flexBasis: '14.28%' as const, 
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 10,
  };  

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
            {monthNames[currentMonth]} {currentYear}
          </Text>
          <View style={styles.calendarChevronGroup}>
            <TouchableOpacity 
              onPress={handlePrevMonth}
              style={[styles.calendarSmallNavCircle, { backgroundColor: colors.surfaceLow }]}
            >
              <ChevronLeft color={colors.textMuted} size={20} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleNextMonth}
              style={[styles.calendarSmallNavCircle, { backgroundColor: colors.surfaceLow }]}
            >
              <ChevronRight color={colors.textMuted} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* DAYS OF WEEK INDICATORS */}
        <View style={[styles.calendarWeekDayLabelRow, { flexDirection: 'row', flexWrap: 'wrap' }]}>
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
            <View key={day} style={gridCellLayout}>
              <Text style={[styles.labelCapsIndicator, { 
                color: colors.textPlaceholder,
                marginLeft: 0,
                marginBottom: 0,
                textAlign: 'center'
              }]}>{day}</Text>
            </View>
          ))}
        </View>

        {/* ANIMATED CALENDAR MONTH GRID TILES CONTAINER */}
        <Animated.View style={[
          styles.calendarGridMatrixWrapper, 
          { 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            width: '100%',
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }]
          }
        ]}>
          
          {/* Out-of-bounds previous month days */}
          {previousMonthDays.map((day, idx) => (
            <View key={`prev-${idx}`} style={[gridCellLayout, { opacity: 0.25 }]}>
              <Text style={{ color: colors.textPlaceholder, fontSize: 14 }}>{day}</Text>
            </View>
          ))}

          {/* Active current month days */}
          {currentMonthDays.map((day) => {
            const isUserSelected = day === selectedDay;
            const currentIsToday = isToday(day);
            const hasDot = daysWithDots.includes(day);

            return (
              <TouchableOpacity 
                key={`curr-${day}`} 
                onPress={() => setSelectedDay(day)}
                style={[gridCellLayout, styles.calendarDayTileTouchTarget, { 
                  backgroundColor: isUserSelected ? colors.primary : 'transparent',
                  borderColor: currentIsToday && !isUserSelected ? colors.primary : 'transparent',
                  borderWidth: currentIsToday ? 1.5 : 0,
                  borderRadius: 8
                }]}
              >
                <Text style={[styles.footerRegularBodyText, { 
                  fontSize: 14, 
                  fontWeight: isUserSelected || currentIsToday ? '700' : '500',
                  color: isUserSelected ? '#ffffff' : currentIsToday ? colors.primary : colors.textMain 
                }]}>
                  {day}
                </Text>
                {hasDot && !isUserSelected && (
                  <View style={[styles.calendarActiveIndicatorDot, { backgroundColor: currentIsToday ? colors.primary : colors.textPlaceholder }]} />
                )}
              </TouchableOpacity>
            );
          })}

          {/* Out-of-bounds future month days */}
          {nextMonthDays.map((day, idx) => (
            <View key={`next-${idx}`} style={[gridCellLayout, { opacity: 0.25 }]}>
              <Text style={{ color: colors.textPlaceholder, fontSize: 14 }}>{day}</Text>
            </View>
          ))}
        </Animated.View>

        {/* SEPARATOR MATRIX BAR */}
        <View style={[styles.calendarContentDividerLine, { backgroundColor: colors.border }]} />

        {/* ─── AGENDA DEADLINES FOR SELECTION ─── */}
        <View style={styles.calendarSectionHeaderRow}>
          <Text style={[styles.dashboardTitleText, { fontSize: 18, color: colors.textMain }]}>
            Deadlines for Selected Date
          </Text>
          <View style={[styles.calendarBadgeCapsWrapper, { backgroundColor: colors.surfaceLow }]}>
            <Text style={[styles.labelCapsIndicator, { color: colors.textMuted, marginBottom: 0, marginLeft: 0 }]}>
              {monthNames[currentMonth].substring(0, 3).toUpperCase()} {selectedDay}
            </Text>
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

      {/* ─── PERSISTENT BOTTOM TAB BAR ─── */}
      <View style={[styles.tabBarFixedContainer, {
        bottom: 0,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
        backgroundColor: colors.background,
        borderTopColor: colors.border
      }]}>
        
        <TouchableOpacity 
          onPress={() => onNavigate('dashboard')}
          style={[styles.tabBarNavButtonCell, { opacity: 0.8 }]}
          activeOpacity={0.7}
        >
          <ListTodo color={colors.textPlaceholder} size={20} />
          <Text style={[styles.labelCapsIndicator, { fontSize: 11, color: colors.textPlaceholder, marginTop: 4, marginBottom: 0, marginLeft: 0 }]}>Tasks</Text>
        </TouchableOpacity>

        <View style={[styles.tabBarNavButtonCell, { backgroundColor: colors.surfaceLow }]}>
          <CalendarIcon color={colors.primary} size={20} />
          <Text style={[styles.labelCapsIndicator, { fontSize: 11, color: colors.textMain, marginTop: 4, marginBottom: 0, marginLeft: 0, fontWeight: '700' }]}>Calendar</Text>
        </View>

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