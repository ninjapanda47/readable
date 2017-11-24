import * as readAPI from '../utils/api'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const GETALLCOMMENTS = 'GETALLCOMMENTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_VOTE = 'UPDATE_VOTE'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const GETALL = 'GETALL'
export const ADDPOSTREDUX = 'ADDPOSTREDUX'

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

export function deletePost({ id }) {
  return {
    type: DELETE_POST,
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

export const addPost = (posts) => ({
  type: ADD_POST,
  posts
})

export const addPostRedux = (post) => dispatch => (
  readAPI.addPost(post)
    .then(dispatch(addPost(post)))
);

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

