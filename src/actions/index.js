import * as readAPI from "../utils/api";
export const ADD_COMMENT = "ADD_COMMENT";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const UPDATE_COMMENT_REDUX = "UPDATE_COMMENT_REDUX";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const GETALLCOMMENTS = "GETALLCOMMENTS";
export const UPDATEVOTE = "UPDATEVOTE";
export const GETALL = "GETALL";
export const SORT_SCORE = "ADD_SCORE";
export const SORT_TIME = "ADD_TIME";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST_REDUX = "UPDATE_POST_REDUX";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const ADD_POST = "ADD_POST";
export const DELETE_COMMENT_POST = "DELETE_COMMENT_POST";
export const UP_VOTE_POST = "UP_VOTE_POST";
export const DOWN_VOTE_POST = "DOWN_VOTE_POST";
export const UP_VOTE_POST_DETAIL = "UP_VOTE_POST_DETAIL";
export const DOWN_VOTE_POST_DETAIL = "DOWN_VOTE_POST_DETAIL";
export const UP_VOTE_COMMENT = "UP_VOTE_COMMENT";
export const DOWN_VOTE_COMMENT = "DOWN_VOTE_COMMENT";

//All the actions for posts
export function selectCategory(category) {
  return function(dispatch) {
    readAPI.getCategory(category).then(posts => dispatch(receivePosts(posts)));
  };
}

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

function receivePost(post) {
  return {
    type: RECEIVE_POST,
    post
  };
}

export function getPost(id) {
  return function(dispatch) {
    readAPI.getPost(id).then(post => dispatch(receivePost(post)));
  };
}

function updatePostRedux(post) {
  return {
    type: UPDATE_POST_REDUX,
    post
  };
}

export function updatePost(id, post) {
  return function(dispatch) {
    readAPI.updatePost(id, post).then(post => dispatch(updatePostRedux(post)));
  };
}

export function getall() {
  return function(dispatch) {
    readAPI.getAll().then(posts => dispatch(receivePosts(posts)));
  };
}

export function sortPosts(eventKey, posts) {
  if (eventKey === "score") {
    return function(dispatch) {
      dispatch(sortScore(posts));
    };
  } else {
    return function(dispatch) {
      dispatch(sortTime(posts));
    };
  }
}

function sortScore(posts) {
  return {
    type: SORT_SCORE,
    posts
  };
}

function sortTime(posts) {
  return {
    type: SORT_TIME,
    posts
  };
}

function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

export const addPostRedux = post => dispatch =>
  readAPI.addPost(post).then(dispatch(addPost(post)));

function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  };
}

export const deletePostRedux = id => dispatch =>
  readAPI.deletePost(id).then(dispatch(deletePost(id)));

//All the actions for comments
export function getAllComments(id) {
  return function(dispatch) {
    readAPI
      .getComments(id)
      .then(comments => dispatch(receiveComments(comments)));
  };
}

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
}

function receiveComment(comment) {
  return {
    type: RECEIVE_COMMENT,
    comment
  };
}

export function getComment(id) {
  return function(dispatch) {
    readAPI.getComment(id).then(comment => dispatch(receiveComment(comment)));
  };
}

function addComment(id) {
  return {
    type: ADD_COMMENT,
    id
  };
}

function deleteCommentPost(id) {
  return {
    type: DELETE_COMMENT_POST,
    id
  };
}

export const addCommentRedux = (id, comment) => dispatch =>
  readAPI.addComment(comment).then(res => {
    dispatch(addComment(id));
  });

function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id
  };
}

export function updateComment(id, comment) {
  return function(dispatch) {
    readAPI
      .updateComment(id, comment)
      .then(comment => dispatch(updateCommentRedux(comment)));
  };
}

function updateCommentRedux(comment) {
  return {
    type: UPDATE_COMMENT_REDUX,
    comment
  };
}

export const deleteCommentRedux = id => dispatch =>
  readAPI.deleteComment(id).then(response => {
    const parentId = response.parentId;
    dispatch(deleteComment(id)), dispatch(deleteCommentPost(parentId));
  });

export const updateVote = (id, vote) => dispatch =>
  readAPI.updateVotePost(id, vote).then(response => {
    const postid = response.id;
    if (vote === "upVote") {
      dispatch(upVotePost(postid));
    } else {
      dispatch(downVotePost(postid));
    }
  });

function upVotePost(id) {
  return {
    type: UP_VOTE_POST,
    id
  };
}

function downVotePost(id) {
  return {
    type: DOWN_VOTE_POST,
    id
  };
}

export const updateVoteDetail = (id, vote) => dispatch =>
  readAPI.updateVotePost(id, vote).then(response => {
    if (vote === "upVote") {
      dispatch(upVotePostDetail());
    } else {
      dispatch(downVotePostDetail());
    }
  });

function upVotePostDetail() {
  return {
    type: UP_VOTE_POST_DETAIL
  };
}

function downVotePostDetail() {
  return {
    type: DOWN_VOTE_POST_DETAIL
  };
}

export const updateVoteComment = (id, vote) => dispatch =>
  readAPI.updateVoteComment(id, vote).then(response => {
    const commentid = response.id;
    if (vote === "upVote") {
      dispatch(upVoteComment(commentid));
    } else {
      dispatch(downVoteComment(commentid));
    }
  });

function upVoteComment(id) {
  return {
    type: UP_VOTE_COMMENT,
    id
  };
}

function downVoteComment(id) {
  return {
    type: DOWN_VOTE_COMMENT,
    id
  };
}
