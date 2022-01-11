import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index';
import { addPost, updateNewPostText } from './redax/state';


export let rerender = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

