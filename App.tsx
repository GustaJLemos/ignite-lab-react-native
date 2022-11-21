import { ThemeProvider } from 'styled-components/native'
import theme from '@theme/index'
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { StatusBar } from 'react-native';
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';

export default function App() {
  const [fonstLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
        {fonstLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
