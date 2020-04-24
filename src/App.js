import React from 'react';
// import logo from './logo.svg';
// import Header from './components/Header'
// import LikeBtn from './components/Liked'
// import MapIndex from './components/MapIndex'
import Comment from './components/comment/Comment'
import './assets/css/App.css';

// const users = [
//   {
//     name: 'jack',
//     age: 13
//   },
//   {
//     name: 'tom',
//     age: 15
//   }
// ]
function App() {
  return (
    <div className="App">
      {/* <Header />
      <img src={logo} className="App-logo" alt="logo" />
      <LikeBtn />
      <MapIndex users={users} /> */}

      <Comment />
    </div>
  );
}

export default App;
