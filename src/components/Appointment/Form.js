import React, { useState } from 'react';

import Button from 'components/Button';

import InterviewerList from 'components/InterviewerList';

function Form({ student: inputStudent, interviewer: inputInterviewer, interviewers, onSave, onCancel }) {

  const [student, setStudent] = useState(inputStudent || '');

  const [interviewer, setInterviewer] = useState(inputInterviewer || null);

  const [error, setError] = useState("");

  const reset = () => {
    setStudent('');
    setInterviewer(null);
    setError('');
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Interviewer cannot be blank");
      return;
    }
    setError("");
    onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          setInterviewer={setInterviewer}
          interviewer={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button
            confirm
            onClick={() => validate()}
            testid="save-appointment"
          >Save</Button>
        </section>
      </section>
    </main>

  );
}

export default Form;
