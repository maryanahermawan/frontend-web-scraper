import React from 'react'
import './App.css'

import { Routes } from './components/Routes';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = { isAuthenticated: false, redditUsername: null }
  }
  render() {
    return (
      <div className="App">
        <div className="corner-username">{this.props.isAuthenticated ? 'Welcome ' + this.props.redditUsername : ''}</div>
        <header className="App-header">
          <h1 style={{ margin: 0 }}>
            Uncluttered
          </h1>
        </header>
        <div>
          <Routes />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.redditReducer
  };
};

export default connect(mapStateToProps)(App)
