import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import FacebookDashboard from './facebook/FacebookDashboard';
import RedditDashboard from './reddit/RedditDashboard';
import NavBar from './NavBar';
import '../App.css';

export class Routes extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <NavBar></NavBar>
                    <div>
                        <Switch>
                            <Route exact path="/" component={LoginPage} />
                            <Route exact path="/login" component={LoginPage} />
                            <Route exact path="/reddit_dashboard" component={RedditDashboard} />
                            <Route exact path="/facebook_dashboard" component={FacebookDashboard} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}