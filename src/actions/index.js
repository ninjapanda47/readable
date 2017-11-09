
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_VOTE = 'UPDATE_VOTE'

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