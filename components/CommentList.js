import React   from 'react';
import Comment from './Comment';
import _       from 'lodash';

export default class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'CommentList';
    }

    render() {
        return (
            <nav id="nav" className="l-inline-block">
                <ul id="nav__comment-list">
                    <li className="md-comment">
                        <input type="text" className="md-keyword-search-comment"/>
                    </li>
                    {_.range(0, 10).map(() => <Comment />)}
                </ul>
            </nav>
        );
    }
}