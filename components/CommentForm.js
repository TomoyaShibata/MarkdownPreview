import React    from 'react';
import Marked   from 'marked';

/**
 * 新規コメント投稿Form
 */
export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCommentText : ''
        };
    }

    componentDidMount() {
        this.setState({
            newCommentTextLength: this.state.newCommentText.length,
            newCommentTextLines : this._getTextLines(this.state.newCommentText)
        });
    }

    _changeNewCommentText(e) {
        var commentText = e.target.value

        this.setState({
            newCommentText      : commentText,
            newCommentTextLength: commentText.length,
            newCommentTextLines : this._getTextLines(commentText)
        })
    }

    _getTextLines(s) {
        return s.split('\n').length;
    }

    render() {
        var markedCommentText = Marked(this.state.newCommentText, { sanitize: true });

        return (
            <div id="commentForm">
                <div id="commentForm__box-edit-tag">
                    <input type="text" />
                </div>
                <div id="commentForm__box-edit">
                    <h2>New comment</h2>
                    <textarea id="commentForm__box-edit__textarea" onChange={this._changeNewCommentText.bind(this)} />
                </div>
                <div id="commentForm__box-preview">
                    <h2>Realtime preview</h2>
                    <span dangerouslySetInnerHTML={{__html: markedCommentText}} />
                </div>
                <span>文字数 {this.state.newCommentTextLength}</span>
            </div>
        );
    }
}
