// It's a container!

// Importing everything we need to make this a pretty react component
import React from 'react';
import './Container.scss';


const Container = (props) => {
  return <div className='container' {...props}>
    {props.children}
  </div>
};


// Export the container
export default Container;