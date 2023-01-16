import { Button } from "@components/Buttons";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(true);
  const [userPhoto, setUserPhoto] = useState('https://github.com/gustajlemos.png');

  async function handleUserPhotoSelect() {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // qualidade vai de zero a um
      quality: 1,
      // imagem 4 x 4 quadradinha
      aspect: [4, 4],
      // dá a opção por ex para o usuário editar a imagem quando seleciona
      allowsEditing: true,
    });

    if(photoSelected.canceled) return;
    
    // a uri que vem nesse objeto é onde a foto está sendo salva no dispositivo do usuário
    setUserPhoto(photoSelected.assets[0].uri)
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
        
          <Heading color='gray.200' fontSize='md' mb={2} mt={12} alignSelf='flex-start'>
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