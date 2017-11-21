import React from 'react'
import Comment from './Comment';
import { Panel, Button, Label } from 'react-bootstrap';

export default function Post({ post, openModal}) {

    return (
        <ul className='postlist'>
            {post && post.map((item) => (
                <Panel className='post' key={item.id} header={item.title}>
                    <h4>Author: {item.author}</h4>
                    <p>{item.body}</p>
                    <h4><Label>{item.voteScore} votes</Label></h4>
                    <Button bsStyle='primary' bsSize='small' className='postbtn'>Edit</Button><Button bsStyle='danger' bsSize='small' className='postbtn'>Delete</Button>
                    <div></div>
                    <Button bsSize='small' onClick={() => {console.log(item.id); openModal(item.id)}}>{item.commentCount} comments</Button>
                </Panel>
            )

            )}

        </ul>
    )
}
