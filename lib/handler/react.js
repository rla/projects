const path = require('path');
const wrap = require('../express/wrap');

const MAX_AGE = '30d';

// Serves React and ReactDOM library.

module.exports = (app) => {

    app.get('/js/react/react.js', wrap(async (req, res) => {
        const file = path.join(__dirname, '..', '..', 'node_modules',
            'react', 'dist', 'react.js');
        res.sendFile(file, { maxAge: MAX_AGE });
    }));

    app.get('/js/react/react.min.js', wrap(async (req, res) => {
        const file = path.join(__dirname, '..', '..', 'node_modules',
            'react', 'dist', 'react.min.js');
        res.sendFile(file, { maxAge: MAX_AGE });
    }));

    app.get('/js/react/react-dom.js', wrap(async (req, res) => {
        const file = path.join(__dirname, '..', '..', 'node_modules',
            'react-dom', 'dist', 'react-dom.js');
        res.sendFile(file, { maxAge: MAX_AGE });
    }));

    app.get('/js/react/react-dom.min.js', wrap(async (req, res) => {
        const file = path.join(__dirname, '..', '..', 'node_modules',
            'react-dom', 'dist', 'react-dom.min.js');
        res.sendFile(file, { maxAge: MAX_AGE });
    }));
};
