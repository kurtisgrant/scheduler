import { useState, useEffect } from 'react';

import axios from 'axios';

export default () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(st => ({
        ...st,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    }).catch((err) => {
      console.log(err.response.status);
      console.log(err);
      console.log(err.response.data);
    });
  }, []);

  const bookInterview = (apptId, interview) => {
    const appointment = {
      ...state.appointments[apptId],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [apptId]: appointment
    };

    return axios.put(`/api/appointments/${apptId}`, { interview })
      .then(res => {

        const newDays = state.days.map(day => {
          if (day.name !== state.day) return day;

          const availableAppts = day.appointments.filter(id => {
            return id === apptId ? !interview : !state.appointments[id].interview;
          });

          return {
            ...day,
            spots: availableAppts.length
          };
        });

        setState({ ...state, appointments, days: newDays });
        return res;
      });
  };

  const cancelInterview = (apptId) => {
    return axios.delete(`/api/appointments/${apptId}`)
      .then(res => {

        const newDays = state.days.map(day => {
          if (day.name !== state.day) return day;

          const availableAppts = day.appointments.filter(id => {
            return id === apptId ? true : !state.appointments[id].interview;
          });

          return {
            ...day,
            spots: availableAppts.length
          };
        });

        setState({
          ...state,
          appointments: {
            ...state.appointments,
            [apptId]: { ...state.appointments[apptId], interview: null }
          },
          days: newDays
        });
      });
  };

  const setDay = (day) => {
    setState(prev => ({ ...prev, day: day }));
  };

  return { state, setDay, bookInterview, cancelInterview };
};