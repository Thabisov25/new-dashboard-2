import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [pushEnabled, setPushEnabled] = useState(false);

  // Request notification permission when the app loads
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        // Request permission if the user hasn't made a decision yet
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            setPushEnabled(true);
            console.log('Notification permission granted.');
          } else {
            setPushEnabled(false);
            console.log('Notification permission denied.');
          }
        });
      } else if (Notification.permission === 'granted') {
        setPushEnabled(true);
        console.log('Notifications are already enabled.');
      } else {
        setPushEnabled(false);
        console.log('Notifications are blocked. User must change settings to enable.');
      }
    } else {
      console.log('This browser does not support notifications.');
    }
  }, []);

  // Toggle Push Notifications (on/off)
  const togglePushNotifications = (isEnabled) => {
    setPushEnabled(isEnabled);
    if (isEnabled) {
      console.log('Push notifications enabled.');
      // Add logic to subscribe to push notifications here
    } else {
      console.log('Push notifications disabled.');
      // Add logic to unsubscribe from push notifications here
    }
  };

  // Function to send notifications
  const sendNotification = (title, body) => {
    if (pushEnabled && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body: body,
          icon: '/logo.png',  // Use your app logo or any relevant icon
        });
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    } else {
      console.log('Push notifications are not enabled.');
    }
  };

  return (
    <NotificationContext.Provider value={{ pushEnabled, togglePushNotifications, sendNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
