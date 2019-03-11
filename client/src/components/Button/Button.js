
import React from "react";
import './Button.scss'

export const Button = (props) => {
  console.log(props.onClick)
  return <button {...props}>{props.children}</button>
};