
import { combineReducers } from 'redux'
import { getAll } from '../utils/api'
import {
    ADD_COMMENT,
    DELETE_COMMENT,
    ADD_POST,
    DELETE_POST,
    UPDATE_VOTE,
    SELECT_CATEGORY,
    GETALL
} from '../actions'

const initialstate = {};

getAll().then((data)=>{
      initialstate = data;
      console.log(data);
    })

function post(state = {}, action) {
    switch (action.type) {
        case GETALL:
            const {post} = action
            return {
                ...state, post: post 
            }
        case  SELECT_CATEGORY:
        const {category} = action
        return {
            ...state, category: category
        }

        case ADD_COMMENT:
            const { comment } = action

            return {
                ...state,
            }
        default:
            return state
    }
}

export default combineReducers({
post
})