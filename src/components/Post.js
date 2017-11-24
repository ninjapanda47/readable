import React from 'react'
import Comment from './Comment';
import { Panel, Button, Label, Glyphicon } from 'react-bootstrap';

export default function Post({ posts, openModal}) {

    return (
        <ul className='postlist'>
            {posts && posts.map((item) => (
                <Panel className='post' key={item.id} header={item.title}>
                    <h4>Author: {item.author}</h4>
                    <p>{item.body}</p>
                    <h4><Label className='vote'>{item.voteScore} votes</Label><Glyphicon glyph='glyphicon glyphicon-plus' /><Glyphicon glyph='glyphicon glyphicon-minus' /></h4>
                    <Button bsStyle='primary' bsSize='small' className='postbtn'>Edit</Button><Button bsStyle='danger' bsSize='small' className='postbtn'>Delete</Button>
                    <div></div>
                    <Button bsSize='small' onClick={() => {console.log(item.id); openModal(item.id)}}>{item.commentCount} comments</Button>
                </Panel>
            )

            )}

        </ul>
    )
}
