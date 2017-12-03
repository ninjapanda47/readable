import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button
} from "react-bootstrap";


function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Editpost extends Component {
  state = {
    title: this.props.post.title,
    body: this.props.post.body
  };

componentWillReceiveProps(nextProps) {
  if(this.props != nextProps) {
    this.setState({
      title: nextProps.post.title,
    body: nextProps.post.body
    });
  }
}

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.postId
    const post = this.state;
    this.props.onSubmit(id,post)
  };

  render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Title"
              name="title"
              placeholder="Enter text"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Author"
              name="author"
              placeholder="Enter text"
              value={this.props.post.author}
            />
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Category"
              name="category"
              placeholder="Enter text"
              value={this.props.post.category}
            />
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Post</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="What's on your mind"
                name="body"
                value={this.state.body}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <Button bsStyle="primary" type="submit">
              Submit
            </Button>
          </form>
        </div>
      );
  }
}

export default Editpost;
