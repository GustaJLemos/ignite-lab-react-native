import { Button } from "@components/Buttons";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, Text, useToast, VStack } from "native-base";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/gustajlemos.png');

  const toast = useToast();

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
        setUserPhoto(photoSelected.assets[0].uri)
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
              source={{ uri: userPhoto }}
              alt='Foto do usuário'
              size={PHOTO_SIZE}
            />
          )}
          
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
              Aletar foto
            </Text>
          </TouchableOpacity>

          <Input 
            placeholder="Nome"
            bg='gray.600'
          />
          <Input 
            value="gustavolemosmendes@gmail.com"
            isDisabled
            bg='gray.600'
          />
        
          <Heading color='gray.200' fontSize='md' fontFamily='heading' mb={2} mt={12} alignSelf='flex-start'>
            Alterar senha
          </Heading>

          <Input 
            placeholder="Senha antiga"
            secureTextEntry
            bg='gray.600'
          />
          <Input 
            placeholder="Nova senha"
            secureTextEntry
            bg='gray.600'
          />
          <Input 
            placeholder="Confirme a nova senha"
            secureTextEntry
            bg='gray.600'
          />

          <Button 
            title='Atualizar'
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}