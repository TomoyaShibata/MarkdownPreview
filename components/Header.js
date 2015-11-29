import React    from 'react';
import ReactDom from 'react-dom';
import ModalWindow from './ModalWindow';

export default class Header extends React.Component {
    /**
     * コンストラクタ
     * @override
     */
    constructor(props) {
        super(props);

        this.state = {
            appTitle: document.title
        };
    }

    _showModalWindow() {
        ReactDom.render(
            <ModalWindow />,
            document.querySelector('#modal-window')
        );
    }

    /**
     * @override
     */
    render() {
        return (
            <div className='md-header'>
                <h1 className='md-app-title l-inline-block'>{this.state.appTitle}</h1>
                <div className='md-out-links'>
                    <span className='fa fa-info md-pointer' onClick={this._showModalWindow.bind(this)}></span>
                </div>
            </div>
        );
    }
}