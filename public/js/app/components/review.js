const model = require('../model');
const clickHandler = require('../click_handler');
const Icon = require('./icon');

const ICONS = {
    'yes': 'check',
    'no': 'times',
    'skip': 'angle-double-right'
};

const LABELS = {
    'yes': 'Yes',
    'no': 'No',
    'skip': 'Skipped',
    'dnk': 'Do not know'
};

// Displays a single answer with th reset button.

const Answer = ({answer, onReset}) => {
    const decision = answer.node;
    const icon = ICONS[answer.answer];
    const label = LABELS[answer.answer];
    return (
        <div className='review-answer'>
            <span className='review-answer-text'>{answer.text}</span>
            &nbsp;<span className={`review-answer-value review-answer-${answer.answer}`}>
                {icon && <Icon name={icon}/>} {label}
            </span>
            <a href='#' className='review-reset'
                onClick={clickHandler(onReset, decision)}>
                <Icon name='recycle'/>
            </a>
        </div>
    );
};

// Topic in the list of the answers.

const Topic = ({topic}) => {
    return (
        <div className='review-answer'>
            <span className='review-answer-topic'>{topic.text}</span>
        </div>
    );
};

// Review component. Allows to reset the answers
// and download the exported PDF file.

module.exports = class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = { id: null, title: 'Untitled project' };
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    // Resets the server-side storage id for the
    // answers.

    componentWillReceiveProps(props) {
        if (props.answers !== this.props.answers) {
            this.setState({ id: null, title: 'Untitled project' });
        }
    }

    // Handles the PDF title input change.
    
    handleTitle(e) {
        this.setState({ id: null, title: e.target.value });
    }

    // Stores the answers on the server database
    // and gives a link where to access it.

    async handleSave(e) {
        e.preventDefault();
        e.stopPropagation();
        const answers = model.answers()
            .map(({text, answer, type}) => ({text, answer, type}));
        const response = await fetch('/pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                answers
            })
        });
        const data = await response.json();
        if (data.status === 'success') {
            this.setState({ id: data.data });
        }
    }

    // Closes the review.
    
    handleClose(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onReview(false);
    }

    // Dummy click handler to stop propagation.

    handleClick(e) {
        e.stopPropagation();
    }

    // Closes the review when user presses the ESC key.
    
    handleKeydown(e) {
        if (e.keyCode === ESCAPE_KEY) {
            this.props.onReview(false);
        }
    }

    // Adds the listener.

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeydown, false);
    }

    // Removes the listener.
    
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeydown);
    }

    render() {
        return (
            <div className='review-wrap' onClick={this.handleClose}>
                <div className='review appear' onClick={this.handleClick}>
                    <div className='page-header'>Review answers</div>
                    {this.props.answers.map((answer, i) => {
                        return answer.type === 'answer' ? <Answer key={`answer-${i}`} answer={answer}
                            onReset={this.props.onReset}/> : <Topic key={`answer-${i}`} topic={answer}/>;
                    })}
                    <div className='page-footer'>
                        <input type='text' className='doc-title' value={this.state.title}
                            onChange={this.handleTitle}/>
                        <a href='#' className='action-button' onClick={this.handleSave}>
                            Save</a>
                        {this.state.id && <span className='review-links'>
                                <a href={`/html/${this.state.id}`} target='_blank'>Link to HTML</a>&nbsp;/&nbsp;
                                <a href={`/pdf/${this.state.id}`} target='_blank'>Link to PDF</a>
                            </span>}                        
                    </div>
                    <div className='help-block'>
                        Click on the Save button to generate a shareable link to the results page
                        or to download a PDF file with the results. Use the title input to set the
                        document title.
                    </div>
                    <div className='help-block'>
                        The individual answers can be reset by using the <Icon name='recycle'/> button
                        on the answer. The related questions will be asked again.
                    </div>
                    <a href='#' className='action-button close-button' onClick={this.handleClose}>
                        <Icon name='times'/> Close</a>
                </div>
            </div>
        );
    }
};

const ESCAPE_KEY = 27;
