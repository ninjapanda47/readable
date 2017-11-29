import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./components/Post";
import Create from "./components/Create";
import Comment from "./components/Comment";
import Addcomment from "./components/Addcomment";
import Modal from "react-modal";
import {
  addComment,
  deleteComment,
  updateVote,
  selectCategory,
  getall,
  getAllComments,
  addPostRedux,
  deletePostRedux
} from "./actions";
import * as readAPI from "./utils/api";
import { Route, Link, Redirect, withRouter, Switch } from "react-router-dom";
import "./App.css";
import {
  Button,
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem
} from "react-bootstrap";

class App extends Component {
  state = {
    categories: [],
    posts: [],
    comments: [],
    showModal: false,
    parentId: ""
  };

  componentDidMount() {
    readAPI.getCategories().then(data => {
      this.setState({ categories: data.categories });
    });
    this.props.getAllPost();
  }

  getAllPosts() {
    this.props.getAllPost();
    this.setState({ posts: this.props.posts });
  }

  selectCategory(e) {
    const category = e;
    this.props.getCategoryPost(category);
    this.setState({ posts: this.props.posts });
  }

  openModal = id => {
    this.props.getPostComments(id);
    this.setState(() => ({
      showModal: true,
      comments: this.props.comments,
      parentId: id
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      showModal: false,
      comments: []
    }));
  };

  createPost = post => {
    this.props.addNewPost(post);
    this.props.history.push("/");
  };

  deletePost = id => {
    this.props.deletePost(id);
    this.setState({ posts: this.props.posts });
  };

  updateVote = (id, vote) => {
    this.props.updateVote(id, vote);
    this.setState({ posts: this.props.posts });
  };

  addComment = (id, comment) => {
    this.props.addNewComment(id, comment);
    this.props.getAllPost();
    this.props.history.push("/");
    this.openModal(id);
  };

  deleteComment = id => {
    this.props.deleteComment(id);
    this.props.getPostComments();
    this.props.getAllPost();
    this.props.history.push("/");
    this.setState({ 
      comments: this.props.comments, 
      posts: this.props.posts
    });
  };

  render() {
    const { categories, showModal, parentId } = this.state;
    const {
      getAllPost,
      posts,
      getPostComments,
      getCategoryPost,
      comments
    } = this.props;
    console.log(this);

    return (
      <div className="containter-fluid">
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" onClick={() => this.getAllPosts()}>
                Readable
              </Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem>
              <Link to="/newpost">Add Post</Link>
            </NavItem>
          </Nav>
          <Nav bsStyle="pills" activeKey={1} pullRight>
            {this.state.categories.map(category => (
              <NavItem
                key={category.name}
                eventKey={2}
                onClick={e => this.selectCategory(category.name)}
              >
                <Link to={`/${category.name}`}>{category.name}</Link>
              </NavItem>
            ))}
            <NavDropdown eventKey={3} title="Order By" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Vote Score</MenuItem>
              <MenuItem eventKey={3.2}>Time Stamp</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="post-container">
                <Post
                  posts={posts}
                  openModal={id => {
                    this.openModal(id);
                  }}
                  deletePost={id => {
                    this.deletePost(id);
                  }}
                  updateVote={(id, vote) => {
                    this.updateVote(id, vote);
                  }}
                />
                <Modal
                  isOpen={showModal}
                  onRequestClose={this.closeModal}
                  contentLabel="Modal"
                >
                  {showModal && (
                    <Comment
                      comments={comments}
                      deleteComment={id => {
                        this.deleteComment(id);
                      }}
                    />
                  )}
                  <Button bsSize="small" onClick={this.closeModal}>
                    Close
                  </Button>
                  <Button
                    bsStyle="info"
                    bsSize="small"
                    className="addcommentbtn"
                    onClick={e => this.props.history.push("/newcomment")}
                  >
                    Add a Comment
                  </Button>
                </Modal>
              </div>
            )}
          />
          <Route
            path="/newpost"
            render={() => <Create onSubmit={this.createPost} />}
          />
          <Route
            path="/newcomment"
            render={() => (
              <Addcomment
                onSubmit={this.addComment}
                parentId={this.state.parentId}
              />
            )}
          />
          <Route
            path="/:category"
            render={() => (
              <div className="post-container">
                <Post
                  posts={posts}
                  openModal={id => {
                    this.openModal(id);
                  }}
                  deletePost={id => {
                    this.deletePost(id);
                  }}
                  updateVote={(id, vote) => {
                    this.updateVote(id, vote);
                  }}
                />
                <Modal
                  isOpen={showModal}
                  onRequestClose={this.closeModal}
                  contentLabel="Modal"
                >
                  {showModal && (
                    <Comment
                      comments={comments}
                      deleteComment={id => {
                        this.deleteComment(id);
                      }}
                    />
                  )}
                  <Button bsSize="small" onClick={this.closeModal}>
                    Close
                  </Button>
                  <Button
                    bsStyle="info"
                    bsSize="small"
                    className="addcommentbtn"
                    onClick={e => this.props.history.push("/newcomment")}
                  >
                    Add a Comment
                  </Button>
                </Modal>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts: posts,
    comments: comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPost: () => dispatch(getall()),
    getCategoryPost: category =>
      dispatch(selectCategory(category), console.log(category)),
    getPostComments: id => dispatch(getAllComments(id), console.log(id)),
    addNewPost: post => dispatch(addPostRedux(post), console.log(post)),
    deletePost: id => dispatch(deletePostRedux(id), console.log(id)),
    updateVote: (id, vote) =>
      dispatch(updateVote(id, vote), console.log(id, vote)),
    addNewComment: (id, comment) =>
      dispatch(addComment(id, comment), console.log(id, comment)),
    deleteComment: id => dispatch(deleteComment(id), console.log(id))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
