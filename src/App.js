import React, { Component } from 'react';
import Post from './components/Post';
import Modal from 'react-modal';
import { getCategory, getAll  } from './utils/api'
import './App.css';

class App extends Component {
  render() {
    const categories = ['React','Redux','Udacity']

    getAll(this.value)
      .then((data) =>{console.log(data)})  

    return (
      <div className='container'>
        <h1>Categories</h1>
        <div className='nav'>
                  <ul className='header'>
          {categories.map((category) => (
            <li key={category} className='btn btn-default catbut' value ={category}>
              {(category)}
            </li>
          ))}
        </ul>
        </div>
        <div className='post-container'>
          <Post/>

        </div>

      </div>
    );
  }
}

export default App;
