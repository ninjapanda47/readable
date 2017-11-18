import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from './components/Post';
import Create from './components/Create';
import Modal from 'react-modal';
import { addPost, deletePost, addComment, deleteComment, updateVote, selectCategory, getall } from './actions'
import * as readAPI from './utils/api'
import { Route, Link } from 'react-router-dom'
import './App.css';
import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

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
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='#'>Readable</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem href="/newpost">Add Post</NavItem>
          </Nav>
          <Nav bsStyle="pills" activeKey={1} pullRight>
            {this.state.categories.map((category) => (
              <NavItem key={category.name} eventKey={2} value={category.name} onClick={(e) => this.selectCategory(e)}>
                {(category.name)}
              </NavItem>
            ))}
            <NavDropdown eventKey={3} title="Order By" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Vote Score</MenuItem>
              <MenuItem eventKey={3.2}>Time Stamp</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div className='post-container'>
          <Post post={post} />
        </div>
        <Route path='/newpost' render={() => (
          <Create create={this.state.create} />
        )} />

      </div>
    );
  }
}

function mapStateToProps({ post }) {
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