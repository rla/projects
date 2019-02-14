const Question = require('./components/question');
const Review = require('./components/review');
const Finished = require('./components/finished');
const Terminal = require('./components/terminal');
const model = require('./model');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 'question',
            query: model.ask(),
            review: false,
            model: model,
            answers: []
        };
        this.handleValue = this.handleValue.bind(this);
        this.handleReview = this.handleReview.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    // Handles choice for the mutual question case.

    handleValue(value) {
        this.state.query.answer(value);
        const query = model.ask();
        if (query) {
            if (query.question.type === 'terminal') {
                this.setState({ page: 'terminal', query });
            } else {
                this.setState({ query });
            }
        } else {
            this.setState({ page: 'finished' });
        }
    }

    // Shows the review dialog.
    
    handleReview(visible) {
        this.setState({ review: visible, answers: model.answers() });
    }

    handleReset(node) {
        model.reset(node);
        this.setState({ query: model.ask(), page: 'question', review: false });
    }

    // Renders the application.

    render() {
        return (
            <div className='container'>
                { this.state.page === 'question' &&
                    <Question query={this.state.query}
                        onValue={this.handleValue} onReview={this.handleReview}/>
                }
                { this.state.page === 'finished' &&
                    <Finished onReview={this.handleReview}/>
                }
                { this.state.page === 'terminal' &&
                    <Terminal query={this.state.query}
                        onReview={this.handleReview} onReset={this.handleReset}/>
                }
                { this.state.review &&
                    <Review answers={this.state.answers}
                        onReview={this.handleReview} onReset={this.handleReset}/> }
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
