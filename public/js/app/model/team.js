const { B, Q, G, C, To } = require('../schema');

module.exports = To('Team', Q('The project already has a team working on it.', B([
    C('All team members should work on-site.', G([
        Q('Relocation cost to on-site is covered by the project budget.')
    ])),
    C('Some members could work remote.'),
    C('All team members should work remote.')
])));
