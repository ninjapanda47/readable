import React, { Component } from 'react';
import Post from './components/Post';
import Modal from 'react-modal';
import { getCategory, getAll, getCategories  } from './utils/api'
import './App.css';

class App extends Component {

state = {
 categories: [] 
}

componentDidMount() {
    getCategories().then((data) =>{this.setState({categories: data.categories});
  console.log(data.categories);
  console.log(this.state)
})

}

  render() {


    return (
      <div className='container'>
        <h1>Categories</h1>
        <div className='nav'>
        <ul className='header'>
          {this.state.categories.map((category) => (
            <li key={category.name} className='btn btn-light catbut' value ={category.name}>
              {(category.name)}
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
