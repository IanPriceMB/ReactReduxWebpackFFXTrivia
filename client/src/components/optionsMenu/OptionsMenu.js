// Renders and controls the options menu 

// Importing everything we need to make this a pretty react component
import React from 'react';
import './OptionsMenu.scss';
import PropTypes from 'prop-types';

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


// Declareing which proptypes should be present 
OptionsMenu.propTypes = {

};


// Export the options menu
export default OptionsMenu;