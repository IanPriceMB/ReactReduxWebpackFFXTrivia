import React from 'react';
import './CharacterSelectMenu.scss'
import CharacterPanel from './characterpanel/CharacterPanel';



export const CharacterSelectMenu = (props) => {

  const characters = props.pickable.map((character, i) => {
      return <CharacterPanel character={character} key={i}/>
  })
  return(
    <div className='characterSelectMenu'>
      {characters}
    </div>
  )
}

