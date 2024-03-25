export const DateInfo = ({ dateOffset = 0 }) => {
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + dateOffset);

  return (
    <div>
      <h3>{targetDate.toDateString()}, {weekday[targetDate.getDay()]}</h3>
    </div>
  );
};