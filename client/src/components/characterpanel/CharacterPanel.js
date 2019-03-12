// Template for the character panel for the character select screen

// Importing everything we need to make this a pretty react component
import React from 'react';
import './CharacterPanel.scss';


//Data for the characters is located in a seperate file for clarity of reference
import characterData from '../../assets/data/characterData';


// Load all the pictures that might be nessessary for this file 
// There is definately a better way of doing this
import Tidus from '../../assets/characters/Tidus.png';
import Auron from '../../assets/characters/Auron.png';
import Wakka from '../../assets/characters/Wakka.png';
import Lulu from '../../assets/characters/Lulu.png';
import Rikku from '../../assets/characters/Rikku.png';
import Yuna from '../../assets/characters/Yuna.png';
import Kimahri from '../../assets/characters/Kimahri.png';


const CharacterPanel = props => {
  return (
    <div className='characterPanel' id={props.character} data-chosen={false} onClick={() => props.updateChosen(props.character)}>
      <div className='media'>
        <h1 className='name'>
          {characterData[props.character].name}
        </h1>
        <img className='picture'
          src={ 
            props.character == 'Tidus' ? Tidus: 
            props.character == 'Auron' ? Auron:
            props.character == 'Wakka' ? Wakka:
            props.character == 'Lulu' ? Lulu:
            props.character == 'Yuna' ? Yuna:
            props.character == 'Rikku' ? Rikku:
            props.character == 'Kimahri' ? Kimahri: 
            null} 
            alt={props.character} />
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


// Export the template
export default CharacterPanel;

