import { Loading } from '@components/Loading';
import { useAuth } from '@hooks/useAuth';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Box, useTheme } from 'native-base';
import { useContext } from 'react';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

// TODO Deep Links tanto para o fluxo autenticado quanto o não autenticado.

const linking = {
  prefixes: ['com.gusta.igniteGym://', 'igniteGym://'],
  config: {
    screens: {
      SignUpScreen: 'signUpScreen',
      HomeScreen: 'homeScreen',
      ExerciseScreen: {
        path: 'exerciseScreen/:exerciseId',
        parse: {
          exerciseId: (exerciseId: string) => exerciseId
        }
      },
      HistoryScreen: 'historyScreen',
      ProfileScreen: 'profileScreen',
      NotFoundScreen: '*'
    }
  }
}

// TODO, preciso fazer várias validações para checar se é um cara logado e os carai... para dai levr ele para o app

export function Routes() {
  const nativeBaseTheme = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = nativeBaseTheme.colors.gray[700];

  const { user, isLoadingStorageData } = useAuth();

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