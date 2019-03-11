import React from 'react';
import './Container.scss';

export const Container = (props) => {
  return <div className='container' {...props}>
    {props.children}
  </div>
};