import React from "react";

import "components/DayListItem.scss";

import classNames from 'classnames';

export default function DayListItem(props) {

  const formatSpots = (n) => {
    if (n === 0) {
      return 'no spots remaining';
    } else if (n === 1) {
      return '1 spot remaining';
    } else {
      return `${n} spots remaining`;
    }
  };

  const dayClass = classNames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 }
  );
  return (
    <li className={dayClass} selected={props.selected} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
