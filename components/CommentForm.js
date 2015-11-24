import React  from 'react';
import Marked from 'marked';
import _      from 'lodash';

/**
 * 新規コメント作成フォームクラス
 */
export default class CommentForm extends React.Component {
    /**
     * コンストラクタ
     * @override
     */
    constructor(props) {
        super(props);

        /**
         * @type {Object}
         */
        this.state = {
            newCommentText: ''
        };
    }

    /**
     * @override
     */
    componentDidMount() {
        this.setState({
            newCommentTextLength: this.state.newCommentText.length,
            newCommentTextLines : this._getTextLines(this.state.newCommentText)
        });
    }

    /**
     * 入力されたコメントを state に反映する
     * @param  {Object} e イベントオブジェクト
     */
    _changeNewCommentText(e) {
        const commentText = e.target.value;

        this.setState({
            newCommentText      : commentText,
            newCommentTextLength: commentText.length,
            newCommentTextLines : this._getTextLines(commentText)
        });
    }

    /**
     * 入力されたコメントの行数を返却する
     * @param  {String} s コメント
     * @return {Number}   コメントの行数
     */
    _getTextLines(s) {
        return s.split('\n').length;
    }

    /**
     * コメントを localStorage に保存する
     */
    _saveNewComment() {
        /**
         * @todo ハードコーディングを撤廃しちゃんと一意なキーで保存できるようにする
         */
        localStorage.setItem('newComment', this.state.newCommentText);
    }

    /**
     * @override
     */
    render() {
        const markedCommentText = Marked(this.state.newCommentText, { sanitize: true });
        const lineNumbers       = this.state.newCommentTextLines;

        return (
            <div id="commentForm" className="l-inline-block">
                <div id="commentForm__box-edit-tag">
                    <input type="text" />
                </div>
                <div id="commentForm__wrapper-edit" className="l-horizontal">
                    <h2>New comment</h2>
                    <div id="commentForm__wrapper-edit__box-edit">
                        <div id="commentForm__wrapper-edit__box-edit__box-line-numbers" className="l-horizontal">
                            {_.range(0, this.state.newCommentTextLines).map(l => <span className="l-line-number">{l + 1}</span>)}
                        </div>
                        <textarea id="commentForm__wrapper-edit__box-edit__textarea" onChange={this._changeNewCommentText.bind(this)} />
                    </div>
                </div>
                <div id="commentForm__box-preview" className="l-horizontal">
                    <h2>Realtime preview</h2>
                    <span dangerouslySetInnerHTML={{__html: markedCommentText}} />
                </div>
                <button type="button" onClick={this._saveNewComment.bind(this)}>Save</button>
            </div>
        );
    }
}
