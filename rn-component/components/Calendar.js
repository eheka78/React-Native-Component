import React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars/src/index';

function CalendarForm() {
    return (
        <Calendar
            style={styles.calendar} />
    );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarForm;