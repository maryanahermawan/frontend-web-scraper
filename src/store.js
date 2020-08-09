import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
export const REDDIT_LOGIN_SUCCESSFUL = 'REDDIT_LOGIN_SUCCESSFUL';
export const REDDIT_SAVE_BASIC_INFO = 'REDDIT_SAVE_BASIC_INFO';

const redditReducer = (state = { isAuthenticated: false, accessToken: null }, action) => {
    switch (action.type) {
        case REDDIT_LOGIN_SUCCESSFUL:
            return {
                ...state,
                isAuthenticated: true,
                accessToken: action.payload.accessToken,
            }
        case REDDIT_SAVE_BASIC_INFO:
            console.log("subreddit array is", action.payload.basicInfo.SubredditSubscription.Data.Children)
            return {
                ...state,
                redditUsername: action.payload.basicInfo.Name,
                subredditArray: action.payload.basicInfo.SubredditSubscription.Data.Children.map(e => ({
                    URL: e.Data.URL,
                    description_html: e.Data.public_description_html,
                })),
            }
        case 'REDDIT_LISTINGS':
            console.log("Subreddit listings are ", action.payload.subredditListings)
            console.log("Data is", action.payload.subredditListings[0].data.Data)
            return {
                ...state,
                subredditArray: state.subredditArray.map(sr => ({
                    ...sr,
                    subredditTopListings: action.payload.subredditListings.find(
                        arrayel => arrayel.data.Data.Children[0]['Data']['Subreddit'] === sr.URL.replace(/\/r\/|\//g, '')
                    ).data.Data.Children
                }))
            }
        // case 'TOGGLE_TODO':
        //     return state.map(todo =>
        //         todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        //     )
        default:
            return state
    }
}

// const firstNamedReducer = (state = 1, action) => state

// const secondNamedReducer = (state = 2, action) => state

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
    redditReducer,
    //   firstNamedReducer,
    //   secondNamedReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store