// LeadsReminders.js
import React, { useEffect } from 'react';
import { displayNotification } from './Notifications';

function LeadsReminders({ reminders }) {
  useEffect(() => {
    reminders.forEach(reminder => {
      if (new Date(reminder.followUpDateTime) <= new Date()) {
        displayNotification(`Upcoming follow-up: ${reminder.leadName}`);
      }
    });
  }, [reminders]);

  return null;
}

export default LeadsReminders;
