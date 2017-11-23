const api = "http://localhost:3001"

let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Authorization': token
}

//get categories from server
export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data)

//get all posts for one category
export const getCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json())
        .then(data => data)

//get all post
export const getAll = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(data => data)

//get all comments
export const getComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then(res => res.json())
        .then(data => data)

//add new post
export const addPost = (newPost) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(res => res.json())

//update vote
export const vote = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(res => res.json())
        .then(data => data)

//add comment
export const addComment = () =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(res => res.json())
        .then(data => data)
