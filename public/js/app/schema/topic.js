const result = require('./result');
const Node = require('./node');

// Intermediate node to produce a title
// on the graph path.

module.exports = class Topic extends Node {

    constructor(title, node) {
        super();
        this.title = title;
        this.node = node;
    }

    // Pass through to the linked node.

    ask(trace) {
        return this.node.ask(trace);
    }

    // Pass through to the linked node.

    mark(reachable) {
        if (reachable.has(this)) {
            return;
        }
        reachable.add(this);
        this.node.mark(reachable);
    }

    // Pass through to the linked node.

    reset(reachable) {
        return this.node.reset(reachable);
    }

    // Pass through to the linked node.
    // Add this as title answer. It will appear
    // only if it has the closest branch or question
    // decided.

    answers(array, visited) {
        if (visited.has(this)) {
            return;
        }
        visited.add(this);
        if (this.hasDecisionDecided()) {
            array.push(result.createTopic(this.title));
            this.node.answers(array, visited);
        }        
    }

    // Pass through to the linked node.

    hasDecisionDecided() {
        return this.node.hasDecisionDecided();
    }
};
