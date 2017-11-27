import React from 'react'
import Comment from './Comment';
import { Panel, Button, Label, Glyphicon } from 'react-bootstrap';

export default function Post({ posts, openModal, deletePost, updateVote}) {

    return (
        <ul className='postlist'>
            {posts && posts.map((item) => (
                <Panel className='post' key={item.id} header={item.title}>
                    <h4>Author: {item.author}</h4>
                    <p>{item.body}</p>
                    <h4><Label className='vote'>{item.voteScore} votes</Label><Glyphicon glyph='glyphicon glyphicon-plus' onClick={() => {updateVote(item.id, 'upVote')}} /><Glyphicon glyph='glyphicon glyphicon-minus' onClick={() => {updateVote(item.id, 'downVote')}}/></h4>
                    <Button bsStyle='primary' bsSize='small' className='postbtn'>Edit</Button><Button bsStyle='danger' bsSize='small' className='postbtn' onClick={() => {console.log(item.id); deletePost(item.id)}}>Delete</Button>
                    <div></div>
                    <Button bsSize='small' onClick={() => {console.log(item.id); openModal(item.id)}}>{item.commentCount} comments</Button>
                </Panel>
            )

            )}

        </ul>
    )
}
