// Represents path from root
// to the given node.

module.exports = class Trace {

    constructor(decision, trace) {
        this.node = decision;
        this.trace = trace;
    }
};
