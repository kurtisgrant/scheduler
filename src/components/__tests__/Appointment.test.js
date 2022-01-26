import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

it("renders without crashing", () => {
  const bookInterview = jest.fn();
  const cancelInterview = jest.fn();
  const props = { 
    id: 1, 
    time: "1pm", 
    interview: { interviewer: 2, student: "Barbara Streisand"}, 
    interviewers: [], 
    bookInterview, 
    cancelInterview }
  render(<Appointment {...props} />);
});