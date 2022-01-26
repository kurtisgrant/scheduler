export default (state, amount) => {
  const newDays = [...state.days];
  const dayToIncrement = newDays[newDays.findIndex(day => day.name === state.day)];
  dayToIncrement.spots = dayToIncrement.spots + amount;
  return newDays;
}