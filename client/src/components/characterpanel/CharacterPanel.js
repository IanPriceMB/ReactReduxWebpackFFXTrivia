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
      <h1 className='character'>
        {characterData[props.character].name}
      </h1>
      <img className='image' src={props.image}  alt={props.character} />
      <h2 className='abilities'>Abilities: </h2>
      <h3 className='subtitle strength'>
        {characterData[props.character].strength.name}
      </h3>
      <p className='discription str-discription'>
        {characterData[props.character].strength.discription}
      </p>
      <h3 className='subtitle weakness'>
        {characterData[props.character].weakness.name}
      </h3>
      <p className='discription weak-discription'>
        {characterData[props.character].weakness.discription}
      </p>
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

