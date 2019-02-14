const communication = require('./communication');
const desktop = require('./desktop');
const embedded = require('./embedded');
const existing = require('./existing');
const mobile = require('./mobile');
const plugin = require('./plugin');
const philosophy = require('./philosophy');
const schedule = require('./schedule');
const team = require('./team');
const web = require('./web');
const { B, Q, G, C, To, Root } = require('../schema');

const scrapper = G([
    Q('The data has to be extracted and updated periodically.')
]);

const system = To('Technical', G([
    B([
        C('The project is a web application or site.', web),
        C('The project is a desktop application.', desktop),
        C('The project is a mobile application.', mobile),
        C('The project is a web scrapper.', scrapper),
        C('The project is a browser plugin.', plugin),
        C('The project is an embedded system.', embedded),
        C('The project is a combination of above.', G([
            Q('A web application or a site is a part of the system.', web),
            Q('A desktop application is a part of the system.', desktop),
            Q('A mobile application is a part of the system.', mobile),
            Q('A web scrapper is a part of the system.', scrapper),
            Q('A browser plugin is a part of the system.', plugin),
            Q('An embedded firmware is a part of the system.', embedded)
        ]))
    ]),
    Q('A special hardware is required for doing the job.'),
    Q('A special software is required for doing the job.')
]));

// Creates and exports the Q/A graph.

module.exports = new Root(G([ system, philosophy, existing, team, communication, schedule ]));
