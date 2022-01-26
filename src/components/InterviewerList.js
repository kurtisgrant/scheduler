import React from 'react';
import 'components/InterviewerList.scss';
import PropTypes from 'prop-types'
import InterviewerListItem from './InterviewerListItem';

function InterviewerList({ interviewers, setInterviewer, interviewer }) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(iObj => (
          <InterviewerListItem
            key={iObj.id}
            name={iObj.name}
            avatar={iObj.avatar}
            selected={iObj.id === interviewer}
            setInterviewer={() => setInterviewer(iObj.id)} />
        ))}
      </ul>
    </section>

  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList;
