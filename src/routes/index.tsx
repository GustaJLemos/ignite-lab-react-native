import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { Notification } from '../components/Notification';


const linking = {
  // Quais são os schemes que a nossa aplicação vai reconhecer, é possível ver com o comando npx uri-scheme list
  prefixes: ['igniteshoesapp://', 'com.gusta.igniteshoesapp://'],
  config: {
    screens: {
      details: {
        // path: qual o endereço que a minha push notification vai chamar
        path: 'details/:productId',
        // no parse eu consigo recuperar meu parâmetro e dizer o tipo dele
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();

  // OSNotification = tipagem do evento como um todo da notificação
  const [notification, setNotification] = useState<OSNotification>({} as OSNotification);

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  // aq estamos montando a nossa url de redirecionamento
  // Esse linking monta certinho a nossa url: igniteshoes://details/7
  // igniteshoes:// scheme q assiona o nosso app
  // details/7 dentro do app estamos chamando a rota de details e passando o id

  // IMPORTANTE: esse Linking n precisa utilizar, somente foi uma forma de "demonstrar" como a url seria construída
  // const deepLinking = Linking.createURL('details', {
  //   queryParams: {
  //     productId: '7'
  //   }
  // })

  // console.log('deepLinking', deepLinking)

  // pra usar isso junto com as notificações, basta simplesmente mandar a notificação, com o link q deseja.
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
    <NavigationContainer theme={theme} linking={linking}>
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