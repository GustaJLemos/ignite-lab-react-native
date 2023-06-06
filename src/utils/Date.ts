import { format, formatDistanceToNowStrict } from "date-fns"

export function getCurrentDate() {
  return format(new Date(), 'dd-MM-yyyy');
}

export function getDistanceOfDates(date: string) {
  return formatDistanceToNowStrict(new Date(date), { addSuffix: false, unit: 'day' });
}