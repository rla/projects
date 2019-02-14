const Node = require('./node');

// Decision is a node that is a single
// question or a set of mutual choices.

module.exports = class Decision extends Node {

    constructor() {
        super();
    }
};
