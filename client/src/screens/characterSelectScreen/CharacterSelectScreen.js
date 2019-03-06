import React, {Component, Fragment} from 'react';
import './CharacterSelectScreen.scss';
import { connect } from 'react-redux';
import { setCurrentCharacters, setAvailableCharacters } from '../../actions/characterActions';
import store from '../../store';
import levelData from '../../assets/data/levelData';
import {CharacterSelectMenu} from '../../components/characterSelect/CharacterSelectMenu';
import {OptionsMenu} from '../../components/optionsMenu/OptionsMenu';
import background from '../../assets/backgrounds/character_select.jpg';

class CharacterSelectScreen extends Component{
  constructor(props){
    super(props)

    this.state= {
      chosen: [],
      count: null,

    }
  }

  // Get current level from state
  // Use current level to get the available characters for this section
  // Update Redux with available characters
  // Update .background with the character select screen image.
  componentWillMount(){
    const storeSnap = store.getState();
    const currentLevel = storeSnap.level.currentLevel;
    this.setState({level: currentLevel});
    const currentLevelData = levelData[currentLevel];
    const achars = currentLevelData.available_characters;
    this.props.setAvailableCharacters(achars);
    document.getElementById('background').style.backgroundImage = `url('${background}')`;
  }

  // On click of a character panel update chosen array
  // revisit this later it is pretty spaget
  updateChosen = character => {
    const clicked = document.getElementById(character);
    const value = clicked.getAttribute("data-chosen");
    if(value === "false"){
      this.setState({chosen: [...this.state.chosen, character]})
      clicked.style.borderColor = 'aqua'
      clicked.setAttribute('data-chosen', "true")
    } else if (value === "true") {
      const unchosen = this.state.chosen.filter((chosenChar) => character !== chosenChar);
      this.setState({chosen: unchosen})
      clicked.style.borderColor = 'rgb(0, 0, 202)'
      clicked.setAttribute('data-chosen', "false")
    } 
  }



  render() {
    return (
      <Fragment>
        <OptionsMenu></OptionsMenu>
        <div className='characterSelectScreen'>
          <h1 className='characterSelectScreen__title'>Chose Your Characters ({this.state.count})</h1>
          <CharacterSelectMenu pickable={this.props.available} updateChosen={this.updateChosen}></CharacterSelectMenu>
          <h3 onClick>It's the right thing to do!</h3>
        </div>
      </Fragment>
    )
  }
}

CharacterSelectScreen.propTypes = {

}

const mapStateToProps = state => ({
  available: state.characters.availableCharacters,
  current: state.characters.currentCharacters
})

export default connect(mapStateToProps, { setCurrentCharacters, setAvailableCharacters })(CharacterSelectScreen);