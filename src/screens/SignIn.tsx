import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Buttons';
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNavigateToSignUp() {
    navigation.navigate('signUpScreen')
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg='gray.700' px={10}>
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

        <Center my={24}>
          <LogoSvg />
          <Text color='gray.100' fontSize='sm'>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
            Acesse sua conta
          </Heading>

          <Input 
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <Input 
            placeholder='Senha'
            secureTextEntry
          />
          <Button title='Acessar'/>
        </Center>

        <Center mt={24}>
          <Text color='gray.100' fontSize='sm' fontFamily='body'>
            Ainda não tem acesso
          </Text>
          <Button 
            title='Criar conta' 
            variant='outline' 
            onPress={handleNavigateToSignUp}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}