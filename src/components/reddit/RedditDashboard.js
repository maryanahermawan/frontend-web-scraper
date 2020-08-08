import React from 'react'
import { connect } from 'react-redux'
import { redditLoginSuccessful, redditBasicInfo, redditListings } from './actions'
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel'
import '../../App.css';
import { htmlDecode } from '../../helpers';

class RedditDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            isAuthenticated: false,
            accessToken: null,
            redditUsername: null,
            subredditArray: [],
        }
        this.getRedditData = this.getRedditData.bind(this)
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');
        if (accessToken) {
            this.props.dispatch(redditLoginSuccessful(accessToken))
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isAuthenticated === false) {
            this.getRedditData();
        }
        // .then(resp => {
        //     
        //     
        //     return 
        // })
        // .then(resp => {
        //     console.log("subreddit top listing is", resp.data)
        //     )
        // })
        // .catch(err => console.error(err))
    }

    async getRedditData() {
        const basicInfoResponse = await axios.get("http://localhost:8080/reddit_basic_info", {
            headers: {
                'access-token': this.props.accessToken
            }
        })
        this.props.dispatch(redditBasicInfo(basicInfoResponse.data))
        console.log("After updating redux basic info, props are", this.props.redditUsername, this.props.subredditArray)

        //get top listings:
        let promiseArray = []
        this.props.subredditArray.forEach(sr => {
            let subredditName = sr.URL.replace(/\/r\/|\//g, '')
            promiseArray.push(axios.get(`http://localhost:8080/reddit/top?subreddit=${subredditName}&period=week&count=3`,
                {
                    headers: {
                        'access-token': this.props.accessToken
                    }
                }))
        })
        const listingsData = await Promise.all(promiseArray)
        this.props.dispatch(redditListings(listingsData))
        console.log("Listings obtained is", listingsData)
    }

    render() {
        return (
            <div>
                <Carousel>
                    {
                        this.props.subredditArray && this.props.subredditArray.map((el, index) => {
                            return (
                                <Carousel.Item className="container">
                                    <img
                                        src="https://picsum.photos/800/400"
                                        alt="Listing slide"
                                    />
                                    <Carousel.Caption className="vertical-center">
                                        <h6>{el.URL}</h6>
                                        {el.subredditTopListings && el.subredditTopListings.map((listing, index) => {
                                            return (
                                                <div>
                                                    <h6>Title: {listing.Data.Title}</h6>
                                                    <br></br>
                                                    <div dangerouslySetInnerHTML={htmlDecode(listing.Data.selftext_html)} /> 
                                                    <p><a href={listing.Data.URL}>{listing.URL}</a></p>
                                                    <hr/>
                                                </div>
                                            )
                                        })}

                                    </Carousel.Caption>
                                </Carousel.Item>
                            );
                        })
                    }
                </Carousel>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.authenticationReducer
    };
};

export default connect(
    mapStateToProps
)(RedditDashboard)