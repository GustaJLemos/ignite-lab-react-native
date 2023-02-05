import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base';

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Buttons';
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookForm/resolvers/yup';
import { api } from '@services/api';
import axios from 'axios';
import { Alert } from 'react-native';
import { AppError } from '@utils/AppError';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const DEFAULT_VALUES = {
  name: 'Gustavo',
  email: 'gustavo@gmail.com',
  password: '1q2w3E*',
  passwordConfirm: '1q2w3E*'
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve conter pelo menos 6 caracteres.'),
  passwordConfirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password'), null], 'As senhas não conferem.'),
})

export function SignUp() {
  const toast = useToast();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });
    // {
    //   defaultValues: {
    //     name: 'Gustavo',
    //     email: 'gustavo@gmail.com',
    //     password: '1q2w3E*',
    //     passwordConfirm: '1q2w3E*'
    //   }
    // }

  const navigation = useNavigation();

  function handleNavigateToSignIn() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    // podemos usar o fetch para nos comunicarmos com a api
    // const response = await fetch('http://192.168.15.1:3333/users', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name, email, password
    //   })
    // })

    // com o axios n precisamos tranformar a resposta, ou seja, a resposta ela já vem convertida em json,
    // const data = await response.json();

    // podemos pegar erros, e respontas através do axios de duas formas
    // api.post('/users', {
    //   name, email, password
    // }).then((res) => console.log(res))
    // .catch((err) => console.log(err))


    try {
      const response = await api.post('/users', {
        name, email, password
      })
  
      console.log(response.data)
  
      // resetando o valor do form
      reset(DEFAULT_VALUES)
    } catch(err) {
      // aq estamos verificando, se é um erro que veio do back end, que foi pego pelo axios, se for um erro 
      // que veio por uma lógica errada do try por ex, ele não entra nesse if
      // if(axios.isAxiosError(err)) {
      //   if(err.response?.data?.message) {
      //     Alert.alert('Estamos com problemas...', `${err.response?.data?.message}`)
      //   }
      // }

      const isAppError = err instanceof AppError;
      const title = isAppError ? err.message : 'Não foi possível criar a conta. Tente novamente mais tarde!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg='gray.700' px={10}>
        <Image 
          source={BackgroundImg}
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
            Crie sua conta
          </Heading>

          <Controller 
            control={control}
            name='name'
            // podemos fazer validação dessa forma, ou com o yup
            // rules={{
            //   required: 'Informe o nome.'
            // }}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='Nome'
                onChangeText={onChange}   
                value={value} 
                errorMessage={errors.name?.message}  
              />
            )}
          /> 

          <Controller 
            control={control}
            name='email'
            // rules={{
            //   required: 'Informe o e-mail.',
            //   pattern: {
            //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //     message: 'E-mail inválido' 
            //   }
            // }}
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

          <Controller 
            control={control}
            name='passwordConfirm'
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='Confirme a senha'
                secureTextEntry
                onChangeText={onChange}   
                value={value}  
                onSubmitEditing={handleSubmit(handleSignUp)}       
                returnKeyType='send'
                errorMessage={errors.passwordConfirm?.message}  
              />
            )}
          />
          <Button title='Criar e acessar' onPress={handleSubmit(handleSignUp)}/>
        </Center>

        <Button 
          title='Voltar para o login' 
          variant='outline' 
          onPress={handleNavigateToSignIn} 
          mt={12}
        />
      </VStack>
    </ScrollView>
  );
}