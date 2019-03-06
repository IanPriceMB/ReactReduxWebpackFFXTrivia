import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { setCurrentCharacters, setAvailableCharacters } from '../../actions/characterActions';
import store from '../../store';
import levelData from '../../assets/data/levelData';
import {CharacterSelectMenu} from '../../components/characterSelect/CharacterSelectMenu';
import {OptionsMenu} from '../../components/optionsMenu/OptionsMenu';

class CharacterSelectScreen extends Component{
  constructor(props){
    super(props)

    this.state= {}
  }

  // Set the available characters for the level to the redux state
  componentWillMount(){
    const storeSnap = store.getState();
    const currentLevel = storeSnap.level.currentLevel;
    const currentLevelData = levelData[currentLevel];
    const achars = currentLevelData.available_characters;
    this.props.setAvailableCharacters(achars);
  }

  console = () => {
    console.log(this.props)
    console.log(this.state)
  }

  render() {
    return (
      <Fragment>
        <CharacterSelectMenu pickable={this.props.available}></CharacterSelectMenu>
        <OptionsMenu></OptionsMenu>
        <button onClick={this.console}>click me</button>
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