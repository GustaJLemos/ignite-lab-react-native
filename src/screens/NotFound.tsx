import { Image, Text, VStack } from "native-base";

import BackgroundImg from '@assets/background.png';
import { Button } from "@components/Buttons";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps, AppRoutes } from "@routes/app.routes";
import { AuthNavigatorRoutesProps, AuthRoutes } from "@routes/auth.routes";

export function NotFound() {
  const { user } = useAuth();

  const navigation = useNavigation<any>();

  function handleGoBack() {
    { user.id ? navigation.navigate('homeScreen') : navigation.navigate('signInScreen') }
  }

  return (
    <VStack flex={1} alignItems='center' justifyContent='center' px='4'>
      <Image
        // source ele pressupõe que é flexível, então ele vai levar um pouco mais de tempo pra carregar
        source={BackgroundImg}
        // já o default, a gente fala q essa é a padrão e pronto, então ele vai carregar mais rápido
        // então aq a gente diz, independete de qual iamgem vai vir, esse é o padrão e show, como se ela memorizasse essa imagem como padrão
        defaultSource={BackgroundImg}
        alt='Pessoas treinando'
        resizeMode='contain'
        position='absolute'
      />
      <Text color='gray.100' fontSize='9xl' fontFamily='heading' textAlign='center'>
        404
      </Text>

      <Text color='gray.100' fontSize='xl' fontFamily='heading' textAlign='center' >
        Infelizmente não conseguimos encontrar a página desejada...
      </Text>

      <Button title="Voltar para a página inicial!" onPress={handleGoBack} position='absolute' bottom={10} />
    </VStack>
  );
}