const { B, Q, G, C } = require('../schema');

module.exports = G([
    Q('The desktop application should run on Windows.'),
    Q('The desktop application should run on MacOS.'),
    Q('The desktop application should run on Linux.'),
    Q('There is a preferred technology to implement the desktop application.', B([
        C('It is preferred to use C# on desktop.'),
        C('It is preferred to use Java on desktop.'),
        C('It is preferred to use Electron on desktop.'),
        C('It is preferred to use Qt on desktop.'),
        C('It is preferred to use Python on desktop.')
    ]))
]);
