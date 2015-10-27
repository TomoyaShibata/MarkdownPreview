import React   from 'react'
import Comment from './Comment'

export default class CommentList extends React.Component {
    render() {
        return (
            <div className='commentList'>
                <Comment author='Tomoya Shibata'>Surface Book Abyaaa.</Comment>
                <Comment author='Zuihou'>Hatarake. by *author* comment.</Comment>
            </div>
        );
    }
}