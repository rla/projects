const { B, Q, G, C, To } = require('../schema');

module.exports = To('Existing solution', Q('There is an existing solution.', G([
    Q('The existing solution needs a maintainer.'),
    Q('The existing solution needs a rewrite.', B([
        C('The existing solution is rewritten because it is too expensive to maintain.'),
        C('The existing solution is rewritten because it does not cover all needs.'),
        C('The existing solution is rewritten because it is obsolete.')
    ]))
])));
