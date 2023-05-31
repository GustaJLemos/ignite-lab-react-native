import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';

import OneSignal from 'react-native-onesignal';
import { tagUserEmailCreate } from './src/notifications/notificationTags';
import { useEffect } from 'react';

OneSignal.setAppId('1b9bd6fc-d99b-4ea6-a098-98289e2480a6');

// Podemos usar o email do usuário como uma segmentação, e a partir disso enviar push notifications para ele
OneSignal.setEmail('gustavolemosmendes1@gmail.com');

// Serve para "habilitar" as permissões de notificações no ios, n é exatamente pedir as permissões para 
// o usuário, mas sim faz com que o ios "entenda" q existem notificações
OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserEmailCreate('gustavolemosmendes1@gmail.com');

  useEffect(() => {
    // Dessa forma identificamos quando o usuário clicou na notificação com o app em segundo plano
    const unsubscribed = OneSignal.setNotificationOpenedHandler((response) => {
      // dentro das ações tenho meu actionId e é esse cara q eu vou usar para "filtar" qual ação eu vou fazer
      console.log('Notificação aberta em segundo plano!', response)

      const { actionId } = response.action as any;

      switch (actionId) {
        case '1':
          console.log('Ver todas')
          break;
        case '2':
          console.log('Ver pedido')
          break;
        default:
          console.log('Não foi clicado em nenhum botão de ação')
          break;
      }
    });

    return () => unsubscribed;
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}