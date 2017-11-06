import React from 'react'
import Comment from './Comment';

export default function Post({ category, onSelect }) {

    return (
        <ul className='postlist'>
            <li className="panel panel-default post">
                    <div className="panel-heading">Title</div>
                    <div className="panel-body">
                        <h4>Author</h4>
                        <p>Body</p>
                        <span className="glyphicon glyphicon-thumbs-up vote" aria-hidden="true"></span>vote<span className="glyphicon glyphicon-thumbs-down vote" aria-hidden="true"></span>
                        <p></p>
                        <a href="#" className="btn btn-info postbtn">Edit</a><a href="#" className="btn btn-danger postbtn">Delete</a>
                        <h4>comments</h4>
                    </div>
            </li>
        </ul>
    )
}
