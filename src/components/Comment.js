import React from 'react'
import { Panel, Button } from 'react-bootstrap';

export default function Comment({ comment }) {

    return (
        <ul className='commentlist'>
            {comment && comment.map((item) => (
            <Panel className='comment' key={item.id}>
                <p>{item.author}</p>
                <p>{item.body}</p>
                <p>{item.voteScore}</p>
                <Button bsStyle='primary' bsSize='small' className='postbtn'>Edit</Button><Button bsStyle='danger' bsSize='small' className='postbtn'>Delete</Button>
            </Panel>
            ))}
        </ul>
    )
}