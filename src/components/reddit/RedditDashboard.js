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
        // this.props = {
        //     isAuthenticated: false,
        //     accessToken: null,
        //     redditUsername: null,
        //     subredditArray: [],
        // }
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
                            const randomInt = Math.floor(Math.random(0,1)*10)
                            return (
                                <Carousel.Item>
                                    <img
                                        src={require(`../../assets/carousel-wallpaper/${randomInt}.jpg`)}
                                        width="800" height="400"
                                        alt="Listing slide"
                                    />
                                    <Carousel.Caption className="vertical-center">
                                        <h6>{el.URL}</h6>
                                        <br></br><br></br>
                                        {el.subredditTopListings && el.subredditTopListings.map((listing, index) => {
                                            return (
                                                <div>
                                                    <h6>Title: {listing.Data.Title}</h6>
                                                    <div dangerouslySetInnerHTML={htmlDecode(listing.Data.selftext_html)} /> 
                                                    <p><a href={listing.Data.URL}>{listing.URL}</a></p>
                                                    <hr/><br></br>
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
        ...state.redditReducer
    };
};

export default connect(
    mapStateToProps
)(RedditDashboard)