import React from 'react';

function Empty({ onAdd }) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
        data-testid="add-appointment"
      />
    </main>

  );
}

export default Empty;
