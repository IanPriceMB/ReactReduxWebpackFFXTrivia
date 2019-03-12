// Template for the character panel for the character select screen

// Importing everything we need to make this a pretty react component
import React from 'react';
import './CharacterPanel.scss';
import PropTypes from 'prop-types';


//Data for the characters is located in a seperate file for clarity of reference
import characterData from '../../assets/data/characterData';


const CharacterPanel = props => {
  return (
    <div className='characterPanel' id={props.character} data-chosen={false} onClick={() => props.updateChosen(props.character)}>
      <div className='media'>
        <h1 className='name'>
          {characterData[props.character].name}
        </h1>
        <img className='picture' src={props.image}  alt={props.character} />
      </div>
      <div className='info'>
        <h2 className='subtitle'>
          {characterData[props.character].strength.name}
        </h2>
        <p className='discription'>
          {characterData[props.character].strength.discription}
        </p>
        <h2 className='subtitle'>
          {characterData[props.character].weakness.name}
        </h2>
        <p className='discription'>
          {characterData[props.character].weakness.discription}
        </p>
      </div>
    </div>
  );
};


// Declareing which proptypes should be present 
CharacterPanel.propTypes = {
  character: PropTypes.string.isRequired,
  updateChosen: PropTypes.func.isRequired
};



// Export the template
export default CharacterPanel;

