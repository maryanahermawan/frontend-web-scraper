// redux/actions.js
export const redditLoginSuccessful = accessToken => ({
  type: 'REDDIT_LOGIN_SUCCESSFUL',
  payload: {
    accessToken
  }
})