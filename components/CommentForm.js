import React from 'react'

export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickCount: 0
        };
    }

    _submitComment(e) {
        this.setState({
            clickCount: this.state.clickCount + 1
        });
    }

    render() {
        return (
            <div className='commentForm'>
                This is CommentForm.
                <button onClick={this._submitComment.bind(this)}>Submit comment</button>
                <p>button click count {this.state.clickCount}</p>
            </div>
        );
    }
}
