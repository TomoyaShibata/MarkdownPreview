import React       from 'react';
import CommentList from './CommentList'
import CommentForm from './Commentform'

export default class CommentBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='commentBox'>
                <h2>User Comments.</h2>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
}