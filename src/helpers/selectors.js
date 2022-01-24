const getAppointmentsForDay = (state, day) => {
  if (!state.days.length) return [];

  const dayData = state.days.find(d => d.name === day);
  if (!dayData) return [];

  return dayData.appointments.length ?
    dayData.appointments.map(id => state.appointments[id]) : [];
};

module.exports = { getAppointmentsForDay };