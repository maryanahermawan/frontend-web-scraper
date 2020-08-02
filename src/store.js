import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const authenticationReducer = (state = { isAuthenticated: false, accessToken: null }, action) => {
    switch (action.type) {
        case 'REDDIT_LOGIN_SUCCESSFUL':
            return {
                ...state,
                isAuthenticated: true,
                accessToken: action.payload.accessToken,
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
    authenticationReducer,
    //   firstNamedReducer,
    //   secondNamedReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store