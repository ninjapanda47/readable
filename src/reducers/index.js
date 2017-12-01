import { combineReducers } from "redux";
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  ADD_POST,
  DELETE_POST,
  RECEIVE_POSTS,
  REQUEST_POSTS,
  RECEIVE_COMMENTS,
  GETALLCOMMENTS,
  ADDPOSTREDUX,
  DELETE_COMMENT_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST
} from "../actions";

function posts(state = [], action) {
  const { posts, post, id } = action;

  switch (action.type) {
    case RECEIVE_POSTS: {
      return posts;
    }
    case ADD_POST:
      return [...state, post];
    case DELETE_POST:
      let all = state.filter(p => p.id !== id);
      return all;
    case ADD_COMMENT:
      let updatedpost = state.map(p => {
        if (p.id === id) {
          p.commentCount++;
        }
        return p;
      });
      return updatedpost;
    case DELETE_COMMENT_POST:
      let updatedpostdelete = state.map(p => {
        if (p.id === id) {
          p.commentCount--;
        }
        return p;
      });
      return updatedpostdelete;
    case UP_VOTE_POST:
      let postupvote = state.map(p => {
        if (p.id === id) {
          p.voteScore++;
        }
        return p;
      });
      return postupvote
    case DOWN_VOTE_POST:
      let postdownvote = state.map(p => {
        if (p.id === id) {
          p.voteScore--;
        }
        return p;
      });
      return postdownvote
    default:
      return state;
  }
}

function comments(state = [], action) {
  const { comments, comment, id } = action;
  switch (action.type) {
    case RECEIVE_COMMENTS: {
      return comments;
    }
    case DELETE_COMMENT:
      let update = state.filter(c => c.id !== id);
      return update;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments
});
