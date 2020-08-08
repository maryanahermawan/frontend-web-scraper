import React from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import SnooIcon from '../assets/snoo.png';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    // componentDidMount() {
    //     console.log("Component did mount")
    //     window.fbAsyncInit = function () {
    //         FB.init({
    //             appId: '2340902796206461',
    //             cookie: true,
    //             xfbml: true,
    //             version: 'v7.0',
    //             autoLogAppEvents: true,
    //         });
    //         // FB.AppEvents.logPageView();

    //         // FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
    //         //     statusChangeCallback(response);        // Returns the login status.
    //         // });

    //         // function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    //         //     console.log('statusChangeCallback');
    //         //     console.log(response);                   // The current login status of the person.
    //         //     if (response.status === 'connected') {   // Logged into your webpage and Facebook.
    //         //         //save the token into local storage
    //         //         localStorage.setItem('ACCESS_TOKEN', response.authResponse.accessToken)

    //         //         // testAPI();
    //         //     } else {                                 // Not logged into your webpage or we are unable to tell.
    //         //         document.getElementById('status').innerHTML = 'Please log ' +
    //         //             'into this webpage.';
    //         //     }
    //         // }

    //         // function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    //         //     console.log('Welcome!  Fetching your information.... ');
    //         //     FB.api('/me', function (response) {
    //         //         console.log('Successful login for: ' + response.name);
    //         //         document.getElementById('status').innerHTML =
    //         //             'Thanks for logging in, ' + response.name + '!';
    //         //     });
    //         // }
    //     };

    //     (function (d, s, id) {
    //         var js, fjs = d.getElementsByTagName(s)[0];
    //         if (d.getElementById(id)) { return; }
    //         js = d.createElement(s); js.id = id;
    //         js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0&appId=2340902796206461&autoLogAppEvents=1";
    //         js.crossorigin = "anonymous";
    //         js.defer = true;
    //         js.async = true;
    //         js.nonce = "G5zJqIgs";
    //         fjs.parentNode.insertBefore(js, fjs);
    //     }(document, 'script', 'facebook-jssdk'));
    // }

    handleClick() {
        console.log("login is clicked")
        axios.get("http://localhost:8080/reddit/authenticate")
            .then(resp => {
                window.location = resp.data
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div>
                <br></br><br></br>
                <h6>Please login to continue</h6>
                <br></br>
                <Button variant="outline-primary" className="btn-outline-primary" onClick={this.handleClick}>
                    <div>
                        <Image src={SnooIcon} style={{width: 30, height: 'auto', padding: 5}}/>
                        Login via Reddit
                    </div>
                </Button>
                {/* <div className="fb-login-button" data-size="large" data-button-type="login_with" data-layout="rounded"
                    data-scope="public_profile"
                    data-auto-logout-link="false" data-use-continue-as="true" data-width=""
                ></div> */}
            </div >
        )
    }
}

