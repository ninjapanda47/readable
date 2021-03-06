import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button
} from "react-bootstrap";

const uuidv4 = require("uuid/v4");

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Create extends Component {
  state = {
    title: "",
    author: "",
    category: "",
    body: ""
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const post = this.state;
    post.timestamp = Date.now();
    post.id = uuidv4();
    post.voteScore = 0;
    console.log(post);
    this.props.onSubmit(post);
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
            onChange={this.handleInputChange}
          />
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Author"
            name="author"
            placeholder="Enter text"
            onChange={this.handleInputChange}
          />
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select Category</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              name="category"
              onChange={this.handleInputChange}
            >
              <option value="none">Select Category</option>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Post</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="What's on your mind"
              name="body"
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

export default Create;
