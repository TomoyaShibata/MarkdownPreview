import React from 'react';

export default class About extends React.Component {
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
            <div className='md-modal-app-about'>
                <p>"Markdownpreview" makes a real-time preview from your script writent in Markdown syntax.</p>
                <p>This application has been developed just for the practice of coding with react.js. Therefore, please note that a lot of bugs may still remain.</p>
                <p>Thanks.</p>
                <ul>
                    <li>GitHub Repository</li>
                    <li className='md-list-non-style'><a href='https://github.com/tomoyashibata/MarkdownPreview' target='_blank'>https://github.com/tomoyashibata/MarkdownPreview</a></li>
                    <li>Contact</li>
                    <li className='md-list-non-style'><a href='https://twitter.com/tomoya_shibata' target='_blank'>https://twitter.com/tomoya_shibata</a></li>
                </ul>
            </div>
        );
    }
}