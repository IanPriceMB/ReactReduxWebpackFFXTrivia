// Renders the party overlay UI

// Importing everything we need to make this a pretty react component
import React from 'react';
import './PartyOverlay.scss'
import PropTypes from 'prop-types';


// Loading any images we may need
import Tidus from '../../assets/characters/Tidus.png';
import Auron from '../../assets/characters/Auron.png';
import Wakka from '../../assets/characters/Wakka.png';
import Lulu from '../../assets/characters/Lulu.png';
import Rikku from '../../assets/characters/Rikku.png';
import Yuna from '../../assets/characters/Yuna.png';
import Kimahri from '../../assets/characters/Kimahri.png';


const PartyOverlay = props => {

  const levelTitle = props.level.split('_')[0];

  return (
    <div className='partyOverlay'>
      <h1>{levelTitle}</h1>
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
      alt={props.character} 
    />
    </div>
  );
};


// Declareing which proptypes should be present 
PartyOverlay.propTypes = {
  party: PropTypes.array.isRequired,
  level: PropTypes.string.isRequired
};


// Export the overlay template
export default PartyOverlay;