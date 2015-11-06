import React from 'react';

export default class Comment extends React.Component {
    render() {
        return (
            <li className="md-comment">
                <span className="md-comment-title">Comment title</span>
                <span className="md-comment-dateTime">2015/11/06 9:12</span>
                <span className="md-comment-text l-block">Comment text</span>
            </li>
        );
    }
}
