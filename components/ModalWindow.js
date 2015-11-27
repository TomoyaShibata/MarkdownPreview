import React      from 'react';
import ModalMenu  from './ModalMenu';
import About      from './About';
import ChangeLogs from './ChangeLogs';
import ReactDom   from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ClassNames from 'classnames';

export default class ModalWindow extends React.Component {
    /**
     * コンストラクタ
     * @override
     */
    constructor(props) {
        super(props);

        this.state = {
            tabName      : 'About',
            isOpacityZero: false
        };
    }

    _destroy() {
        this._setTimeoutAsync()
            .then(() => ReactDom.unmountComponentAtNode(document.querySelector('#modal-window')));
    }

    _hige() {
    }

    _setTimeoutAsync() {
        this.setState({ isOpacityZero: true });
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    _setNewCurrentTabName(tabName) {
        this.setState({ tabName: tabName });
    }

    _doCommand(e) {
        if (e.keyCode === 27) {
            this._destroy();
        }
    }

    componentDidMount() {
        document.body.addEventListener('keydown', this._doCommand.bind(this));
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this._doCommand.bind(this));
    }

    /**
     * @override
     */
    render() {
        let modalContent;
        if (this.state.tabName === 'Setting') {
            modalContent = (
                <div className='md-modal-app-about'>
                    Setting...
                </div>
            );
        } else if (this.state.tabName === 'About') {
            modalContent = <About />;
        } else if (this.state.tabName === 'ChangeLogs') {
            modalContent = <ChangeLogs />;
        }

        const classNameModalWindow = ClassNames({
            'md-modal-window': true,
            'l-flex         ': true,
            'is-opacity-zero': this.state.isOpacityZero
        });

        return (
            <ReactCSSTransitionGroup transitionName='example'
                                     transitionEnter={false}
                                     transitionAppear={true}
                                     transitionAppearTimeout={10000}
                                     transitionLeaveTimeout={10000}>
                <div className={classNameModalWindow}>
                    <ModalMenu currentTabName={this._setNewCurrentTabName.bind(this)} />
                    <div className='md-modal-content'>
                        <h1 className='md-modal-title'>{this.state.tabName}</h1>
                        <span className='fa fa-times md-modal-close-button md-pointer' onClick={this._destroy.bind(this)}></span>
                        {modalContent}
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}