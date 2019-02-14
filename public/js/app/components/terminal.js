const clickHandler = require('../click_handler');

// Handles terminal nodes.
// Makes it possible to reset the answer leading
// to the terminal.

module.exports = ({query, onReview, onReset}) => {
    const answers = query.why();
    const last = answers[0];
    const terminal = query.question;
    let reason = null;
    if (last.node.type === 'branch') {
        reason = `This is displayed because you chose the answer "${last.text}".`;
    } else if (last.node.type === 'question') {
        reason = `This is displayed because you answered "yes" to "${last.text}".`;
    }
    return (
        <div className='page'>
            <div className='page-header'>Thank You</div>
            <div className='page-body'>
                {terminal.text}                
            </div>
            <div className='why-block'>{reason}</div>
            <div className='page-footer'>
                <a href='#' className='action-button'
                    onClick={clickHandler(onReview, true)}>Review</a>
                <a href='#' className='action-button'
                    onClick={clickHandler(onReset, last.node)}>Back</a>
            </div>
            <div className='help-block'>
                You can either finish the questionnaire here or you can reset the
                answer that caused this message to be displayed (press "Back").
                In that case the question will be asked again.
            </div>
        </div>
    );
};
