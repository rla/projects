// Helper to reprsesent a set of answers
// given so far.

class Result {

    constructor(type, text, answer, decision) {
        this.type = type;
        this.text = text;
        this.answer = answer;
        this.node = decision;        
    }
};

const ANSWER = exports.ANSWER = 'answer';
const TOPIC = exports.TOPIC = 'topic';

exports.createAnswer = (text, answer, decision) => new Result(ANSWER, text, answer, decision);
exports.createTopic = (text) => new Result(TOPIC, text, null, null);
