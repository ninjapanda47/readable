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

class Editcomment extends Component {
  state = {
    author: this.props.comment.author,
    body: this.props.comment.body
  };

  componentWillReceiveProps(nextProps) {
  if(this.props != nextProps) {
    this.setState({
      title: nextProps.comment.author,
    body: nextProps.comment.body
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
    const comment = {};
    comment.body = this.state.body
    comment.timestamp = Date.now();
    const commentId = this.props.commentId;
    console.log(comment,commentId)
    this.props.onSubmit(commentId,comment)
  };

  render() {

    console.log(this.props.commentId)

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Author"
            name="author"
            placeholder="Enter text"
            value={this.props.comment.author}
          />
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Comment</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Leave your comment"
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

export default Editcomment;
