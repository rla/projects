const package = require('../package.json');

module.exports = (app) => {
    // App version.
    app.locals.version = package.version;
    // Default page title.
    app.locals.title = 'Project wizard';
    // URL prefix for PDF/HTML links.
    app.locals.hostPrefix = 'https://project.rlaanemets.com';
    // Deploy environment is production.
    app.locals.production = process.env.NODE_ENV === 'production';
};
