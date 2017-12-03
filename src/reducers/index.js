import { combineReducers } from "redux";
import {
  ADD_COMMENT,
  RECEIVE_COMMENT,
  DELETE_COMMENT,
  ADD_POST,
  EDIT_POST_OPEN,
  DELETE_POST,
  RECEIVE_POSTS,
  RECEIVE_POST,
  REQUEST_POSTS,
  UPDATE_POST_REDUX,
  UPDATE_COMMENT_REDUX,
  RECEIVE_COMMENTS,
  GETALLCOMMENTS,
  ADDPOSTREDUX,
  DELETE_COMMENT_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
  SORT_TIME,
  SORT_SCORE
} from "../actions";

function posts(state = [], action) {
  const { posts, post, id } = action;

  switch (action.type) {
    case RECEIVE_POSTS: {
      return posts;
    }
    case SORT_SCORE: {
      function compareVotes(a, b) {
        return a.voteScore - b.voteScore;
      }
      let sort = state.sort(compareVotes);
      return sort;
    }
    case SORT_TIME: {
      function byTime(a, b) {
        return a.timestamp - b.timestamp;
      }
      let sort = state.sort(byTime);
      return sort;
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
    case UPDATE_POST_REDUX:
      let newpost = state.map(p => {
        if (p.id === post.id) {
          p = post;
        }
        return p;
      });
      return newpost;

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
      return postupvote;
    case DOWN_VOTE_POST:
      let postdownvote = state.map(p => {
        if (p.id === id) {
          p.voteScore--;
        }
        return p;
      });
      return postdownvote;
    default:
      return state;
  }
}

function post(state = {}, action) {
  const { post, id } = action;
  switch (action.type) {
    case RECEIVE_POST: {
      return post;
    }
    default:
      return state;
  }
}

function comment(state = {}, action) {
  const { comment, id } = action;
  switch (action.type) {
    case RECEIVE_COMMENT: {
      return comment;
    }
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
    case UPDATE_COMMENT_REDUX:
      let newcomment = state.map(c => {
        if (c.id === comment.id) {
          c = comment;
        }
        return c;
      });
      return newcomment;
    case UP_VOTE_COMMENT:
      let commentupvote = state.map(c => {
        if (c.id === id) {
          c.voteScore++;
        }
        return c;
      });
      return commentupvote;
    case DOWN_VOTE_COMMENT:
      let commentdownvote = state.map(c => {
        if (c.id === id) {
          c.voteScore--;
        }
        return c;
      });
      return commentdownvote;
    default:
      return state;
  }
}

export default combineReducers({
  post,
  posts,
  comment,
  comments
});
