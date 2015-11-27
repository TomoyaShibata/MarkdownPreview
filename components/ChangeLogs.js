import React from 'react';

export default class ChangeLogs extends React.Component {
    /**
     * コンストラクタ
     * @override
     */
    constructor(props) {
        super(props);
    }

    /**
     * @override
     */
    render() {
        return (
            <div className='md-modal-change-logs'>
                <h2>v.0.1.0 - 2015.11.27</h2>
                <ul>
                    <li>Added About screen.</li>
                    <li>Added ChangeLogs screen.</li>
                    <li>Added the indent feature. Four spaces are input s When you enter the <code>Tab key</code>.</li>
                    <li>Fine adjustment of the design.</li>
                </ul>
                <h2>v.0.0.1 - 2015.11.25</h2>
                <p>First release.</p>
            </div>
        );
    }
}