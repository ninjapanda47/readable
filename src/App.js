import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from './components/Post';
import Create from './components/Create';
import Modal from 'react-modal';
import { addPost, deletePost, addComment, deleteComment, updateVote, selectCategory, getall } from './actions'
import * as readAPI from './utils/api'
import { Route, Link } from 'react-router-dom'
import './App.css';

class App extends Component {

  state = {
    categories: [],
    category: null,
    post: []
  }

  componentDidMount() {
    readAPI.getCategories().then((data) => {
      this.setState({ categories: data.categories });
      console.log(data.categories);
      console.log(this.state)
    })
    this.props.getAllPost()
  }

  render() {

    const { category } = this.state
    const { getAllPost, post } = this.props
    console.log("lla" + this.props.post)

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
          <Post post={post}/>
        </div>
        <Route path='/newpost' render={() => (
          <Create create = {this.state.create}/>
        )} />

      </div>
    );
  }
}

function mapStateToProps({post}){
  return {
    post: post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPost: () => dispatch(getall()),
    selectCategory: selectCategory
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)