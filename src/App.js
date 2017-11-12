import React, { Component } from 'react';
import Post from './components/Post';
import Create from './components/Create';
import Modal from 'react-modal';
import { addPost, deletePost, addComment, deleteComment, updateVote, selectCategory } from './actions'
import { getCategory, getAll, getCategories } from './utils/api'
import { Route, Link } from 'react-router-dom'
import './App.css';

class App extends Component {

  state = {
    categories: [],
    category: null,
    post: [],
    create: []
  }

  componentDidMount() {
    getCategories().then((data) => {
      this.setState({ categories: data.categories });
      console.log(data.categories);
      console.log(this.state)
    })
    getAll().then((data)=>{
      this.setState({ post: data});
      console.log(data);
      console.log(this.state);
      console.log(this)
    })
  }

    selectCategory = (e) => {
       e.preventDefault()
      console.log(e.target)
      getCategory().then((data) => {
        console.log(data);
      })
  }


  render() {

    const { category } = this.state

    return (
      <div className='container'>
        <div className='nav'>
          <ul className='header'>
            {this.state.categories.map((category) => (
              <li key={category.name} className='btn btn-light catbut' value={category.name} onClick={(e) =>this.selectCategory(e)}>
                {(category.name)}
              </li>
            ))}
          </ul>
        </div>
        <div className='post-container'>
          <Post post={this.state.post}/>
        </div>
        <div className='create-container'>
          <Create create={this.state.create}/>
        </div>

      </div>
    );
  }
}

export default App;
