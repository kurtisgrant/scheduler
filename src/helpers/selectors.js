const getAppointmentsForDay = (state, day) => {
  if (!state.days.length) return [];

  const dayData = state.days.find(d => d.name === day);
  if (!dayData) return [];

  return dayData.appointments.map(id => state.appointments[id]);
};

const getInterview = (state, interview) => {
  if (!Object.keys(state.appointments).length || !interview || !interview.interviewer) return null;

  const interviewerData = state.interviewers[interview.interviewer];
  if (!interviewerData) return null;

  return {
    ...interview,
    interviewer: interviewerData
  };
};

const getInterviewersForDay = (state, day) => {
  if (!state.days.length) return [];

  const dayData = state.days.find(d => d.name === day);
  if (!dayData) return [];

  return dayData.interviewers.map(id => state.interviewers[id]);
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };