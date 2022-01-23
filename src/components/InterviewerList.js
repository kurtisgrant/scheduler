import React from 'react';
import 'components/InterviewerList.scss';
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

export default InterviewerList;
