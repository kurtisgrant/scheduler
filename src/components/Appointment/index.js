import React from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

function Appointment({ time, interview, dailyInterviewers }) {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

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
      {mode === CREATE && <Form interviewers={dailyInterviewers} onCancel={() => back()} />}
    </article>
  );
}

export default Appointment;
