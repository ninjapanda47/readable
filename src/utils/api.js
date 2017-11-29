const api = "http://localhost:3001";

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Authorization: token
};

//get categories from server
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data);

//get all posts for one category
export const getCategory = category =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

//get all post
export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

//get all comments
export const getComments = id =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

//add new post
export const addPost = post =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

//delete post
export const deletePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: "DELETE",
    headers
  })
    .then(res => res.json())
    .then(data => data);

//update vote
export const updateVote = (id, vote) =>
  fetch(`${api}/posts/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: vote })
  })
    .then(res => res.json())
    .then(data => data);

//add comment
export const addComment = comment =>
  fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(data => data);

//delete comment
export const deleteComment = id =>
  fetch(`${api}/comments/${id}`, {
    method: "DELETE",
    headers
  })
    .then(res => res.json())
    .then(data => data);
