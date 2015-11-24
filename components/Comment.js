import React from 'react';

/**
 * コメントアイテムクラス
 */
export default class Comment extends React.Component {
    /**
     * コンストラクタ
     * @override
     */
    render() {
        return (
            <li className='md-comment'>
                <span className='md-comment-title l-block'>{this.props.commentTitle}</span>
                <span className='md-comment-dateTime l-block'>2015/11/06 9:12</span>
                <span className='md-comment-text l-block'>Comment text</span>
            </li>
        );
    }
}
