import { useState, useEffect } from 'react';

import getNewDaysSpotsAdjusted from '../helpers/getNewDaysSpotsAdjusted';

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

  const bookInterview = (apptId, interview, isEdit) => {
    const appointment = {
      ...state.appointments[apptId],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [apptId]: appointment
    };
    const days = isEdit ? state.days : getNewDaysSpotsAdjusted(state, -1);

    return axios.put(`/api/appointments/${apptId}`, { interview })
      .then(res => {
        setState({ ...state, appointments, days });
        return res;
      });
  };

  const cancelInterview = (apptId) => {
    return axios.delete(`/api/appointments/${apptId}`)
      .then(res => {
        setState({
          ...state,
          appointments: {
            ...state.appointments,
            [apptId]: { ...state.appointments[apptId], interview: null }
          },
          days: getNewDaysSpotsAdjusted(state, 1)
        });
      });
  };

  const setDay = (day) => {
    setState(prev => ({ ...prev, day: day }));
  };

  return { state, setDay, bookInterview, cancelInterview };
};