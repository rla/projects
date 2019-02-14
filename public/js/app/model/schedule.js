const { B, Q, G, C, To } = require('../schema');

const length = B([
    C('The project takes about a day.'),
    C('The project takes about a week.'),
    C('The project takes about a month.'),
    C('The project takes about a year.'),
    C('The project takes multiple years.')
]);

const start = B([
    C('The project should start tomorrow.'),
    C('The project should start next week.'),
    C('The project should start next month.'),
    C('The project should start somewhere in this year.')
]);

module.exports = To('Schedule', G([
    Q('The project has a fixed schedule.', G([length, start]))
]));
