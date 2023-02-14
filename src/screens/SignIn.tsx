import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base';

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Buttons';
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';
import { useState } from 'react';

type FormDataProps = {
  email: string;
  password: string;
}

export function SignIn() {
  const { signIn } = useAuth();

  const toast = useToast();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormDataProps>();

  const [ isLoading, setIsLoading ] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNavigateToSignUp() {
    navigation.navigate('signUpScreen')
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    setIsLoading(true)
    try {
      await signIn(email, password)

    } catch (err) {
      const isAppError = err instanceof AppError;
      const title = isAppError ? err.message : 'Não foi possível executar o login. Tente novamente mais tarde!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
      // aq n precisamos desativar o loading, pq se der certo ele vai ser redirecionado
      // para outra rota, ou seja, a stack de rotas públicas desaparece
      setIsLoading(false)
    }
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
          <Heading color='gray.100' fontSize='xl' fontFamily='heading' mb={6}>
            Acesse sua conta
          </Heading>

          <Controller 
            control={control}
            name='email'
            rules={{ required: 'Informe o e-mail.' }}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}         
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name='password'
            rules={{ required: 'Informe a senha.' }}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}    
                value={value}     
                errorMessage={errors.password?.message}  
              />
            )}
          />
          <Button 
            title='Acessar' 
            onPress={handleSubmit(handleSignIn)}
          />
        </Center>

        <Center mt={24}>
          <Text color='gray.100' fontSize='sm' fontFamily='body'>
            Ainda não tem acesso
          </Text>
          <Button 
            title='Criar conta' 
            variant='outline' 
            onPress={handleNavigateToSignUp}
            isLoading={isLoading}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}