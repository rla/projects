const { B, Q, G, C, T } = require('../schema');

module.exports = G([
    Q('The browser plugin should work on Google Chrome.'),
    Q('The browser plugin should work on Microsoft Edge.'),
    Q('The browser plugin should work on Mozilla Firefox.'),
    Q('The browser plugin should work on Apple Safari.')
]);
