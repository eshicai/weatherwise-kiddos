export const getWeekday = (dateOffset = 0) => {
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + dateOffset);

  return weekday[targetDate.getDay()];
};