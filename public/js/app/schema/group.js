const Node = require('./node');

// Groups similar questions.

module.exports = class Group extends Node {

    constructor(questions) {
        super();
        this.questions = questions;
    }

    // We do not store context for
    // groups and just try to find the
    // first unanswered question.

    ask(trace) {
        for (let i = 0; i < this.questions.length; i++) {
            const result = this.questions[i].ask(trace);
            if (result) {
                return result;
            }
        }
        // No unanswered question found.
        return null;
    }

    // Just proceeds to each question in this
    // group.

    mark(reachable) {
        if (reachable.has(this)) {
            return;
        }
        reachable.add(this);
        for (const question of this.questions) {
            question.mark(reachable);
        }
    }

    // Just proceeds to each question in this
    // group.

    reset(reachable) {
        for (const question of this.questions) {
            question.reset(reachable);
        }
    }

    answers(array, visited) {
        if (visited.has(this)) {
            return;
        }
        visited.add(this);
        for (const question of this.questions) {
            question.answers(array, visited);
        }
    }

    hasDecisionDecided() {
        for (const question of this.questions) {
            if (question.hasDecisionDecided()) {
                return true;
            }
        }
        return false;
    }
};
