import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store.js';

// add test imports below

document.addEventListener("DOMContentLoaded", () => {
  // const store = configureStore();
  const root = document.getElementById('root');
  // ReactDOM.render(<Root store={store} />, root);
  ReactDOM.render(<h1>hi</h1>, root);
});
