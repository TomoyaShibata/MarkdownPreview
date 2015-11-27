import React       from 'react';
import ReactDom    from 'react-dom';
import CommentBox  from './components/CommentBox';
import Header      from './components/Header';

ReactDom.render(
     <Header />,
     document.querySelector('header')
);
ReactDom.render(
     <CommentBox />,
     document.querySelector('#container')
);