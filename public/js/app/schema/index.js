const Branch = require('./branch');
const Question = require('./question');
const Group = require('./group');
const Choice = require('./choice');
const Terminal = require('./terminal');
const Topic = require('./topic');
const Root = require('./root');

const B = (questions) => new Branch(questions);
const Q = (text, node) => new Question(text, node);
const G = (questions) => new Group(questions);
const C = (text, node) => new Choice(text, node);
const T = (text) => new Terminal(text);
const To = (text, node) => new Topic(text, node);

module.exports = { B, Q, G, C, T, To, Root };
