import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
    <App></App>,
  document.getElementById('main-page')
);
// window.addEventListener("scroll", (e) => {
//   e.preventDefault();
//   window.scrollTo(0, 0);
// });

// document.addEventListener('scroll', function () { this.documentElement.scrollTop = 0; this.body.scrollTop = 0; })
// document.body.ontouchmove = (e)=>{e => e.preventDefault()}