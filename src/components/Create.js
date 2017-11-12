import React from 'react'

export default function Create({ category, onSelect }) {

    return (
        <div className='card'>
            <h3 className='card-header'>New Post</h3>
            <div className='form-group'>
                <label>Title</label>
                <input type='text' className='form-control'></input>
                <label>Author</label>
                <input type='text' className='form-control'></input>
                <label>Category</label>
                <select className='form-control'>
                    <option>React</option>
                    <option>Redux</option>
                    <option>Udacity</option>
                </select>
                <textarea type='text' className='form-control' rows='3'></textarea>
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </div>
    )
}