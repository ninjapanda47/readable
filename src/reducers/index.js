import { combineReducers } from "redux";
import {
  ADDCOMMENT,
  DELETECOMMENT,
  ADD_POST,
  DELETE_POST,
  DELETEPOSTREDUX,
  UPDATEVOTE,
  SELECT_CATEGORY,
  GETALL,
  RECEIVE_POSTS,
  REQUEST_POSTS,
  RECEIVE_COMMENTS,
  GETALLCOMMENTS,
  ADDPOSTREDUX
} from "../actions";

function posts(state = [], action) {
  const { posts, post } = action;

  switch (action.type) {
    case GETALL:
      return {
        ...state,
        posts
      };
    case RECEIVE_POSTS: {
      return posts;
    }
    case SELECT_CATEGORY:
      return {
        ...state,
        posts
      };
    case ADD_POST:
      return [...state, post];
    case DELETEPOSTREDUX:
      return {
        ...state,
        posts
      };
    case UPDATEVOTE:
      console.log(state);
      return {
        ...state,
        posts
      };
    default:
      return state;
  }
}

function comments(state = [], action) {
  const { comments } = action;
  switch (action.type) {
    case GETALLCOMMENTS:
      return {
        ...state,
        comments
      };
    case RECEIVE_COMMENTS: {
      return comments;
    }
    case ADDCOMMENT:
      return {
        ...state,
        comments
      };
    case DELETECOMMENT:
      return {
        ...state,
        comments
      };
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments
});
