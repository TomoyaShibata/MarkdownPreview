import React   from 'react';
import Comment from './Comment';
import _       from 'lodash';

export default class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'CommentList';

        this.state = {
            comments: [
                { commentTitle: 'KanColle' },
                { commentTitle: 'FateGo' },
                { commentTitle: 'DereSta'  }
            ],
            searchedComments: [
                { commentTitle: 'KanColle' },
                { commentTitle: 'FateGo' },
                { commentTitle: 'DereSta'  }
            ]
        };
    }

    _changeSearchWord(e) {
        const searchWord = e.target.value;

        this.setState({
            searchedComments: _.filter(this.state.comments, c => {
                return c.commentTitle.includes(searchWord);
            })
        });
    }

    render() {
        return (
            <nav id='nav' className='l-inline-block'>
                <ul id='nav__comment-list'>
                    <li className='md-comment'>
                        <input type='text' className='md-keyword-search-comment' onChange={this._changeSearchWord.bind(this)} />
                    </li>
                    {_.map(this.state.searchedComments, s => <Comment commentTitle={s.commentTitle} /> )}
                </ul>
            </nav>
        );
    }
}