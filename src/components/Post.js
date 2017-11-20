import React from 'react'
import Comment from './Comment';
import { Panel, Button, Label } from 'react-bootstrap';

export default function Post({ post }) {
    console.log(this)
    return (
        <ul className='postlist'>
            {post && post.map((item) => (
                <Panel className='post' key={item.id} header={item.title}>
                    <p>Author: {item.author}</p>
                    <p>{item.body}</p>
                    <h4><Label>{item.voteScore} votes</Label></h4>
                    <Button bsStyle='primary' bsSize='small' className='postbtn'>Edit</Button><Button bsStyle='danger' bsSize='small' className='postbtn'>Delete</Button>
                    <div></div>
                    <h4><Label bsStyle="default">{item.commentCount} comments</Label></h4>
                    <div></div>
                    <Button bsStyle='info' bsSize='small' className='addcommentbtn'>Add a Comment</Button>
                </Panel>
            )

            )}

        </ul>
    )
}
