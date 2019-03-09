// This file is for the character select menu

import React from 'react';
import './CharacterSelectMenu.scss';
import CharacterPanel from './characterpanel/CharacterPanel';

export const CharacterSelectMenu = (props) => {
  const characters = props.pickable.map((character, i) => {
      return <CharacterPanel character={character} key={i} updateChosen={props.updateChosen}/>
  });
  return(
    <div className='characterSelectMenu'>
      {characters}
    </div>
  );
};

