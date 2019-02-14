const path = require('path');
const express = require('express');
const buster = require('./buster');

module.exports = (app) => {
    const staticOptions = {};
    if (process.env.NODE_ENV === 'production') {
        staticOptions.maxAge = '30d';
    }
    app.use(buster());
    app.use(express.static(
        path.join(__dirname, '..', '..', 'public'),
        staticOptions));
};
