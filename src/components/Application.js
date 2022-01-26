import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "components/Appointment";

import axios from 'axios';

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

export default function Application(props) {
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
        console.log('in then app.js: ', res);
        setState({ ...state, appointments });
        return res;
      });
  };

  const cancelInterview = (apptId) => {
    return axios.delete(`/api/appointments/${apptId}`)
    .then(res => {
      console.log('in then app.js', res);
      setState({
        ...state,
        appointments: {
          ...state.appointments,
          [apptId]: { ...state.appointments[apptId], interview: null }
        }
      });
    })
  };

  const dailyAppointments = getAppointmentsForDay(state, state.day)
    .map((appt) => {
      const interview = getInterview(state, appt.interview);
      return { ...appt, interview: interview };
    });

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const setDay = (day) => {
    setState(prev => ({ ...prev, day: day }));
  };


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {dailyAppointments.map(appt => (
          <Appointment
            key={appt.id}
            {...appt}
            dailyInterviewers={dailyInterviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
