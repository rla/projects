const assert = require('assert');

const ICONS = {
    'yes': 'check',
    'no': 'times',
    'skip': 'angle-double-right'
};

const LABELS = {
    'yes': 'Yes',
    'no': 'No',
    'skip': 'Skipped',
    'dnk': 'Do not know'
};

// Represents one answer.

module.exports = class Answer {

    constructor(text, answer, type) {
        assert.equal(typeof text, 'string');
        assert.ok(typeof answer === 'string' || answer === null);
        assert.ok(['answer', 'topic'].indexOf(type) >= 0);
        this.text = text;
        this.answer = answer;
        this.type = type;
        // Font-Awesome icon name. Could be null.
        this.icon = ICONS[answer];
        this.label = LABELS[answer];
    }
};
