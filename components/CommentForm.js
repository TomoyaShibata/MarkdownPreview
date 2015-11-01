import React  from 'react'
import Marked from 'marked'

/**
 * 新規コメント投稿Form
 */
export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCommentText: '# header1\r\n## header2'
        };
    }

    componentDidMount() {
        this.setState({
            newCommentTextLength: this.state.newCommentText.length
        });
    }

    _changeNewCommentText(e) {
        this.setState({
            newCommentText      : e.target.value,
            newCommentTextLength: e.target.value.length
        })
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
                    <textarea id="commentForm__box-edit__textarea" onChange={this._changeNewCommentText.bind(this)}>
                        {this.state.newCommentText}
                    </textarea>
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
