import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Pubsub from 'pubsub-js';
import './MainMenuScreen.scss';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions'

class MainMenuScreen extends Component {

  componentWillMount(){
    this.props.fetchPosts();
  }
  
  newGame = () => {
    Pubsub.publish('new game', `it's a new game!`);
  }

  render() {
    const postItems = this.props.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ))
    return (
      <Fragment>
        <div className='container'>
          {/* <button onClick={this.newGame}><h2>New Game</h2></button>
          <button disabled={true}><h2>Log In</h2></button>
          <button disabled={true}><h2>Sign Up</h2></button> */}
          <div>{postItems}</div>
        </div>
    </Fragment>
    )
  }
}

MainMenuScreen.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts })(MainMenuScreen);