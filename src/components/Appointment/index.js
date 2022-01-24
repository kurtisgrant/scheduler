import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';

function Appointment({ id, time, interview, onAdd }) {
  return (
    <article className="appointment">
      <Header time={time} />
      {
        interview ?
          <Show
            {...interview}
          // onEdit={ }
          // onDelete={ }
          /> :
          <Empty onAdd={onAdd} />
      }
    </article>
  );
}

export default Appointment;
