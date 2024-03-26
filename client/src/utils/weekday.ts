export const getWeekday = (dateOffset: number = 0): string => {
  const weekday: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const targetDate: Date = new Date();
  targetDate.setDate(targetDate.getDate() + dateOffset);

  return weekday[targetDate.getDay()];
};