import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { ExerciseDto } from "@dtos/ExerciseDto";
import { api } from "@services/api";

type Props = TouchableOpacityProps & {
  data: ExerciseDto;
}

export function ExerciseCard({ data, ...rest }: Props) {

  return (
    <TouchableOpacity {...rest}>
      <HStack bg='gray.500' alignItems='center' p={2} pr={4} rounded='md' mb={3}>
        <Image 
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
          alt='Imagem do exercício selecionado'
          resizeMode="cover"
          w={16}
          h={16}
          mr={4}
          rounded='md'
        />

        <VStack flex={1}>
          <Heading color='white' fontSize='lg' fontFamily='heading'>
            {data.name}
          </Heading>

          <Text color='gray.200' fontSize='sm' numberOfLines={2} mt={1}>
            {data.series} éries x {data.repetitions} repetições 
          </Text>
        </VStack>

        <Icon 
          as={Entypo}
          name='chevron-thin-right'
          color='gray.300'
        />
      </HStack>
    </TouchableOpacity>
  )
}