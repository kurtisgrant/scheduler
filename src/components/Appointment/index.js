import React from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

function Appointment({ id, time, interview, interviewers, bookInterview, cancelInterview }) {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(err => {
        console.log('Save request error: ', err.response);
        transition(ERROR_SAVE, true);
      });
  };

  const cancelAppt = () => {
    transition(CONFIRM);
  };

  const confirmCancelAppt = () => {
    transition(DELETING, true);
    cancelInterview(id).then(() => transition(EMPTY))
      .catch(err => {
        console.log('Delete request error: ', err.response);
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
          {...interview}
          onEdit={() => transition(EDIT)}
          onDelete={cancelAppt}
        />
      }
      {mode === CREATE &&
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />}
      {mode === EDIT &&
        <Form
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          student={interview.student}
          onCancel={() => back()}
          onSave={save}
        />
      }
      {mode === SAVING && <Status message="Saving" />}
      {mode === ERROR_SAVE &&
        <Error
          message="Appointment could not be saved."
          onClose={() => back()}
        />
      }
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_DELETE &&
        <Error
          message="Appointment could not be deleted."
          onClose={() => back()}
        />
      }
      {mode === CONFIRM &&
        <Confirm
          message="Are you sure you want to delete this appointment?"
          onConfirm={confirmCancelAppt}
          onCancel={() => back()}
        />}
    </article>
  );
}

export default Appointment;
