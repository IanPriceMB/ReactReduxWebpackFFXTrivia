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
      level: '',
      lazy: null
    }
  }

  componentWillMount(){
    const storeSnap = store.getState();
    const currentLevel = storeSnap.level.currentLevel;
    this.setState({level: currentLevel});
    const currentLevelData = levelData[currentLevel];
    const achars = currentLevelData.available_characters;
    this.props.setAvailableCharacters(achars);
    document.getElementById('background').style.backgroundImage= `url('${background}')`;
  }

  render() {
    return (
      <Fragment>
        <OptionsMenu></OptionsMenu>
        <div className='characterSelectScreen'>
          <h1 className='characterSelectScreen__title'>Chose Your Characters {this.state.count}</h1>
          <CharacterSelectMenu pickable={this.props.available}></CharacterSelectMenu>
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