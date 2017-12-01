import * as readAPI from "../utils/api";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const GETALLCOMMENTS = "GETALLCOMMENTS";
export const UPDATEVOTE = "UPDATEVOTE";
export const GETALL = "GETALL";
export const DELETE_POST = "DELETE_POST";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const ADD_POST = "ADD_POST";
export const DELETE_COMMENT_POST = "DELETE_COMMENT_POST";

export const updateVote = (id, vote) => dispatch =>
  readAPI.updateVote(id, vote).then(response => {
    console.log(response.id);
  });

export function selectCategory(category) {
  return function(dispatch) {
    console.log(category);
    readAPI
      .getCategory(category)
      .then(
        posts => dispatch(receivePosts(posts)),
        error => console.log("An error occured", error)
      );
  };
}

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

function compareNumbers(a, b) {
  return a.voteScore - b.voteScore;
}

export function getall(eventKey) {
  if (eventKey === "score") {
    return function(dispatch) {
      readAPI.getAll().then(response => {
        const allPosts = response;
        allPosts.sort(compareNumbers)
        dispatch(receivePosts(allPosts))
      });
    };
  } else
    return function(dispatch) {
      readAPI
        .getAll()
        .then(
          posts => dispatch(receivePosts(posts)),
          error => console.log("An error occured", error)
        );
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

export function getAllComments(id) {
  return function(dispatch) {
    readAPI
      .getComments(id)
      .then(
        comments => dispatch(receiveComments(comments)),
        error => console.log("An error occured", error)
      );
  };
}

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
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

export const deleteCommentRedux = id => dispatch =>
  readAPI.deleteComment(id).then(response => {
    const parentId = response.parentId;
    dispatch(deleteComment(id)), dispatch(deleteCommentPost(parentId));
  });
