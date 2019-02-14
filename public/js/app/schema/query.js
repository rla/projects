// Question paired with trace.

module.exports = class Query {

    constructor(decision, trace) {
        this.question = decision;
        this.trace = trace;
    }

    // Helper method to record the answer.

    answer(value) {
        this.question.value = value;
    }

    // Array of answers leading to this
    // question.

    why() {
        const answers = [];
        let trace = this.trace;
        while (trace) {
            const node = trace.node;
            answers.push(node.answer());
            trace = trace.trace;
        }
        return answers;
    }
};
