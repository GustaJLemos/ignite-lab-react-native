import { Button } from "@components/Buttons";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, Text, useToast, VStack } from "native-base";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import userDefaultPhoto from '@assets/userPhotoDefault.png';

const PHOTO_SIZE = 33

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  // a gente faz esse nullable pq? pq como falamos q a senha deve ter no mínimo 6, ele n vai passar no form
  // e se eu n quiser atualizar minha senha? isso n passa na validação, então a gente deixa isso, falando tipol
  // esse campo pode ser nulo, se ele n tiver valor, fale q é nulo (ai n cai nessa validação de 6 digitos), e se tiver valor
  // ele é o próprio value dai.
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .nullable().transform((value) => !!value ? value : null),
  confirm_password: yup.string().nullable().transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      // aq estamos fazendo basicamente, se existir valor no password
      // a gente executa o then e esse campo fica required
      is: (Field: any) => Field,
      then: yup.string().nullable().required('Informe a confirmação da senha.')
        .transform((value) => !!value ? value : null)
    }),
})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const { user, updateUserProfile } = useAuth();

  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.nome,
      email: user.email,
    },
    resolver: yupResolver(profileSchema)
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        // prop pra gente restringir que só podemos selecionar imagens
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // qualidade vai de zero a um
        quality: 1,
        // imagem 4 x 4 quadradinha
        aspect: [4, 4],
        // dá a opção por ex para o usuário editar a imagem quando seleciona
        allowsEditing: true,
      });

      if(photoSelected.canceled) return;
      
      if(photoSelected.assets[0]?.uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0]?.uri)

        // a size da foto vem em bytes, precisamos transformar em megaBytes, e para isso, dividimos
        if(photoInfo?.size && (photoInfo?.size / 1024 / 1024) > 3) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 3MB.',
            placement: 'top',
            bgColor: 'red.500'
          }) 
        }
        
        // a uri que vem nesse objeto é onde a foto está sendo salva no dispositivo do usuário
        const fileExtension = photoSelected.assets[0].uri.split('.').pop();

        const photoFile = {
          name: `${user.nome}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        } as any;

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append('avatar', photoFile);

        // adicionamos um novo header para deixar claro para nossa requisição oq aquele cara é
        const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar;

        updateUserProfile(userUpdated);

        toast.show({
          title: 'Foto atualizada!',
          placement: 'top',
          bgColor: 'green.500'
        }) 
      }
    } catch {
      toast.show({
        title: 'Não foi possível selecionar a foto.',
        placement: 'top',
        bgColor: 'red.500'
      }) 
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.nome = data.name;

      await api.put('/users', data);

      await updateUserProfile(userUpdated);

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível atualizar os dados.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil"/>

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton 
            w={PHOTO_SIZE}
            h={PHOTO_SIZE}
            rounded='full'
            startColor='gray.500'
            endColor='gray.400'
          />
          ) : (
            <UserPhoto 
              source={
                user.avatar ? { 
                  uri: `${api.defaults.baseURL}/avatar/${user.avatar}` 
                } : userDefaultPhoto
              }
              alt='Foto do usuário'
              size={PHOTO_SIZE}
            />
          )}
          
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
              Aletar foto
            </Text>
          </TouchableOpacity>

          <Controller 
            control={control}
            name='name'
            render={({ field: {value, onChange} }) => (
              <Input 
                value={value}
                onChangeText={onChange}
                placeholder="Nome"
                errorMessage={errors.name?.message}
                bg='gray.600'
              />
            )}
          />

          <Controller 
            control={control}
            name='email'
            render={({ field: {value, onChange} }) => (
              <Input 
                placeholder='E-mail'
                isDisabled
                value={value}
                onChangeText={onChange}
                bg='gray.600'
              />
            )}
          />

          <Heading color='gray.200' fontSize='md' fontFamily='heading' mb={2} mt={12} alignSelf='flex-start'>
            Alterar senha
          </Heading>

          <Controller 
            control={control}
            name='old_password'
            render={({ field: {value, onChange} }) => (
              <Input 
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
                bg='gray.600'
              />
            )}
          />

          <Controller 
            control={control}
            name='password'
            render={({ field: {value, onChange} }) => (
              <Input 
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                bg='gray.600'
              />
            )}
          />
          
          <Controller 
            control={control}
            name='confirm_password'
            render={({ field: {value, onChange} }) => (
              <Input 
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
                bg='gray.600'
              />
            )}
          />
          
          <Button 
            title='Atualizar'
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}