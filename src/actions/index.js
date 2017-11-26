import * as readAPI from '../utils/api'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const GETALLCOMMENTS = 'GETALLCOMMENTS'
export const UPDATE_VOTE = 'UPDATE_VOTE'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const GETALL = 'GETALL'
export const ADDPOSTREDUX = 'ADDPOSTREDUX'
export const DELETEPOSTREDUX = 'DELETEPOSTREDUX'

export function addComment() {
  return {
    type: ADD_COMMENT,
  }
}

export function deleteComment({ id }) {
  return {
    type: DELETE_COMMENT,
    id

  }
}

export function updateVote({ id }) {
  return {
    type: UPDATE_VOTE,
    id

  }
}

export function selectCategory(category) {
  return function (dispatch) {
    console.log(category)
    readAPI.getCategory(category).then(
      posts => dispatch(receivePosts(posts)),
      error => console.log('An error occured', error)
    )
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export function getall() {
  return function (dispatch) {
    readAPI.getAll()
      .then(
      posts => dispatch(receivePosts(posts)),
      error => console.log('An error occured', error)
      )
  }

}

export const addPostRedux = (post) => dispatch => (
  readAPI.addPost(post)
    .then(dispatch(getall()))
);

export const deletePostRedux = (id) => dispatch => (
  readAPI.deletePost(id)
    .then(posts => dispatch((getall()))
));

export function getAllComments(id) {
  return function (dispatch) {
    readAPI.getComments(id)
      .then(
      comments => dispatch(receiveComments(comments)),
      error => console.log('An error occured', error)
      )
  }
}

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

