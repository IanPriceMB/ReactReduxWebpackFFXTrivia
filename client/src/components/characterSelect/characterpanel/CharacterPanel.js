// This file is for constructing each character panel for the character select Menu

import React from 'react';
import './CharacterPanel.scss';
import characterData from '../../../assets/data/characterData';
import Tidus from '../../../assets/characters/Tidus.png';
import Auron from '../../../assets/characters/Auron.png';
import Wakka from '../../../assets/characters/Wakka.png';
import Lulu from '../../../assets/characters/Lulu.png';
import Rikku from '../../../assets/characters/Rikku.png';
import Yuna from '../../../assets/characters/Yuna.png';
import Kimahri from '../../../assets/characters/Kimahri.png';

const CharacterPanel = props => {
  return (
    <div className='characterPanel' id={props.character} data-chosen={false} onClick={() => props.updateChosen(props.character)}>
      <div className='characterPanel__media'>
        <h1 className='characterPanel__media__name'>
          {characterData[props.character].name}
        </h1>
        <img className='characterPanel__media__picture'
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
        <h2 className='characterPanel__info__subtitle'>
          {characterData[props.character].strength.name}
        </h2>
        <p className='characterPanel__info__discription'>
          {characterData[props.character].strength.discription}
        </p>
        <h2 className='characterPanel__info__subtitle'>
          {characterData[props.character].weakness.name}
        </h2>
        <p className='characterPanel__info__discription'>
          {characterData[props.character].weakness.discription}
        </p>
      </div>
    </div>
  );
};
export default CharacterPanel;

