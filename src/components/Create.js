import React from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

export default function Create() {
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
                placeholder="Enter text"
            />
            <FieldGroup
                id="formControlsText"
                type="text"
                label="Author"
                placeholder="Enter text"
            />
            <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select Category</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                    <option value="React">React</option>
                    <option value="Redux">Redux</option>
                    <option value="Udacity">Udacity</option>
                </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Post</ControlLabel>
                <FormControl componentClass="textarea" placeholder="What's on your mind" />
            </FormGroup>
            <Button bsStyle="primary" type="submit">
                Submit
    </Button>
        </form>
    )
}