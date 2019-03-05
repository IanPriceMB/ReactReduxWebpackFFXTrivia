import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { setCurrentCharacters, setAvailableCharacters } from '../../actions/characterActions';
import store from '../../store';

class CharacterSelectScreen extends Component{

  componentWillMount(){
    const storeSnap = store.getState();
    console.log(storeSnap);
    this.props.setCurrentCharacters(['Tidus', 'Auron'])
    this.props.setAvailableCharacters(['Yuna', 'Lulu'])
  }

  render() {
    return (
      <div>CharacterSelectScreen</div>
    )
  }
}

CharacterSelectScreen.propTypes = {

}

const mapStateToProps = state => ({
  setAvailableCharacters: state.characters.possible,
  setCurrentCharacters: state.characters.current
})

export default connect(mapStateToProps, { setCurrentCharacters, setAvailableCharacters })(CharacterSelectScreen);