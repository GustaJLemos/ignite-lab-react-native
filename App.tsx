import { Groups } from '@screens/Groups';
import { ThemeProvider } from 'styled-components'
import theme from '@theme/index'
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { StatusBar } from 'react-native';
import { Loading } from '@components/Loading';

export default function App() {
  const [fonstLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fonstLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  );
}
