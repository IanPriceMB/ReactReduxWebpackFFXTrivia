import React, {Component} from 'react'
import {connect} from 'react-redux';
import './Background.scss'
import pubsub from 'pubsub-js'

class Background extends Component{

  componentWillMount() {
    this.setBackground();
    this.pubsub_setBackground = pubsub.subscribe('setBackground', function(topic, data){
      console.log('in the pubsub')
      this.setBackground();
    }.bind(this));
  }

  setBackground = async() => {
    console.log('set background')
    try {
      console.log('try')
      const background = await import(`../../assets/backgrounds/${this.props.level}_${this.props.scene}.png`);
      console.log(background.default)
      console.log( document.getElementById('background'))
      document.getElementById('background').style.backgroundImage = `url('${background.default}')`;
    }catch(err) {
      console.log('catc')
      console.log(err)
    } 
  }
  componentWillUnmount() {
    pubsub.unsubscribe(pubsub_setBackground);
  }

  render(){
    return <div className='background' id='background'></div>
  }
}

const mapStateToProps = state => ({
  level: state.level.currentLevel,
  scene: state.scene.sceneName
});

export default connect(mapStateToProps, null)(Background);