import React from "react";
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom";
import '../App.css';

class NavBar extends React.Component {

    render() {
        return (
            <div>
                <Nav activeKey="/login"
                    // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                    className="justify-content-center"
                >
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/reddit_dashboard">Reddit</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/facebook_dashboard">Facebook</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}

export default withRouter(NavBar)