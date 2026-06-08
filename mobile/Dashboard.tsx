    // mobile/Dashboard.tsx
    import React, { useState } from 'react';
    import { 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    FlatList,
    KeyboardAvoidingView,
    Platform 
    } from 'react-native';
    import { ListTodo, Trash2, Plus, CheckCircle2, Circle, Calendar, Settings } from 'lucide-react-native';
    import { styles } from './styles';

    interface DashboardProps {
    colors: any;
    onSignOut: () => void;
    onNavigate: (screen: 'dashboard' | 'calendar' | 'settings') => void; // Add this line
    }

    interface Task {
    id: string;
    title: string;
    status: 'IN PROGRESS' | 'PLANNING' | 'COMPLETED';
    }

    export default function Dashboard({ colors, onSignOut, onNavigate }: DashboardProps) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', title: 'Review system architecture', status: 'IN PROGRESS' },
        { id: '2', title: 'Draft Q3 OKRs', status: 'PLANNING' },
        { id: '3', title: 'Push code to production', status: 'COMPLETED' },
    ]);

    const handleAddTask = () => {
        if (!newTaskTitle.trim()) return;
        setTasks([
        ...tasks, 
        { id: Date.now().toString(), title: newTaskTitle, status: 'IN PROGRESS' }
        ]);
        setNewTaskTitle('');
    };

    const handleToggleTask = (id: string) => {
        setTasks(prevTasks => prevTasks.map(task => {
        if (task.id === id) {
            return { 
            ...task, 
            status: task.status === 'COMPLETED' ? 'IN PROGRESS' : 'COMPLETED' 
            };
        }
        return task;
        }));
    };

    const handleDeleteTask = (id: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    return (
        <View style={[styles.outerCanvas, { backgroundColor: colors.background }]}>
        
        {/* ─── TOP APP BAR FROM JSON ─── */}
        <View style={[styles.dashboardHeader, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
            <View style={styles.headerTitleBlock}>
            <ListTodo color={colors.primary} size={24} style={{ marginRight: 10 }} />
            <View>
                <Text style={[styles.dashboardTitleText, { color: colors.textMain }]}>Task Manager</Text>
                <Text style={[styles.dashboardSubtitleText, { color: colors.textMuted }]}>Stay focused, build fast</Text>
            </View>
            </View>

            <TouchableOpacity 
            onPress={onSignOut} 
            style={[styles.avatarCircle, { backgroundColor: colors.surfaceLow }]}
            >
            <Text style={[styles.avatarFallbackText, { color: colors.textMuted }]}>Dev</Text>
            </TouchableOpacity>
        </View>

        {/* ─── MAIN TASKS LIST AREA ─── */}
        <View style={{ flex: 1 }}>
            <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            // Extra bottom padding so items can be scrolled entirely clear of both the input bar and bottom tab bar
            contentContainerStyle={[styles.listScrollPadding, { paddingBottom: 160 }]}
            renderItem={({ item }) => {
                const isCompleted = item.status === 'COMPLETED';
                return (
                <View style={[
                    styles.taskItemCard, 
                    { 
                    backgroundColor: isCompleted ? colors.completedBg : colors.surfaceContainer, 
                    borderColor: colors.border 
                    }
                ]}>
                    {/* Status Checkbox Interactive Ring */}
                    <TouchableOpacity 
                    onPress={() => handleToggleTask(item.id)}
                    style={styles.checkboxTouchTarget}
                    >
                    {isCompleted ? (
                        <CheckCircle2 color="#22c55e" size={22} />
                    ) : (
                        <Circle color={colors.textPlaceholder} size={22} />
                    )}
                    </TouchableOpacity>
                    
                    {/* Task Content Layout Column */}
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={[
                        styles.taskTitleLabel, 
                        { color: isCompleted ? colors.textPlaceholder : colors.textMain },
                        isCompleted && styles.taskTextCompletedState
                    ]}>
                        {item.title}
                    </Text>

                    {/* Context State Badges */}
                    {!isCompleted && (
                        <View style={{
                        alignSelf: 'flex-start',
                        marginTop: 6,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 4,
                        backgroundColor: colors.surfaceLow
                        }}>
                        <Text style={{
                            fontFamily: Platform.OS === 'ios' ? 'JetBrains Mono' : 'monospace',
                            fontSize: 10,
                            fontWeight: '600',
                            color: colors.textMuted,
                            letterSpacing: 0.5
                        }}>
                            {item.status}
                        </Text>
                        </View>
                    )}
                    </View>

                    {/* Task Elimination Hook */}
                    <TouchableOpacity 
                    onPress={() => handleDeleteTask(item.id)} 
                    style={styles.trashTouchTarget}
                    >
                    <Trash2 color={isCompleted ? colors.textPlaceholder : '#ef4444'} size={18} />
                    </TouchableOpacity>
                </View>
                );
            }}
            />

            {/* ─── STICKY INPUT FOOTER (RAISED ABOVE TAB BAR) ─── */}
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 0}
            style={[
                styles.bottomInteractiveFooter, 
                { 
                position: 'absolute', 
                bottom: 100, // Positioned right above the 64dp bottom navigation dock
                left: 0, 
                right: 0, 
                backgroundColor: colors.background, 
                borderTopColor: colors.border 
                }
            ]}
            >
            <TextInput
                style={[
                styles.footerTextFieldInput, 
                { 
                    backgroundColor: colors.inputBg, 
                    color: colors.textMain, 
                    borderColor: colors.border,
                    borderWidth: 1 
                }
                ]}
                placeholder="Add a new task workflow..."
                placeholderTextColor={colors.textPlaceholder}
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
            />
            <TouchableOpacity 
                style={[styles.squareIconButton, { backgroundColor: colors.primary }]} 
                onPress={handleAddTask}
            >
                <Plus color="#ffffff" size={22} />
            </TouchableOpacity>
            </KeyboardAvoidingView>

            {/* ─── BOTTOM TAB BAR ─── */}
            <View style={[styles.tabBarFixedContainer, {
            bottom: 0,
            paddingBottom: Platform.OS === 'ios' ? 24 : 12,
            backgroundColor: colors.background,
            borderTopColor: colors.border
        }]}>
            
            {/* Tasks Tab Button (Active Layout Cell) */}
            <View style={[styles.tabBarNavButtonCell, { backgroundColor: colors.surfaceLow }]}>
            <ListTodo color={colors.primary} size={20} />
            <Text style={[styles.labelCapsIndicator, { fontSize: 11, color: colors.textMain, marginTop: 4, marginBottom: 0, marginLeft: 0, fontWeight: '700' }]}>Tasks</Text>
            </View>

            {/* Calendar Tab Button (Converted from View to TouchableOpacity) */}
            <TouchableOpacity 
            onPress={() => onNavigate('calendar')} // Navigates to Calendar view on press
            style={[styles.tabBarNavButtonCell, { opacity: 0.8 }]}
            activeOpacity={0.7}
            >
            <Calendar color={colors.textPlaceholder} size={20} />
            <Text style={[styles.labelCapsIndicator, { fontSize: 11, color: colors.textPlaceholder, marginTop: 4, marginBottom: 0, marginLeft: 0 }]}>Calendar</Text>
            </TouchableOpacity>

            {/* Settings Tab Button (Remains Unresponsive Placeholder) */}
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
        </View>
    );
    }