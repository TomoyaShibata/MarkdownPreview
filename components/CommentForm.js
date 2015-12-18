import React                from 'react';
import Marked               from 'marked';
import _                    from 'lodash';
import Moment               from 'moment';
import ClassNames           from 'classnames';
import StringUtils          from '../lib/stringUtils';

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
            newCommentText      : ``,
            newCommentTitle     : ``,
            newCommentTextHeight: `50px`,
            isClick             : false
        };
    }

    /**
     * @override
     */
    componentDidMount() {
        this.setState({
            newCommentTextLength: this.state.newCommentText.length,
            newCommentTextLines : StringUtils.getTextLines(this.state.newCommentText)
        });

    }

    /**
     * 入力されたコメントを state に反映する
     * @param  {Object} target textarea 要素
     */
    _changeNewCommentText({target}) {
        const commentText = target.value;

        this.setState({
            newCommentText      : commentText,
            newCommentTextLength: commentText.length,
            newCommentTextLines : StringUtils.getTextLines(commentText)
        });

        this.setState({
            newCommentTextHeight: `${this.state.newCommentTextLines*50}px`
        });
    }

    _setNewCommentTitle(e) {
        this.setState({
            newCommentTitle: e.target.value
        });
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

    _isCusorOnEdge(e) {
        this._moveCenterLine(e);
    }

    _onMouseDown({clientX}) {
        this.setState({
            isClick     : true,
            posMouseDown: clientX
        });
    }

    _onMouseUp() {
        this.setState({
            isClick : false,
            isActive: false
        });
    }

    _moveCenterLine(e) {
        if (!this.state.isActive) {
            // マウスカーソルが境界線の左右5pxに存在するか判定する
            const posRightEdge = this.refs.commentFormWrapperEdit.offsetWidth;
            const posLeftEdge  = this.refs.commentFormWrapperPreview.offsetLeft;
            if (!((posRightEdge - e.clientX) < 10) || !((e.clientX - posLeftEdge) < 5)) {
                this.setState({ moveCursor: false });

                if (this.state.isActive) {
                    e.preventDefault();
                }

                return;
            }

            this.setState({ moveCursor: true });

            if (!this.state.isClick) { return; }

            e.preventDefault();
            this.setState({ isActive: true });

            // const beforeWidth = this.refs.commentFormWrapperEdit.style.width ? Number(this.refs.commentFormWrapperEdit.style.width.replace('px', ''))
            //                                                                  : this.refs.commentFormWrapperEdit.offsetWidth;
            // this.refs.commentFormWrapperEdit.style.width = (beforeWidth + (this.state.posMouseDown - beforeWidth)) + 'px';

            if ((this.refs.commentForm.offsetWidth - e.clientX) < 250 || e.clientX < 200) {
                return;
            }

            this.refs.commentFormWrapperEdit.style.width = `${e.clientX}px`;
            return;
        }

        if ((this.refs.commentForm.offsetWidth - e.clientX) < 250 || e.clientX < 200) {
            return;
        }

        e.preventDefault();
        this.refs.commentFormWrapperEdit.style.width = `${e.clientX}px`;
    }

    /**
     * @override
     */
    render() {
        const markedCommentText = Marked(this.state.newCommentText, { sanitize: true });
        const lineNumbers       = this.state.newCommentTextLines;
        let   heightTextArea    = this.state.newCommentTextHeight;

        if (this.state.newCommentTextLines === 0) {
            heightTextArea = '100%';
        }

        const classNameCommentForm = ClassNames({
            'l-flex'     : true,
            'is-e-resize': this.state.moveCursor
        });

        // @todo タイトル入力実装は確定まで隠蔽
        // <input type='text' className='md-input-commment-title l-block' onBlur={this._setNewCommentTitle.bind(this)} />

        return (
            <div id='commentForm'
                 ref='commentForm'
                 className={classNameCommentForm}
                 onKeyDown={this._doCommand.bind(this)}
                 onMouseDown={this._onMouseDown.bind(this)}
                 onMouseUp={this._onMouseUp.bind(this)}
                 onMouseLeave={this._onMouseUp.bind(this)}
                 onMouseMove={this._isCusorOnEdge.bind(this)}>
                <div id='commentForm__wrapper-edit' ref='commentFormWrapperEdit'>
                    <h2 className='md-heading-editor'>Edit area</h2>
                    <div id='commentForm__wrapper-edit__box-edit' className='l-flex'>
                        <textarea className='md-textarea-markdown'
                                  ref='textareaCommentForm'
                                  onChange={this._changeNewCommentText.bind(this)} />
                    </div>
                </div>
                <div id='commentForm__box-preview' ref='commentFormWrapperPreview'>
                    <h2 className='md-heading-preview'>Realtime preview</h2>
                    <div className='md-preview'>
                        <span dangerouslySetInnerHTML={{__html: markedCommentText}} />
                    </div>
                </div>
            </div>
        );
    }
}