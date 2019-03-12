// It's a container!

// Importing everything we need to make this a pretty react component
import React from 'react';
import './Container.scss';
import PropTypes from 'prop-types';


const Container = (props) => {
  return <div id='container' {...props}>
    {props.children}
  </div>
};


Container.propTypes = {
  children: PropTypes.array.isRequired
};


// Export the container
export default Container;