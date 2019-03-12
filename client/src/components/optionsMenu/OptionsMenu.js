// Renders and controls the options menu 

// Importing everything we need to make this a pretty react component
import React from 'react';
import './OptionsMenu.scss';

const OptionsMenu = () => 
  {
    return(
    <div className='optionsMenu'>
      <ul>
        <li>Save & Exit</li>
        <li>Volume</li>
        <li>Credits</li>
      </ul>
    </div>
  );
};


// Export the options menu
export default OptionsMenu;