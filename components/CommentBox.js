import React       from 'react';
import CommentList from './CommentList';
import CommentForm from './Commentform';

/**
 * コメントボックスクラス
 */
export default class CommentBox extends React.Component {
    /**
     * コンストラクタ
     * @override
     */
    constructor(props) {
        super(props);
    }

    /**
     * @override
     */
    render() {
        return (
            <div className='commentBox l-flex'>
                <CommentForm />
            </div>
        );
    }
}