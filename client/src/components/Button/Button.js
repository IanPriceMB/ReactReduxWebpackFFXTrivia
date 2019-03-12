// It's a button!

// Importing everything we need to make this a pretty react component
import React from "react";
import './Button.scss';
import PropTypes from 'prop-types';


const Button = (props) => {
  return <button className='button' {...props}>{props.children}</button>
};


// Declareing which proptypes should be present 
Button.propTypes = {
  children: PropTypes.string.isRequired
};


// Export the button
export default Button;