const Decision = require('./decision');
const Query = require('./query');

// Terminal node finishes the whole
// Q/A session. This is used for handling
// answers that lead to undesired projects.

module.exports = class Terminal extends Decision {

    constructor(text) {
        super();
        this.text = text;
        this.type = 'terminal';
    }

    ask(trace) {
        return new Query(this, trace);
    }

    reset() {}
    answers() {}
    mark() {}
};
