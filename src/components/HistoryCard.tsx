import { Heading, HStack, Text, VStack } from "native-base";

export function HistoryCard() {
  return (
    <HStack w='full' bg='gray.600' rounded='md' alignItems='center' justifyContent='space-between' px={5} py={4} mb={3}>
      <VStack mr={5}>
        {/* capitalize mande a primeira letra maiúscula */}
        <Heading color='white' fontSize='sm' textTransform='capitalize'>
          Costas
        </Heading>
        <Text color='gray.100' fontSize='lg' numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>

      <Text color='gray.300' fontSize='md'>
        08:46
      </Text>
    </HStack>
  )
}