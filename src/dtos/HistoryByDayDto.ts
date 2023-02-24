import { HistoryDto } from "./HistoryDto";

export type HistoryByDayDto = {
  title: string;
  // isso aq precisa ser chamado de data para o section list entender
  data: HistoryDto[];
}