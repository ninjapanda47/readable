import React from 'react'
import Comment from './Comment';
import { Panel, Button, Label, Glyphicon } from 'react-bootstrap';

export default function Post({ posts, openModal, editPostOpen, deletePost, updateVote, detailView }) {

    return (
        <ul className='postlist'>
            {posts && posts.map((item) => (
                <Panel className='post' key={item.id} header={item.title}>
                    <h4>Author: {item.author}<Button bsStyle='primary' bsSize='small' className='detailbtn' onClick={() => {detailView((item.id), (item.category))}} >Detailed View</Button></h4>
                    <p>{item.body}</p>
                    <h4><Label className='vote'>{item.voteScore} votes</Label><Glyphicon glyph='glyphicon glyphicon-plus' onClick={() => {updateVote(item.id, 'upVote')}} /><Glyphicon glyph='glyphicon glyphicon-minus' onClick={() => {updateVote(item.id, 'downVote')}}/></h4>
                    <Button bsStyle='primary' bsSize='small' className='postbtn' onClick={() => {editPostOpen(item.id)}}>Edit</Button><Button bsStyle='danger' bsSize='small' className='postbtn' onClick={() => {deletePost(item.id)}}>Delete</Button>
                    <div></div>
                    <Button bsSize='small' onClick={() => {openModal(item.id)}}>{item.commentCount} comments</Button>
                </Panel>
            )

            )}

        </ul>
    )
}
