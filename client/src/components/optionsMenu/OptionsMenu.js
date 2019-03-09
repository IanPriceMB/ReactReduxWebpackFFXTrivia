// Renders and controls the options menu 

import React from 'react';

export const OptionsMenu = () => 
  {
    return(
    <div className='optionsMenu'>
      <ul>
        <li>Save</li>
        <li>Volume</li>
        <li>Credits</li>
        <li>Exit Without Saving</li>
      </ul>
    </div>
  )
}
