
/**
 * Calculates the day number within a week, with an optional offset.
 * @param {number} offset - Offset to adjust the calculation. Default is 0.
 * @returns {number} - Day number within the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday).
 */
export const getDayNumberInWeek = (offset: number = 0): number => {
  // Get the current date
  const date: Date = new Date();
  // Calculate the day number within the week, with the offset
  let day: number = date.getDay() + offset;  
  // Ensure the result stays within the range of 0 to 6
  return day % 7;
}