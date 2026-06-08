// mobile/styles.ts
import { StyleSheet, Platform } from 'react-native';

// Light mode
export const lightPalette = {
    background: '#f7f9fb',        
    surfaceContainer: '#ffffff',  
    surfaceLow: '#f2f4f6',        
    border: '#eceef0',  
    inputBg: '#f2f4f6',          
    textMain: '#191c1e',          
    textMuted: '#464554',         
    textPlaceholder: '#767586',   
    primary: '#4648d4',           
    completedBg: '#f1f5f9',
};

// Dark mode
export const darkPalette = {
    background: '#0f172a',        
    surfaceContainer: '#1e293b',  
    surfaceLow: '#0f172a',        
    border: '#334155',
    inputBg: '#0f172a',            
    textMain: '#ffffff',          
    textMuted: '#d1d5db',
    textPlaceholder: '#64748b',
    primary: '#4648d4',           
    completedBg: '#1e293b',
};

export const styles = StyleSheet.create({
    outerCanvas: {
        flex: 1,
    },
    mainLayoutContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    brandHeaderSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    brandIconBadge: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    displayWelcomeText: {
        fontFamily: Platform.OS === 'ios' ? 'Hanken Grotesk' : 'sans-serif-condensed',
        fontSize: 32,
        fontWeight: '700',
    },
    bodySubtitleText: {
        fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
        fontSize: 16,
        marginTop: 8,
    },
    formCardBody: {
        borderRadius: 12,
        padding: 24,
        borderWidth: 1,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    inputStackGroup: {
        marginBottom: 16,
    },
    labelCapsIndicator: {
        fontFamily: Platform.OS === 'ios' ? 'JetBrains Mono' : 'monospace',
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 6,
        marginLeft: 4,
    },
    fieldLayoutInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 16,
    },
    fieldInlineIcon: {
        marginRight: 10,
    },
    nativeTextInputField: {
        flex: 1,
        fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
        fontSize: 14,
        paddingVertical: 14,
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
        fontWeight: '500',
    },
    primaryActionButtonSubmit: {
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    headlineButtonTextLabel: {
        fontFamily: Platform.OS === 'ios' ? 'Hanken Grotesk' : 'sans-serif-bold',
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff',
    },
    footerRedirectArea: {
        alignItems: 'center',
        marginTop: 32,
    },
    footerRegularBodyText: {
        fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
        fontSize: 14,
    },
    footerActiveHighlightLink: {
        fontWeight: '600',
    },

    /* ==================== 📋 DASHBOARD ELEMENT STRUCTURAL STYLES ==================== */
    dashboardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'ios' ? 12 : 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    headerTitleBlock: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dashboardTitleText: {
        fontFamily: Platform.OS === 'ios' ? 'Hanken Grotesk' : 'sans-serif-bold',
        fontSize: 22,
        fontWeight: '700',
    },
    dashboardSubtitleText: {
        fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
        fontSize: 13,
        marginTop: 2,
    },
    avatarCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarFallbackText: {
        fontFamily: Platform.OS === 'ios' ? 'JetBrains Mono' : 'monospace',
        fontSize: 12,
        fontWeight: '600',
    },
    listScrollPadding: {
        padding: 24,
    },
    taskItemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
    },
    checkboxTouchTarget: {
        marginRight: 14,
        padding: 2,
    },
    taskTitleLabel: {
        flex: 1,
        fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
        fontSize: 15,
        fontWeight: '500',
        paddingRight: 8,
    },
    taskTextCompletedState: {
        textDecorationLine: 'line-through',
    },
    trashTouchTarget: {
        padding: 8,
    },
    bottomInteractiveFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
    },
    footerTextFieldInput: {
        flex: 1,
        fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        fontSize: 15,
        marginRight: 12,
    },
    squareIconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 48,
        borderRadius: 12,
    },

    /* ==================== 📅 CALENDAR ELEMENT STRUCTURAL STYLES ==================== */
    calendarMonthHeaderRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 16
    },
    calendarChevronGroup: {
        flexDirection: 'row', 
        gap: 6
    },
    calendarSmallNavCircle: {
        width: 36, 
        height: 36, 
        borderRadius: 18, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    calendarWeekDayLabelRow: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginBottom: 12
    },
    calendarWeekDayCellWidth: {
        width: 40,
        textAlign: 'center',
    },
    calendarGridMatrixWrapper: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around', 
        rowGap: 10
    },
    calendarDayTileTouchTarget: {
        width: 40, 
        paddingVertical: 8, 
        alignItems: 'center', 
        borderRadius: 8,
    },
    calendarActiveIndicatorDot: {
        position: 'absolute', 
        bottom: 3, 
        width: 4, 
        height: 4, 
        borderRadius: 2
    },
    calendarContentDividerLine: {
        height: 1, 
        marginVertical: 24
    },
    calendarSectionHeaderRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 16
    },
    calendarBadgeCapsWrapper: {
        paddingHorizontal: 8, 
        paddingVertical: 4, 
        borderRadius: 4
    },
    calendarDashedAddButton: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 16, 
        borderWidth: 1, 
        borderStyle: 'dashed', 
        borderRadius: 12, 
        marginTop: 8
    },
    tabBarFixedContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 12,
        borderTopWidth: 1,
    },
    tabBarNavButtonCell: {
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingVertical: 6, 
        paddingHorizontal: 16, 
        borderRadius: 12
    }
});