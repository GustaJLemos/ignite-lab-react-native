import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryByDayDto } from "@dtos/HistoryByDayDto";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { getDistanceOfDates } from "@utils/Date";
import { Heading, VStack, SectionList, Text, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";
import OneSignal from "react-native-onesignal";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDto[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get<HistoryByDayDto[]>('/history');

      // TODO testar tudo essas parada aq
      // ver se o titulo ou o created at
      const distance = getDistanceOfDates(response.data[response.data.length - 1].title);

      console.log('distance', distance)
      if (distance > '1') {
        console.log('mande a notificação para o usuário falando quanto tempo ele n faz exercícios')
        // OneSignal.sendTag('dias_sem_exercicio', distance)
      }

      // TODO verificar se for final de semana, eu mando a notificação
      const finalDeSemana = true;
      if (finalDeSemana) {
        // OneSignal.sendTag('exercicios_feitos', response.data.map((item) => item.data.length))
      }

      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar o histórico de exercícios';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory();
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico de Exercícios' />
      {isLoading ? <Loading /> :
        <SectionList
          sections={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoryCard
              key={item.id}
              exercise={item}
            />
          )}
          renderSectionHeader={({ section }) => (
            <Heading color='gray.200' fontSize='md' fontFamily='heading' mt={10} mb={3}>
              {section.title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
          ListEmptyComponent={() => (
            <Text color='gray.100' textAlign='center'>
              Não há exercícios registrados ainda.{'\n'}
              Vamos treinar hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      }
    </VStack>
  );
}