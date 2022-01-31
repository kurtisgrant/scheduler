import React from "react";

import "components/Button.scss";

import classNames from 'classnames';

export default function Button(props) {

   const classes = classNames(
      'button',
      { "button--confirm": props.confirm },
      { "button--danger": props.danger }
   );
   
   return <button
      data-testid={props.testid}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
   >
      {props.children}
   </button>;
}
