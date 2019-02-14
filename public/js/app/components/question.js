const clickHandler = require('../click_handler');
const Icon = require('./icon');
const Branch = require('../schema/branch');

// Helper to toggle animation class
// on the given component.

const animateAppear = (component) => {
    const dom = ReactDOM.findDOMNode(component);
    window.requestAnimationFrame(() => {
        dom.classList.remove('appear');
        window.requestAnimationFrame(() => {
            dom.classList.add('appear');
        });
    });
};

// Helper to display a branch decision.

class BranchQuestion extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    // Re-triggers animation when the displayed
    // decision changes.

    componentDidUpdate(prevProps) {
        if (prevProps.decision !== this.props.decision) {
            animateAppear(this);
        }
    }

    render() {
        const { decision, onValue } = this.props;
        return (
            <div className='choice-list appear'>
                { decision.choices.map((choice, i) =>
                    <a href='#' key={`choice-${i}`} className='choice-block'
                        onClick={clickHandler(onValue, i)}>{choice.text}</a>
                )}
            </div>
        );
    }
}

// Helper to display a yes/no decision.

class SingleQuestion extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    // Re-triggers animation when the displayed
    // decision changes.

    componentDidUpdate(prevProps) {
        if (prevProps.decision !== this.props.decision) {
            animateAppear(this);
        }
    }

    render() {
        const { decision, onValue } = this.props;
            return (
                <div className='choice-list appear'>
                    <a href='#' className='choice-block'
                        onClick={clickHandler(onValue, 'yes')}>Yes</a>
                    <a href='#' className='choice-block'
                        onClick={clickHandler(onValue, 'no')}>No</a>
                </div>
            );
    }
}

class Title extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    // Re-triggers animation when the displayed
    // decision changes.

    componentDidUpdate(prevProps) {
        if (prevProps.title !== this.props.title) {
            animateAppear(this);
        }
    }

    render() {
        return (<div className='page-header appear'>{this.props.title}</div>);
    }
}

// Displays the explanation why the current
// question was asked.

const Why = ({query}) => {
    const answers = query.why();
    let text = null;
    if (answers.length > 0) {
        const reason = answers[0];
        if (reason.node.type === 'branch') {
            text = `This is asked because you chose the answer "${reason.text}".`;
        } else if (reason.node.type === 'question') {
            text = `This is asked because you answered "yes" to "${reason.text}".`;
        }
    } else {
        text = 'This question is always asked.';
    }
    return (<div className='why-block'>{text}</div>);
};

// Displays the help block.

const Help = () => {
    return (
        <div className='help-block'>
            The questions can be skipped. The answers can be reviewed and
            changed later. The system will only ask revelant questions
            depending on the previous answers.
        </div>
    );
};

module.exports = ({query, onValue, onReview}) => {
    const decision = query.question;
    const title = decision.choices ? 'Choose an answer' : decision.text;
    const skipValue = decision.type === 'branch' ? Branch.SKIPPED : 'skip';
    const dnkValue = decision.type === 'branch' ? Branch.DNK : 'dnk';
    return (
        <div className='page'>
            <Title title={title}/>
            <div className='page-body'>
                { decision.type === 'branch' && <BranchQuestion decision={decision} onValue={onValue}/>}
                { decision.type === 'question' && <SingleQuestion decision={decision} onValue={onValue}/>}
                <Why query={query}/>
            </div>                
            <div className='page-footer'>
                <a href='#' className='action-button' onClick={clickHandler(onValue, skipValue)}>
                    Skip</a>
                <a href='#' className='action-button' onClick={clickHandler(onValue, dnkValue)}>
                    Do not know</a>
                <a href='#' className='action-button' onClick={clickHandler(onReview, true)}>
                    Review</a>
            </div>
            <Help/>
        </div>
    );
};
