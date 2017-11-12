import { combineReducers } from 'redux'

import {
    ADD_COMMENT,
    DELETE_COMMENT,
    ADD_POST,
    DELETE_POST,
    UPDATE_VOTE,
    SELECT_CATEGORY
} from '../actions'

function post(state = {}, action) {
    switch (action.type) {
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

})