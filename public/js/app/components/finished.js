// This page is shown when the questionnaire
// has exchausted all questions.

module.exports = class FinishPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.review = this.review.bind(this);
    }

    reset(e) {
        e.preventDefault();
        if (confirm('Start over?')) {
            window.location = '/questions';
        }
    }

    review(e) {
        e.preventDefault();
        this.props.onReview(true);
    }

    render() {
        return (
            <div className='page'>
                <div className='page-header'>Thank you</div>
                <div className='page-body'>
                    <p>
                        Thank you for the answers. You can view them using the button below.
                        The answers can be selectively reset and the related questions will be
                        asked again.
                    </p>
                </div>
                <div className='page-footer'>
                    <a href='#' className='action-button'
                        onClick={this.review}>Answers</a>
                    <a href='#' className='action-button'
                        onClick={this.reset}>Start over</a>
                </div>
                <div className='page-body'>
                    <p>
                        You can optionally save the answers and have a shareable link
                        and a downloadable PDF file.
                    </p>
                    <p>
                        Want to know how this wizard was built or need a
                        similar solution? Have you got suggestions to add
                        more questions or were some of the questions inapproriate? <a
                        href='https://rlaanemets.com/post/show/contacts'
                            target='_blank'>Contact!</a>.
                    </p>
                </div>
            </div>
        );
    }
};
