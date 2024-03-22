export const getDayNumberInWeek = (offset = 0) => {
  const date = new Date();
  let day = date.getDay() + offset;  
  return day % 7;
}