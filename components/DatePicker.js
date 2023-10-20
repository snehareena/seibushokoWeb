import { DateInput, } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import React from 'react';
import { format, parseISO } from 'date-fns';

const DatePicker = ({  name, form, ...props }) => {
  const value = form.values[name] ? parseISO(form.values[name]) : null;

  const handleChange = (selectedDate) => {
    const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
    form.setFieldValue(name, formattedDate);
  };

  return (
    <DateInput
      icon={<IconCalendar size="0.5cm" stroke={1.5} />}
      value={value}
      onChange={handleChange}
      placeholder="Pick a date"
      {...props}
    />
  );
};

export default DatePicker;
