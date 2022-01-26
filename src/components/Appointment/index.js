import React from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

function Appointment({ id, time, interview, dailyInterviewers, bookInterview, cancelInterview }) {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => transition(SHOW));
  };

  const cancel = () => {
    transition(CONFIRM);
  };

  const confirmCancel = () => {
    transition(DELETING);
    cancelInterview(id).then(() => transition(EMPTY));
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
          {...interview}
          onEdit={() => transition(EDIT)}
          onDelete={cancel}
        />
      }
      {mode === CREATE &&
        <Form
          interviewers={dailyInterviewers}
          onCancel={() => back()}
          onSave={save}
        />}
      {mode === EDIT &&
        <Form
          interviewers={dailyInterviewers}
          interviewer={interview.interviewer.id}
          student={interview.student}
          onCancel={() => back()}
          onSave={save}
        />
      }
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM &&
        <Confirm
          message="Are you sure you want to delete this appointment?"
          onConfirm={confirmCancel}
          onCancel={() => back()}
        />}
    </article>
  );
}

export default Appointment;
