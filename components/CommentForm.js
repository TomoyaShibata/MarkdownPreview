import React      from 'react';
import Marked     from 'marked';
import _          from 'lodash';
import Moment     from 'moment';
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
            newCommentText : '',
            newCommentTitle: ''
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

    _setNewCommentTitle(e) {
        this.setState({
            newCommentTitle: e.target.value
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
        if (localStorage) {
            alert('ごめんなさいごめんなさいごめんなさいごめんなさいごめんなさいごめんなさいごめんなさいごめんなさいごめんなさいごめんなさいごめんなさいごめんなさい');
            return;
        }

        /**
         * @todo ハードコーディングを撤廃しちゃんと一意なキーで保存できるようにする
         */
        localStorage.setItem('newComment', JSON.stringify({
            commentTitle: this.state.newCommentTitle,
            commentText : this.state.newCommentText,
            updatedAt   : Moment().format('YYYY/MM/DD HH:mm:ss')
        }));
    }

    /**
     * 必要に応じてキーコマンドを実行する
     * @param  {Object} e イベントオブジェクト
     */
    _doCommand(e) {
        // TAB キーが入力されたのならば4スペースを挿入する
        if (e.keyCode === 9) {
            e.preventDefault();
            const textarea = e.target;
            const val      = textarea.value;
            const pos      = textarea.selectionStart;
            textarea.value = val.substr(0, pos) + '    ' + val.substr(pos, val.length);
            textarea.setSelectionRange(pos + 4, pos + 4);
        }
    }

    /**
     * @override
     */
    render() {
        const markedCommentText = Marked(this.state.newCommentText, { sanitize: true });
        const lineNumbers       = this.state.newCommentTextLines;

        // @todo タイトル入力実装は確定まで隠蔽
        // <input type='text' className='md-input-commment-title l-block' onBlur={this._setNewCommentTitle.bind(this)} />

        return (
            <div id='commentForm' className='l-flex'>
                <div id='commentForm__wrapper-edit' refs='commentFormWrapperEdit'>
                    <h2 className='md-heading-editor'>Edit area</h2>
                    <div id='commentForm__wrapper-edit__box-edit' className='l-flex'>
                        <div id='commentForm__wrapper-edit__box-edit__box-line-numbers'>
                            {_.range(0, this.state.newCommentTextLines).map(l => <span className='l-line-number'>{l + 1}</span>)}
                        </div>
                        <textarea id='commentForm__wrapper-edit__box-edit__textarea'
                                  onChange={this._changeNewCommentText.bind(this)}
                                  onKeyDown={this._doCommand.bind(this)}/>
                    </div>
                </div>
                <div id='commentForm__box-preview'>
                    <h2 className='md-heading-preview'>Realtime preview</h2>
                    <div className='md-preview'>
                        <span dangerouslySetInnerHTML={{__html: markedCommentText}} />
                    </div>
                </div>
            </div>
        );
    }
}
