import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

class Create extends Component {
    state = {
        title: '',
        author: '',
        category: '',
        body: ''
    }

  handleInputChange = (event) =>{
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });

    console.log(event.target.value)
    console.log(event.target.name)
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

    render() {

        function FieldGroup({ id, label, help, ...props }) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} />
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            );
        }
        return (
            <form>
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="Title"
                    name='title'
                    value={this.state.title}  
                    placeholder="Enter text"
                    onChange={this.handleInputChange}
                />
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="Author"
                    name='author'
                    placeholder="Enter text"
                    onChange={this.handleInputChange}
                />
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Select Category</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" name='category' onChange={this.handleInputChange}>
                        <option value="React">React</option>
                        <option value="Redux">Redux</option>
                        <option value="Udacity">Udacity</option>
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Post</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="What's on your mind" name='body' onChange={this.handleInputChange} />
                </FormGroup>
                <Button bsStyle="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
            </form>
        )
    }
}

export default Create