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
export const UP_VOTE_POST = "UP_VOTE_POST";
export const DOWN_VOTE_POST = "DOWN_VOTE_POST";
export const UP_VOTE_COMMENT = "UP_VOTE_COMMENT";
export const DOWN_VOTE_COMMENT = "DOWN_VOTE_COMMENT";

export const updateVote = (id, vote) => dispatch =>
  readAPI.updateVotePost(id, vote).then(response => {
    console.log(response, vote);
    const postid = response.id
    if (vote === 'upVote'){
      dispatch(upVotePost(postid))
    } else {
      dispatch(downVotePost(postid))
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

export const updateVoteComment = (id, vote) => dispatch =>
  readAPI.updateVoteComment(id, vote).then(response => {
    console.log(response, vote);
    const commentid = response.id
    if (vote === 'upVote'){
      dispatch(upVoteComment(commentid))
    } else {
      dispatch(downVoteComment(commentid))
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

function compareVotes(a, b) {
  return a.voteScore - b.voteScore;
}

function byTime(a, b) {
  return a.timestamp - b.timestamp;
}

export function getall(eventKey) {
  if (eventKey === 'score') {
    return function(dispatch) {
      readAPI.getAll().then(response => {
        const allPosts = response;
        allPosts.sort(compareVotes)
        dispatch(receivePosts(allPosts))
      });
    };
  } else if (eventKey === 'time'){
    return function(dispatch){
       readAPI.getAll().then(response => {
        const allPosts = response;
        allPosts.sort(byTime)
        dispatch(receivePosts(allPosts))
      });     
    }
  }
   else
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
