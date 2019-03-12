// It's a button!

// Importing everything we need to make this a pretty react component
import React from "react";
import './Button.scss'


const Button = (props) => {
  return <button className='button' {...props}>{props.children}</button>
};

// Export the button
export default Button;