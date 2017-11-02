import { combineReducers } from 'redux'

import {
  ADD_COMMENT
} from '../actions'

function post (state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT :
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