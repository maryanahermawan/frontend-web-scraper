import React from 'react';
import './App.css';
import { Nav } from 'react-bootstrap';
import { Routes } from './components/Routes';

function App() {

  return (
    <div className="App">
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
        <Routes />
      </div>

    </div>
  );
}

export default App;
