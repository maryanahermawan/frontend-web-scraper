// redux/actions.js
import { REDDIT_LOGIN_SUCCESSFUL, REDDIT_SAVE_BASIC_INFO } from './../../store';

export const redditLoginSuccessful = accessToken => ({
  type: REDDIT_LOGIN_SUCCESSFUL,
  payload: {
    accessToken
  }
})

export const redditBasicInfo = basicInfo => ({
  type: REDDIT_SAVE_BASIC_INFO,
  payload: {
    basicInfo
  }
})

export const redditListings = subredditListings => ({
  type: 'REDDIT_LISTINGS',
  payload: { subredditListings }
})