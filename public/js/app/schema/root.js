// Represents whole Q/A graph.

module.exports = class Root {

    constructor(root) {
        this.root = root;
    }

    // Finds the next question to ask.

    ask() {
        return this.root.ask(null);
    }

    // Array of answers. Should be in the correct
    // order.

    answers() {
        const array = [];
        const visited = new Set();
        this.root.answers(array, visited);
        return array.filter(item => item !== null);
    }

    // Resets the decision. Also resets all
    // decisions now unreachable.

    reset(node) {
        node.unset();
        const reachable = new Set();
        this.root.mark(reachable);
        this.root.reset(reachable);
    }
};
