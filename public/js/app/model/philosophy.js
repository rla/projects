const { B, Q, G, C, To } = require('../schema');

module.exports = To('Philosophy', G([
    Q('The project owner has dealt with a software project before.'),
    Q('The project owner has worked with freelancers before.'),
    B([
        C('The project is best characterized as fast and good.'),
        C('The project is best characterized as fast and cheap.'),
        C('The project is best characterized as good and cheap.')
    ])
]));
