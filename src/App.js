import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from './components/Post';
import Create from './components/Create';
import Modal from 'react-modal';
import { addPost, deletePost, addComment, deleteComment, updateVote, selectCategory, getall } from './actions'
import { getCategory, getAll, getCategories } from './utils/api'
import { Route, Link } from 'react-router-dom'
import './App.css';

class App extends Component {

  state = {
    categories: [],
    category: null,
    post: [],
    create: [],
    firstload: false
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



  render() {

    const { category } = this.state

    return (
      <div className='containter-fluid'>
        <div className='navbar navbar-expand-lg navbar-dark bg-primary'>
          <a href='#' className='navbar-brand'>Readable</a><a href='#' className='nav-link nav-item'>New Post</a>
          <div className='nav pull-right'>
          <ul className='categories'>
            {this.state.categories.map((category) => (
              <li key={category.name} className='btn btn-light catbut' value={category.name} onClick={(e) =>this.selectCategory(e)}>
                {(category.name)}
              </li>
            ))}
          </ul>
          </div>
        </div>
        <div className='post-container'>
          <Post post={this.state.post}/>
        </div>
        <Route path='/newpost' render={() => (
          <Create create = {this.state.create}/>
        )} />

      </div>
    );
  }
}

export default App;
/*export default connect (App);*/