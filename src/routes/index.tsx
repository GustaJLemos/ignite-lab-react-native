import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { Notification } from '../components/Notification';

export function Routes() {
  const { colors } = useTheme();

  // OSNotification = tipagem do evento como um todo da notificação
  const [notification, setNotification] = useState<OSNotification>({} as OSNotification);

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    // mensagem chegou quando o app está em primeiro plano
    const unsubscribe = OneSignal
      .setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
        console.log('Recebendo a notificação em primeiro plano: ', notificationReceivedEvent);
        // método q devolve o conteúdo da notificação
        const notificationReceived = notificationReceivedEvent.getNotification();

        setNotification(notificationReceived);
      })

    return () => unsubscribe;
  }, [])

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
      {notification?.title && (
        <Notification
          notification={notification}
          onClose={() => setNotification({} as OSNotification)}
        />
      )}
    </NavigationContainer>
  );
}