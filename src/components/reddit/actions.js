// redux/actions.js
export const redditLoginSuccessful = accessToken => ({
  type: 'REDDIT_LOGIN_SUCCESSFUL',
  payload: {
    accessToken
  }
})

export const redditBasicInfo = basicInfo => ({
  type: 'REDDIT_SAVE_BASIC_INFO',
  payload: {
    basicInfo
  }
})

export const redditListings = subredditListings => ({
  type: 'REDDIT_LISTINGS',
  payload: { subredditListings }
})