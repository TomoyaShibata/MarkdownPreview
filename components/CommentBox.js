import React       from  'react';
import CommentList from  './CommentList';
import CommentForm from  './Commentform';
import SaveButtones from './SaveButtones';

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
            <div id='container'>
                <div className='commentBox l-flex'>
                    <CommentForm />
                </div>
            </div>
        );
    }
}