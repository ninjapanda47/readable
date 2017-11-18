
import { combineReducers } from 'redux'
import {
    ADD_COMMENT,
    DELETE_COMMENT,
    ADD_POST,
    DELETE_POST,
    UPDATE_VOTE,
    SELECT_CATEGORY,
    GETALL,
    RECEIVE_POSTS,
    REQUEST_POSTS,
    RECEIVE_COMMENTS,
    GETALLCOMMENTS
} from '../actions'

function post(state = [], action) {
    const { post } = action
    switch (action.type) {
        case GETALL:
            return {
                ...state, post
            }
        case RECEIVE_POSTS: {
            return post
        }
        case SELECT_CATEGORY:
            return {
                ...state, post
            }

        default:
            return state
    }
}

function comment(state = {}, action) {
    const { comment } = action
    switch (action.type) {
        case GETALLCOMMENTS:
            return {
                ...state, comment
            }
        case RECEIVE_COMMENTS: {
            return {
                ...state, comment: action.comment
            }
        }
        default:
            return state
    }
}

export default combineReducers({
    post, comment
})