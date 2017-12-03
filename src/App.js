import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./components/Post";
import Detail from "./components/Detail";
import Editpost from "./components/Editpost";
import Create from "./components/Create";
import Comment from "./components/Comment";
import Addcomment from "./components/Addcomment";
import Editcomment from "./components/Editcomment";
import Modal from "react-modal";
import {
  addCommentRedux,
  deleteCommentRedux,
  updateVote,
  selectCategory,
  getall,
  sortPosts,
  getAllComments,
  addPostRedux,
  getPost,
  getComment,
  updateComment,
  updatePost,
  deletePostRedux,
  updateVoteComment,
  updateVoteDetail
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
import { LinkContainer } from "react-router-bootstrap";

class App extends Component {
  state = {
    categories: [],
    posts: [],
    comments: [],
    showModal: false,
    parentId: "",
    postId: "",
    commentId: ""
  };

  componentDidMount() {
    readAPI.getCategories().then(data => {
      this.setState({ categories: data.categories });
    });
    this.props.getAllPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({
        post: nextProps.post
      });
    }
  }

  getAllPosts = eventKey => {
    this.props.getAllPosts(eventKey);
    this.setState({ posts: this.props.posts });
  };

  sortPosts = eventKey => {
    this.props.sortPosts(eventKey);
    this.setState({ posts: this.props.posts });
  };

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

  detailView = (id, category) => {
    this.props.detailView(id);
    this.setState({ post: this.props.post });
    this.props.history.push("/" + category + "/" + id);
  };

  createPost = post => {
    this.props.addNewPost(post);
    this.props.history.push("/");
  };

  editPostOpen = id => {
    this.setState({ postId: id });
    this.props.editPostOpen(id);
    this.props.history.push("/editpost");
  };

  updatePost = (id, post) => {
    this.props.updatePost(id, post);
    this.props.history.push("/");
  };

  deletePost = id => {
    this.props.deletePost(id);
    this.props.history.push("/");
  };

  updateVote = (id, vote) => {
    this.props.updateVote(id, vote);
    this.setState({ posts: this.props.posts });
  };

  updateVoteDetail = (id, vote) => {
    this.props.updateVoteDetail(id, vote);
    this.setState({ post: this.props.post });
    console.log(this.props.post)
  };

  updateVoteComment = (id, vote) => {
    this.props.updateVoteComment(id, vote);
    this.setState({ comments: this.props.comments });
  };

  addComment = (id, comment) => {
    this.props.addNewComment(id, comment);
    this.props.history.push("/");
    this.openModal(id);
  };

  editCommentOpen = id => {
    this.setState({ commentId: id });
    this.props.editCommentOpen(id);
    this.props.history.push("/editcomment");
  };

  updateComment = (id, comment) => {
    this.props.updateComment(id, comment);
    this.props.history.push("/");
  };

  deleteComment = id => {
    this.props.deleteComment(id);
    this.props.history.push("/");
  };

  render() {
    const { categories, showModal, parentId, postId } = this.state;
    const {
      getAllPosts,
      posts,
      getPostComments,
      getCategoryPost,
      comments,
      editPostOpen,
      post,
      comment,
      updateVote,
      updateVoteDetail,
      updateVoteComment
    } = this.props;

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
            <LinkContainer to="/newpost">
              <NavItem>Add Post</NavItem>
            </LinkContainer>
          </Nav>
          <Nav bsStyle="pills" activeKey={1} pullRight>
            {this.state.categories.map(category => (
              <LinkContainer to={`/${category.name}`} key={category.name}>
                <NavItem
                  key={category.name}
                  eventKey={2}
                  onClick={e => this.selectCategory(category.name)}
                >
                  {category.name}
                </NavItem>
              </LinkContainer>
            ))}
            <NavDropdown
              eventKey={3}
              title="Order By"
              id="basic-nav-dropdown"
              onSelect={this.sortPosts}
            >
              <MenuItem eventKey="score" value="score">
                Vote Score
              </MenuItem>
              <MenuItem eventKey="time" value="time">
                Time Stamp
              </MenuItem>
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
                  post={post}
                  openModal={id => {
                    this.openModal(id);
                  }}
                  detailView={(id, category) => {
                    this.detailView(id, category);
                  }}
                  editPostOpen={id => {
                    this.editPostOpen(id);
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
                      editComment={id => {
                        this.editCommentOpen(id);
                      }}
                      updateVoteComment={(id, vote) => {
                        this.updateVoteComment(id, vote);
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
            path="/editpost"
            render={() => (
              <Editpost
                onSubmit={this.updatePost}
                postId={this.state.postId}
                post={post}
              />
            )}
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
            path="/editcomment"
            render={() => (
              <Editcomment
                commentId={this.state.commentId}
                comment={comment}
                onSubmit={this.updateComment}
              />
            )}
          />
          <Switch>
            <Route
              exact
              path="/:category"
              render={() => (
                <div className="post-container">
                  <Post
                    posts={posts}
                    openModal={id => {
                      this.openModal(id);
                    }}
                    detailView={id => {
                      this.detailView(id);
                    }}
                    editPostOpen={id => {
                      this.editPostOpen(id);
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
                        editComment={id => {
                          this.editCommentOpen(id);
                        }}
                        updateVoteComment={(id, vote) => {
                          this.updateVoteComment(id, vote);
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
              path="/:category/:id"
              render={() => (
                <div className="post-container">
                  <Detail
                    post={post}
                    openModal={id => {
                      this.openModal(id);
                    }}
                    editPostOpen={id => {
                      this.editPostOpen(id);
                    }}
                    deletePost={id => {
                      this.deletePost(id);
                    }}
                    updateVote={(id, vote) => {
                      this.updateVoteDetail(id, vote);
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
                        editComment={id => {
                          this.editCommentOpen(id);
                        }}
                        updateVoteComment={(id, vote) => {
                          this.updateVoteComment(id, vote);
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
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments, post, comment }) {
  return {
    post: post,
    posts: posts,
    comment: comment,
    comments: comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPosts: () => dispatch(getall()),
    sortPosts: eventKey => dispatch(sortPosts(eventKey)),
    getCategoryPost: category => dispatch(selectCategory(category)),
    getPostComments: id => dispatch(getAllComments(id)),
    detailView: id => dispatch(getPost(id)),
    addNewPost: post => dispatch(addPostRedux(post)),
    editPostOpen: id => dispatch(getPost(id)),
    updatePost: (id, post) => dispatch(updatePost(id, post)),
    deletePost: id => dispatch(deletePostRedux(id)),
    updateVote: (id, vote) => dispatch(updateVote(id, vote)),
    updateVoteDetail: (id, vote) => dispatch(updateVoteDetail(id, vote)),
    updateVoteComment: (id, vote) => dispatch(updateVoteComment(id, vote)),
    addNewComment: (id, comment) => dispatch(addCommentRedux(id, comment)),
    editCommentOpen: id => dispatch(getComment(id)),
    updateComment: (id, comment) => dispatch(updateComment(id, comment)),
    deleteComment: id => dispatch(deleteCommentRedux(id))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
