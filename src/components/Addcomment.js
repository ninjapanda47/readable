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

class Addcomment extends Component {
    state = {
        title: '',
        author: '',
        category: null,
        body: null,
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
    console.log(comment);
    this.props.onSubmit(comment);
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

export default Addcomment;