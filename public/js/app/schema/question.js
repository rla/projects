const result = require('./result');
const Decision = require('./decision');
const Query = require('./query');
const Trace = require('./trace');

// Represents one yes/no question and
// one branch choice.

module.exports = class Question extends Decision {

    constructor(text, node) {
        super();
        this.text = text;
        this.node = node;
        this.value = null;
        this.type = 'question';
    }

    ask(trace) {
        if (this.value === null) {
            return new Query(this, trace);
        }
        if (this.value === 'yes' && this.node) {
            return this.node.ask(new Trace(this, trace));
        }
        return null;
    }

    mark(reachable) {
        if (reachable.has(this)) {
            return;
        }
        reachable.add(this);
        if (this.value === 'yes' && this.node) {
            this.node.mark(reachable);
        }
    }

    // Sets the question value back to the
    // initial value.

    unset() {
        this.value = null;
    }

    // Resets the decision when it is unreachable.
    // Resets whole tree.

    reset(reachable) {
        if (!reachable.has(this)) {
            this.value = null;
        }
        if (this.node) {
            this.node.reset(reachable);
        }
    }

    // Creates an Answer instance for this answered
    // question.

    answer() {
        return result.createAnswer(this.text, this.value, this);
    }

    // Collects set of answers.
    
    answers(array, visited) {
        if (this.value === null) {
            return;
        }
        if (visited.has(this)) {
            return;
        }
        visited.add(this);
        if (this.value) {
            array.push(this.answer());
        }
        if (this.node) {
            this.node.answers(array, visited);
        }
    }

    // Checks whether this question is decided.
    // Subtree is not checked if it is not.

    hasDecisionDecided() {
        return this.value !== null;
    }
};
