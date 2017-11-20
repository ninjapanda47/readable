import React from 'react'
import { Panel, Button } from 'react-bootstrap';

export default function Comment({ id }) {

    return (
        <ul className='comment'>
            <Panel className='post'>
                <p>Author:</p>
                <p>Body</p>
                <p>Votes:</p>
                <Button bsStyle='primary' bsSize='small' className='postbtn'>Edit</Button><Button bsStyle='danger' bsSize='small' className='postbtn'>Delete</Button>
            </Panel>

        </ul>
    )
}