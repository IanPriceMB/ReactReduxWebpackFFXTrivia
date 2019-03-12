// Renders the party overlay UI

// Importing everything we need to make this a pretty react component
import React from 'react';
import './PartyOverlay.scss'


// For connecting to Redux state
import { connect } from 'react-redux';


// Loading any images we may need
import Tidus from '../../assets/characters/Tidus.png';
import Auron from '../../assets/characters/Auron.png';
import Wakka from '../../assets/characters/Wakka.png';
import Lulu from '../../assets/characters/Lulu.png';
import Rikku from '../../assets/characters/Rikku.png';
import Yuna from '../../assets/characters/Yuna.png';
import Kimahri from '../../assets/characters/Kimahri.png';


const PartyOverlay = props => {

  const levelTitle = props.level.split('_');
  console.log(levelTitle);
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

const mapStateToProps = state => ({
  current: state.characters.currentCharacters,
  level: state.level.currentLevel
});


// Export the overlay connected to Redux State
export default connect(mapStateToProps, null)(PartyOverlay)