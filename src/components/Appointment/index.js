import React from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

function Appointment({ id, time, interview, dailyInterviewers, bookInterview }) {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => transition(SHOW));
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
          {...interview}
        // onEdit={() => transition(EDIT)}
        // onDelete={() => transition(CONFIRM)}
        />
      }
      {mode === CREATE &&
        <Form
          interviewers={dailyInterviewers}
          onCancel={() => back()}
          onSave={save}
        />}
      {mode === SAVING && <Status message="Loading" />}
    </article>
  );
}

export default Appointment;
