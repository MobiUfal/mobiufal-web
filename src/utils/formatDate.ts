import { format, parseISO } from 'date-fns';

export const formatDate = (date: String | undefined): string => {
  if (!date) {
    return '--/--/-- H:mm';
  }
  return format(parseISO(String(date)), 'dd/MM/yyyy H:mm');
};
