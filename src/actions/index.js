import * as readAPI from '../utils/api'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_VOTE = 'UPDATE_VOTE'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const GETALL = 'GETALL'


export function addComment ({id,timestamp,title,body,author,voteScore,parentDeleted,deleted}) {
  return {
    type: ADD_COMMENT,
    id,
    timestamp,
    title,
    body,
    author,
    voteScore,
    parentDeleted,
    deleted
  }
}

export function deleteComment ({id}) {
  return {
    type: DELETE_COMMENT,
    id

  }
}

export function addPost ({id,timestamp,title,body,author,category,voteScore,deleted}) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
}

export function deletePost ({id}) {
  return {
    type: DELETE_POST,
    id

  }
}

export function updateVote ({id}) {
  return {
    type: UPDATE_VOTE,
    id

  }
}

export function selectCategory ({category, post}) {
 return {
     type: SELECT_CATEGORY,
     category,
     post
 }
}

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(post) {
  return {
    type: REQUEST_POSTS,
    post
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePost(post) {
  return {
    type: RECEIVE_POSTS,
    post
  }
}

export function getall(post) {

  return function (dispatch) {
    dispatch(requestPosts(post))

    readAPI.getAll()
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
        dispatch(receivePost(post))
      )
  }
}
/*
export function getall (post) {
 return {
     type: GETALL,
     post
 }
}
*/



