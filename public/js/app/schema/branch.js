const result = require('./result');
const Choice = require('./choice');
const Decision = require('./decision');
const Query = require('./query');
const Trace = require('./trace');

// A branch is a node in the question
// tree that can have a single answer.

const Branch = module.exports = class Branch extends Decision {

    constructor(choices) {
        super();
        this.choices = choices;
        this.value = Branch.UNSELECTED;
        this.type = 'branch';
    }

    // Finds chosen choice and the next
    // following question from there.

    ask(trace) {
        if (this.value === Branch.UNSELECTED) {
            return new Query(this, trace);
        }
        if (this.value === Branch.SKIPPED || this.value === Branch.DNK) {
            return null;
        }
        // Branch has been visited and not skipped.
        return this.choices[this.value].ask(new Trace(this, trace));
    }

    // Helper to mark reachable nodes. Used
    // for resetting answers.

    mark(reachable) {
        if (reachable.has(this)) {
            return;
        }
        reachable.add(this);
        if (this.value >= 0) {
            this.choices[this.value].mark(reachable);
        }
    }

    // Returns answer object for this
    // decision. Used for debugging and reason.

    answer() {
        // This does not handle skipped case which is
        // handled by answers().
        if (this.value >= 0) {
            const choice = this.choices[this.value];
            return result.createAnswer(choice.text, 'yes', this);
        } else {
            return null;
        }
    }

    // Sets the branch value back to the
    // initial value.

    unset() {
        this.value = Branch.UNSELECTED;
    }

    // Resets this decision.

    reset(reachable) {
        if (!reachable.has(this)) {
            this.value = Branch.UNSELECTED;
        }        
        for (const choice of this.choices) {
            choice.reset(reachable);
        }
    }

    // Collects array of answers. Might contain nulls.
    
    answers(array, visited) {        
        if (visited.has(this)) {
            return;
        }
        visited.add(this);
        if (this.value === Branch.UNSELECTED) {
            return;
        }
        if (this.value === Branch.SKIPPED) {
            // All choices appear as skipped.
            for (const choice of this.choices) {
                array.push(result.createAnswer(choice.text, 'skip', this));
            }
            return;
        }
        if (this.value === Branch.DNK) {
            // All choices appear as "do not know".
            for (const choice of this.choices) {
                array.push(result.createAnswer(choice.text, 'dnk', this));
            }
            return;
        }
        array.push(this.answer());
        if (this.value >= 0) {
            // Add choice answers here.
            const choice = this.choices[this.value];
            choice.answers(array, visited);
        }
    }

    hasDecisionDecided() {
        return this.value !== Branch.UNSELECTED;
    }
};

Branch.DNK = -3;
Branch.UNSELECTED = -2;
Branch.SKIPPED = -1;
