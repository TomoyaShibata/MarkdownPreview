import React              from 'react';
import Comment            from './Comment';
import _                  from 'lodash';
import CSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * コメントアイテム一覧クラス
 */
export default class CommentList extends React.Component {
    /**
     * コンストラクタ
     * @override
     */
    constructor(props) {
        super(props);
        /**
         * @type {String}
         */
        this.displayName = 'CommentList';

        /**
         * @type {Object}
         */
        this.state = {
            comments: [
                { commentTitle: 'Comm1' },
                { commentTitle: 'Comm1-1' },
                { commentTitle: 'Comm1-2' },
                { commentTitle: 'Comm1-3' },
                { commentTitle: 'Comm1-4' },
                { commentTitle: 'Comm1-5' },
                { commentTitle: 'Comm1-6' },
                { commentTitle: 'Comm1-7' },
                { commentTitle: 'Comm1-8' },
                { commentTitle: 'Comm1-9' },
                { commentTitle: 'Comm2-1' },
                { commentTitle: 'Comm2-2' },
                { commentTitle: 'Comm2-3' },
                { commentTitle: 'Comm2-4' }
            ],
            searchedComments: [
                { commentTitle: 'Comm1' },
                { commentTitle: 'Comm1-1' },
                { commentTitle: 'Comm1-2' },
                { commentTitle: 'Comm1-3' },
                { commentTitle: 'Comm1-4' },
                { commentTitle: 'Comm1-5' },
                { commentTitle: 'Comm1-6' },
                { commentTitle: 'Comm1-7' },
                { commentTitle: 'Comm1-8' },
                { commentTitle: 'Comm1-9' },
                { commentTitle: 'Comm2-1' },
                { commentTitle: 'Comm2-2' },
                { commentTitle: 'Comm2-3' },
                { commentTitle: 'Comm2-4' }
            ]
        };
    }

    /**
     * コメントアイテムをインクリメンタルサーチする
     * @param  {Object} e イベントオブジェクト
     */
    _searchIncremental(e) {
        const searchWord = e.target.value;

        this.setState({
            searchedComments: _.filter(this.state.comments, c => {
                return c.commentTitle.includes(searchWord);
            })
        });
    }

    /**
     * @override
     */
    render() {
        // @todo 以下の要領でアニメーションしたときインクリメンタルサーチが崩壊する。調査。
        // <CSSTransitionGroup transitionName='am-fade-opacity'>
        //     {this.state.searchedComments.map(s => <Comment key={s.commentTitle} commentTitle={s.commentTitle} />)}
        // </CSSTransitionGroup>

        return (
            <nav id='nav' className='l-inline-block'>
                <ul id='nav__comment-list'>
                    <li className='md-comment'>
                        <input type='text' className='md-keyword-search-comment' onChange={this._searchIncremental.bind(this)} />
                        <span className="fa fa-search"></span>
                    </li>
                    {this.state.searchedComments.map(s => <Comment key={s.commentTitle} commentTitle={s.commentTitle} />)}
                </ul>
            </nav>
        );
    }
}