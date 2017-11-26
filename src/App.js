import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from './components/Post';
import Create from './components/Create';
import Comment from './components/Comment';
import Modal from 'react-modal';
import { addPost, deletePost, addComment, deleteComment, updateVote, selectCategory, getall, getAllComments, addPostRedux } from './actions'
import * as readAPI from './utils/api'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
import './App.css';
import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class App extends Component {

  state = {
    categories: [],
    category: null,
    posts: [],
    comments: [],
    showModal: false,
    post: {}
  }

  componentDidMount() {
    readAPI.getCategories().then((data) => {
      this.setState({ categories: data.categories });
    })
    this.props.getAllPost()
  }

  getAllPosts() {
    this.props.getAllPost()
    this.setState({ posts: this.props.posts })
  }

  selectCategory(e) {
    const category = e
    this.props.getCategoryPost(category);
    this.setState({ posts: this.props.posts })
  }

  openModal = (id) => {
    this.props.getPostComments(id);
    this.setState(() => ({
      showModal: true,
      comments: this.props.comments
    }));
  }

  closeModal = () => {
    this.setState(() => ({
      showModal: false,
      comments: []
    }))
  }

  createPost = post => {
    this.props.addNewPost(post);
    this.props.history.push('/')
  };

  render() {

    const { category, showModal} = this.state
    const { getAllPost, posts, getPostComments, getCategoryPost, comments } = this.props   
    console.log(this)

    return (
      <div className='containter-fluid'>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" onClick={() => this.getAllPosts}>Readable</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem>< Link to='/newpost'>Add Post</Link></NavItem>
          </Nav>
          <Nav bsStyle='pills' activeKey={1} pullRight>
            {this.state.categories.map((category) => (
              <NavItem key={category.name} eventKey={2} onClick={(e) => this.selectCategory((category.name))}><Link to="/">
                {(category.name)}</Link>
              </NavItem>
            ))}
            <NavDropdown eventKey={3} title='Order By' id='basic-nav-dropdown'>
              <MenuItem eventKey={3.1}>Vote Score</MenuItem>
              <MenuItem eventKey={3.2}>Time Stamp</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Route exact path='/' render={() => (
          <div className='post-container'>
            <Post posts={posts}
              openModal={(id) => {
                this.openModal(id)
              }}
            />
            <Modal
              isOpen={showModal}
              onRequestClose={this.closeModal}
              contentLabel='Modal'
            >{showModal && <Comment comments={comments} />}
              <Button bsSize='small' onClick={this.closeModal}>Close</Button>
              <Button bsStyle='info' bsSize='small' className='addcommentbtn'>Add a Comment</Button>
            </Modal>
          </div>
        )} />
        <Route
          path="/newpost"
          render={() => <Create onSubmit={this.createPost} />}
        />
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts: posts,
    comments: comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPost: () => dispatch(getall()),
    getCategoryPost: (category) => dispatch(selectCategory(category), console.log(category)),
    getPostComments: (id) => dispatch(getAllComments(id), console.log(id)),
    addNewPost: (post) => dispatch(addPostRedux(post), console.log(post)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))