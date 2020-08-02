import React from 'react';
import { connect } from 'react-redux'
import { redditLoginSuccessful } from './actions';

class RedditDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isAuthenticated: this.props.isAuthenticated, accessToken: this.props.accessToken };
    }

    componentDidMount() {
        console.log("Component did mount")
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');
        console.log("ACCESS TOKEN is", accessToken)
        if(accessToken) {
            // this.setState = { isAuthenticated: true, accessToken}
            this.props.dispatch(redditLoginSuccessful(accessToken))
            console.log("dashboard state is", this.state.accessToken, this.state.isAuthenticated)
        }
    }
    render() {
        return (
            <div>
                <h1>Reddit element</h1>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { isAuthenticated: state.isAuthenticated };
};

export default connect(
    mapStateToProps
)(RedditDashboard)