import React from 'react';
import './CharacterPanel/scss';

export const CharacterPanel = (props) => {
  return (
  <div className='characterPanel'>
    <h1 className='characterPanel__name'>{props.name}</h1>
    <img className='characterPanel__picture' src={`../../../assets/characters/${props.name}.png`} alt={props.name} />
    <h2 className='characterPanel__subtitle'>Strength</h2>
    <p className='characterPanel__discription'>{props.strength}</p>
    <h2 className='characterPanel__subtitle'>Weakness</h2>
    <p className='characterPanel__discription'>{props.weakness}</p>
  </div>
)}

