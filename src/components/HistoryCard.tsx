import { HistoryDto } from "@dtos/HistoryDto";
import { Heading, HStack, Text, VStack } from "native-base";

type Props = {
  exercise: HistoryDto
}

export function HistoryCard({ exercise }: Props) {
  return (
    <HStack w='full' bg='gray.600' rounded='md' alignItems='center' justifyContent='space-between' px={5} py={4} mb={3}>
      <VStack mr={5} flex={1}>
        {/* capitalize mande a primeira letra maiúscula */}
        <Heading color='white' fontSize='sm' fontFamily='heading' textTransform='capitalize' numberOfLines={1}>
          {exercise.group}
        </Heading>
        
        <Text color='gray.100' fontSize='lg' numberOfLines={1}>
          {exercise.name}
        </Text>
      </VStack>

      <Text color='gray.300' fontSize='md'>
        {exercise.hour}
      </Text>
    </HStack>
  )
}