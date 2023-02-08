import { useAuth } from '@hooks/useAuth';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Box, useTheme } from 'native-base';
import { useContext } from 'react';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const nativeBaseTheme = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = nativeBaseTheme.colors.gray[700];

  const user = useAuth();

  return (
    // esse box a gente deixa, pra nossa rota sempre ocupar tudo, e em transições, caso de algum glitch ele não apareça uma tela em branco
    <Box flex={1} bg='gray.700'>
      {/* conseguimos editar o tema (por ex cor do background) através desse cara aqui */}
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}