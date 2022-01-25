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
      console.log(err.response.headers);
      console.log(err.response.data);
    });
  }, []);

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
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
