import React from 'react';

export default class ModalMenu extends React.Component {
    /**
     * コンストラクタ
     * @override
     */
    constructor(props) {
        super(props);
    }

    _changeCurrentTab(e) {
        this.props.currentTabName(e.target.textContent);
    }

    /**
     * @override
     */
    render() {
        return (
            <div className='md-modal-menu'>
                <ul className='md-modal-links md-list-non-style'>
                    <li className='md-modal-tab md-pointer' onClick={this._changeCurrentTab.bind(this)}>About</li>
                    <li className='md-modal-tab md-pointer' onClick={this._changeCurrentTab.bind(this)}>ChangeLogs</li>
                </ul>
            </div>
        );
    }
}