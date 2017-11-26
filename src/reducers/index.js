import { combineReducers } from 'redux'
import {
    ADD_COMMENT,
    DELETE_COMMENT,
    ADD_POST,
    DELETE_POST,
    DELETEPOSTREDUX,
    UPDATE_VOTE,
    SELECT_CATEGORY,
    GETALL,
    RECEIVE_POSTS,
    REQUEST_POSTS,
    RECEIVE_COMMENTS,
    GETALLCOMMENTS,
    ADDPOSTREDUX
} from '../actions'

function posts(state = [], action) {
    const { posts } = action
    switch (action.type) {
        case GETALL:
            return {
                ...state, posts
            }
        case RECEIVE_POSTS: {
            return posts
        }
        case SELECT_CATEGORY:
            return {
                ...state, posts
            }
        case ADDPOSTREDUX:
            return {
                ...state, posts
            }
        case DELETEPOSTREDUX:
            return {
                ...state, posts
            }

        default:
            return state
    }
}

function comments(state = [], action) {
    const { comments } = action
    switch (action.type) {
        case GETALLCOMMENTS:
            return {
                ...state, comments
            }
        case RECEIVE_COMMENTS: {
            return comments
        }
        default:
            return state
    }
}

export default combineReducers({
    posts, comments
})