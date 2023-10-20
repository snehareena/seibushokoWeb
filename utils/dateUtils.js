import { format, startOfDay } from 'date-fns';

export const getFormattedDate = () => {
  return format(startOfDay(new Date()), 'yyyy-MM-dd');
};
