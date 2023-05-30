import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';

import OneSignal from 'react-native-onesignal';
import Constants from "expo-constants";
import { tagUserEmailCreate } from './src/notifications/notificationTags';

OneSignal.setAppId('1b9bd6fc-d99b-4ea6-a098-98289e2480a6');

// Podemos usar o email do usuário como uma segmentação, e a partir disso enviar push notifications para ele
OneSignal.setEmail('gustavolemosmendes1@gmail.com');

// Server para "habilitar" as permissões de notificações no ios, n é exatamente pedir as permissões para 
// o usuário, mas sim faz com que o ios "entenda" q existem notificações
OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserEmailCreate('gustavolemosmendes1@gmail.com');

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