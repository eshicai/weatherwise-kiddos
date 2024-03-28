export const isStillToday = () => {
  const timezoneOffset = sessionStorage.getItem('timezoneOffset');
  let UTCHour = new Date().getUTCHours();
  UTCHour = UTCHour === 0 ? 24 : UTCHour;

  const isStillToday = (UTCHour - timezoneOffset / 60) < 0 ? 1 : 0;

  return isStillToday;
}

export const getDateOffset = (dateOffset = 0) => {

  const today = isStillToday();
  const adjustDateOffset = today ? dateOffset : dateOffset + 1;

  return adjustDateOffset;
}