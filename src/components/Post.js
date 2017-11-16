import React from 'react'
import Comment from './Comment';

export default function Post({ post }) {
    return (
        <ul className='postlist'>
            {post && post.map((item) => (
                <li className='panel panel-default post' key={item.id}>
                    <div className='panel-heading'>Title: {item.title}</div>
                    <div className='panel-body'>
                        <p>Author: {item.author}</p>
                        <p>{item.body}</p>
                        <p>Votes: {item.voteScore}</p>
                        <a href="#" className='btn btn-info postbtn'>Edit</a><a href="#" className='btn btn-danger postbtn'>Delete</a>
                        <p>{item.commentCount} comments</p>
                    </div>
                </li>
            )

            )}

        </ul>
    )
}
