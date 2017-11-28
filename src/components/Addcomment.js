import React, { Component } from 'react';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
    Button,
} from 'react-bootstrap';

const uuidv4 = require('uuid/v4');

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

console.log(this.props)

class Addcomment extends Component {

    state = {
        author: '',
        body: '',
    };

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
        });
    };

  handleSubmit = event => {
    event.preventDefault();
    const comment = this.state;
    comment.timestamp = Date.now();
    comment.id = uuidv4();
    comment.parentId = this.props.parentId
    const id = this.props.parentId
    console.log(id,comment);
    this.props.onSubmit(id,comment);
  };

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Author"
                        name="author"
                        placeholder="Enter text"
                        onChange={this.handleInputChange}
                    />
                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Comment</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            placeholder="Leave your comment"
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

export default Addcomment;