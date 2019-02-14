const ejs = require('ejs');
const path = require('path');

// Set up EJS templating engine.

module.exports = (app) => {
    app.set('views', path.join(__dirname, '..', '..', 'views'));
    app.set('view engine', 'ejs');
};
