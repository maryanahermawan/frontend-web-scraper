/*global FB*/
import React from 'react';
import { connect } from 'react-redux'
class FacebookDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("Component did mount")
        window.fbAsyncInit = function () {
            FB.init({
                appId: '2340902796206461',
                cookie: true,
                xfbml: true,
                version: 'v7.0',
                autoLogAppEvents: true,
            });
            // FB.AppEvents.logPageView();
            console.log("Init is called")
            // FB.api(
            //     '/me',
            //     'GET',
            //     { "fields": "id,name,about,posts" },
            //     function (response) {
            //         // Insert your code here
            //         console.log("me response is", response)
            //     }
            // );

            FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
                statusChangeCallback(response);        // Returns the login status.
            });

            function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
                console.log('statusChangeCallback');
                console.log(response);                   // The current login status of the person.
                if (response.status === 'connected') {   // Logged into your webpage and Facebook.
                    //save the token into local storage
                    localStorage.setItem('ACCESS_TOKEN', response.authResponse.accessToken)
                 
                    testAPI();
                } else {                                 // Not logged into your webpage or we are unable to tell.
                    document.getElementById('status').innerHTML = 'Please log ' +
                        'into this webpage.';
                }
            }

            function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function (response) {
                    console.log('Successful login for: ' + response.name);
                    document.getElementById('status').innerHTML =
                        'Thanks for logging in, ' + response.name + '!';
                });
            }
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0&appId=2340902796206461&autoLogAppEvents=1";
            js.crossorigin = "anonymous";
            js.defer = true;
            js.async = true;
            js.nonce = "G5zJqIgs";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }


    render() {
        return (
            <div>
                <h1 id="status">FB element</h1>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ...state.redditReducer
    };
};

export default connect(
    mapStateToProps
)(FacebookDashboard)