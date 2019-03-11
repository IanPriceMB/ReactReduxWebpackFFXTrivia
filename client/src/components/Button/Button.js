
import React from "react";
import './Button.scss'

export const Button = (props) => {
  return <button {...props}>{props.children}</button>
};