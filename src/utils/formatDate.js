export const formatDate = dateInput => {
  let finalDate;

  if (typeof dateInput === 'number') {
    finalDate = dateInput * 1000;
  } else if (typeof dateInput === 'string' && dateInput.includes('-')) {
    finalDate = Date.parse(dateInput);
  } else {
    return 'Invalid date';
  }
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Intl.DateTimeFormat('ru', options)
    .format(new Date(finalDate));
};
