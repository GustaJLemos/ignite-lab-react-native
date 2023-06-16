import { Loading } from '@components/Loading';
import { useAuth } from '@hooks/useAuth';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Box, useTheme } from 'native-base';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import OneSignal from 'react-native-onesignal';

// TODO quando usuário está logado, n posso usar deepLinking para as telas do usuários deslogado... e vice e versa.
const linking = {
  prefixes: ['com.gusta.igniteGym://', 'igniteGym://'],
  config: {
    screens: {
      signInScreen: 'signInScreen',
      signUpScreen: 'signUpScreen',
      homeScreen: 'homeScreen',
      exerciseScreen: {
        path: 'exerciseScreen/:exerciseId',
        parse: {
          exerciseId: (exerciseId: string) => exerciseId
        }
      },
      historyScreen: 'historyScreen',
      profileScreen: 'profileScreen',
      notFoundScreen: '*'
    }
  }
}

export function Routes() {
  const nativeBaseTheme = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = nativeBaseTheme.colors.gray[700];

  const { user, isLoadingStorageData } = useAuth();

  // TODO terminar essas funções, e criar componente de notificação
  OneSignal.promptForPushNotificationsWithUserResponse((notification) => {
    console.log('promptForPushNotificationsWithUserResponse', notification)
  })

  OneSignal.setNotificationWillShowInForegroundHandler((notification) => {
    console.log('setNotificationWillShowInForegroundHandler', notification)
  })

  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log('setNotificationOpenedHandler', notification)
  })

  if (isLoadingStorageData) {
    return (
      <Loading />
    )
  }

  return (
    // esse box a gente deixa, pra nossa rota sempre ocupar tudo, e em transições, caso de algum glitch ele não apareça uma tela em branco
    <Box flex={1} bg='gray.700'>
      {/* conseguimos editar o tema (por ex cor do background) através desse cara aqui */}
      <NavigationContainer theme={theme} linking={linking}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}