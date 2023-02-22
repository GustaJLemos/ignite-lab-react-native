import { Box, Heading, HStack, Icon, Image, Text, VStack, ScrollView, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";

import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionSvg from '@assets/repetitions.svg';
import { Button } from "@components/Buttons";
import { useEffect, useState } from "react";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDto } from "@dtos/ExerciseDto";

type RouteParamsProps = {
  exerciseId: string;
}

export function Exercise() {
  const [exerciseDetails, setExerciseDetails] = useState<ExerciseDto>({} as ExerciseDto);

  const navigation = useNavigation();

  const toast = useToast();

  const route = useRoute();
  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetailsById() {
    try {
      const response = await api.get(`/exercises/${exerciseId}`);

      setExerciseDetails(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchExerciseDetailsById();
  }, [exerciseId])

  return (
    <VStack flex={1}>
      <VStack px={8} bg='gray.600' pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name='arrow-left' color='green.500' size={6}/>
        </TouchableOpacity>

        <HStack justifyContent='space-between' mt={4} mb={8} alignItems='center'>
          {/* flexShrink faz com que quando o texto for muito grande ele quebre para a linha debaixo sem empurrar o icone */}
          <Heading color='gray.100' fontSize='lg' fontFamily='heading' flexShrink={1}>
            {exerciseDetails.name}
          </Heading>

          <HStack alignItems='center'>
            <BodySvg />
            <Text color='gray.200' textTransform='capitalize' ml={1}>
              {exerciseDetails.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          {/* por ser um gif e não uma imagem, ele perde o arredondamento, por isso vamos colocar a box por fora */}
          <Box rounded='lg' mb={3} overflow='hidden'>
            <Image 
              w='full'
              h={80}
              source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetails.demo}` }}
              alt='Imagem do exercício'
              resizeMode="cover"
              rounded='lg'
            />
          </Box>

          {/* box === view do react native */}
          <Box color='gray.600' rounded='md' pb={4} px={4}>
            <HStack alignItems='center' justifyContent='space-around' mb={6} mt={5}>
              <HStack>
                <SeriesSvg />
                <Text color='gray.200' ml={2}>
                  {exerciseDetails.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionSvg />
                <Text color='gray.200' ml={2}>
                  {exerciseDetails.repetitions} repetições
                </Text>
              </HStack>

              <Button 
                title="Marcar como realizado"
              />
            </HStack>
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}