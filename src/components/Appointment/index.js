import React from 'react';
import 'components/Appointment/styles.scss';

function Appointment({ time }) {
  return (
    <article className="appointment">
      {time ? `Appointment at ${time}` : 'No Appointments'}
    </article>
  );
}

export default Appointment;
