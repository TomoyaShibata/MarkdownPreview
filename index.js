import React      from 'react';
import ReactDom   from 'react-dom';
import CommentBox from './components/CommentBox';

ReactDom.render(
     <CommentBox />,
     document.querySelector('#container')
);