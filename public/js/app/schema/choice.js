// Represents one choice in a branch
// decision node.

module.exports = class Choice {

    constructor(text, node) {
        this.text = text;
        this.node = node;
    }

    ask(trace) {
        return this.node ? this.node.ask(trace) : null;
    }

    reset(reachable) {
        if (this.node) { this.node.reset(reachable); }
    }

    answers(array, visited) {
        if (this.node) { this.node.answers(array, visited); }
    }

    mark(reachable) {
        if (this.node) { this.node.mark(reachable); }
    }
};
