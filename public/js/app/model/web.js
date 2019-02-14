const { B, Q, G, C } = require('../schema');

const performance = B([
    C('Only 1 person will use the application at the same time.'),
    C('Less than 100 people will use the application at the same time.'),
    C('More than 100 people will use the application at the same time.')
]);

module.exports = B([
    C('A blog needs to be set up.'),
    C('An online store needs to be set up.'),
    C('A simple homepage needs to be set up.'),
    C('A custom web application has to be developed.', performance)
]);
