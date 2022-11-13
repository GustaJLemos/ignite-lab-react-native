import { Groups } from '@screens/Groups';
import { ThemeProvider } from 'styled-components'
import theme from '@theme/index'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { ActivityIndicator, StatusBar } from 'react-native';

export default function App() {
  const [fonstLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fonstLoaded ? <Groups /> : <ActivityIndicator />}
    </ThemeProvider>
  );
}
