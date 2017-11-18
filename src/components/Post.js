import React from 'react'
import Comment from './Comment';
import { Panel, Button } from 'react-bootstrap';

export default function Post({ post }) {
    return (
        <ul className='postlist'>
            {post && post.map((item) => (
                <Panel className='post' key={item.id} header={item.title}>            
                        <p>Author: {item.author}</p>
                        <p>{item.body}</p>
                        <p>Votes: {item.voteScore}</p>
                        <Button bsStyle='primary' bsSize='small' className='postbtn'>Edit</Button><Button bsStyle='danger' bsSize='small'className='postbtn'>Delete</Button>
                        <p>{item.commentCount} comments</p>
                </Panel>
            )

            )}

        </ul>
    )
}
