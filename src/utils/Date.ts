import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from 'date-fns/locale'

export function getCurrentDate() {
  return format(new Date(), 'dd-MM-yyyy');
}

export function getDistanceOfDates(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR });
}

export function returnDayOfWeek() {
  return format(new Date(), 'eeee');
}