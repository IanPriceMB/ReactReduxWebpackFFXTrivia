import React from 'react';
import './CharacterPanel.scss';
import characterData from '../../../assets/data/characterData'

export const CharacterPanel = (props) => {

  let currentCharacter = characterData[props.character]

  return (
    <div className='characterPanel' >
      <h1 className='characterPanel__name'>{currentCharacter.name}</h1>
      <img className='characterPanel__picture' src={`../../../assets/characters/${currentCharacter.name}.png`} alt={currentCharacter.name} />
      <h2 className='characterPanel__subtitle'>{currentCharacter.strength.name}</h2>
      <p className='characterPanel__discription'>{currentCharacter.strength.discription}</p>
      <h2 className='characterPanel__subtitle'>{currentCharacter.weakness.name}</h2>
      <p className='characterPanel__discription'>{currentCharacter.weakness.discription}</p>
    </div>
  )
}

