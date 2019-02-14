const assert = require('assert');
const Answer = require('./answer');

// Represents one save.

module.exports = class Save {

    constructor(title, answers) {
        assert.equal(typeof title, 'string');
        assert.ok(Array.isArray(answers));
        this.title = title;
        this.answers = answers.map(({text, answer, type}) =>
            new Answer(text, answer, type));
    }
};
