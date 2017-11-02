import React from 'react'

export default function Comment({ category, onSelect }) {

    return (
        <ul className='comment'>
            <div class="panel panel-default">
                <div class="panel-body">
                    <h4>Author</h4>
                    <p>description</p>
                     <h4>Upvote</h4>
                </div>
            </div>

        </ul>
    )
}