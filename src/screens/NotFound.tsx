import { ScreenHeader } from "@components/ScreenHeader";
import { Text, VStack } from "native-base";

export function NotFound() {
  return (
    <VStack flex={1}>
      <Text color='gray.100' fontSize='xl' fontFamily='heading'>
        Rota não encontrada.

        COLOCAR IMAGEM DE 404 Q AGR EU N TO ACHANDO ESSA PORRA
      </Text>
    </VStack>
  );
}