import React from 'react'
import './App.css'
import { Nav } from 'react-bootstrap'
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
          <Nav activeKey="/login"
            // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            className="justify-content-center"
          >
            <Nav.Item>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/reddit_dashboard">Reddit</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/facebook_dashboard">Facebook</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div>
          <Routes />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.authenticationReducer
  };
};

export default connect(mapStateToProps)(App)
