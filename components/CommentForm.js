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
        var lineNumbers       = this.state.newCommentTextLines;

        var doms = [];
        for (var i = 1; i <= lineNumbers; i++) {
            doms.push(<span className="l-line-number">{i}</span>);
        }

        return (
            <div id="commentForm">
                <div id="commentForm__box-edit-tag">
                    <input type="text" />
                </div>
                <div id="commentForm__wrapper-edit" className="md-horizontal">
                    <h2>New comment</h2>
                    <div id="commentForm__wrapper-edit__box-edit">
                        <div id="commentForm__wrapper-edit__box-edit__box-line-numbers" className="md-horizontal">
                            {doms}
                        </div>
                        <textarea id="commentForm__wrapper-edit__box-edit__textarea" onChange={this._changeNewCommentText.bind(this)} />
                    </div>
                </div>
                <div id="commentForm__box-preview" className="md-horizontal">
                    <h2>Realtime preview</h2>
                    <span dangerouslySetInnerHTML={{__html: markedCommentText}} />
                </div>
            </div>
        );
    }
}
