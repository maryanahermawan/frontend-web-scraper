import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { FacebookDashboard } from './facebook/FacebookDashboard';
import RedditDashboard from './reddit/RedditDashboard';

export class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" component={LoginPage} />
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/reddit_dashboard" component={RedditDashboard} />
                    <Route exact path="/facebook_dashboard" component={FacebookDashboard} />
                </Switch>
            </BrowserRouter>
        )
    }
}