const assert = require('assert');
const bodyParser = require('body-parser');
const wrap = require('../express/wrap');
const api = require('../express/api');
const pdf = require('../pdf');
const Save = require('../model/save');
const service = require('../service');

const jsonBody = bodyParser.json();

module.exports = (app) => {

    require('./react')(app);

    // Front page.

    app.get('/', wrap(async (req, res) => {
        res.render('index', {});
    }));

    // Questions page. Starts the client-side
    // application.

    app.get('/questions', wrap(async (req, res) => {
        res.render('questions', {});
    }));

    // Outdated browser page.

    app.get('/old', wrap(async (req, res) => {
        res.render('old', { title: 'Outdated browser' });
    }));

    // Reads user answers and stores them in the
    // database. Sends back the key.

    app.post('/pdf', jsonBody, api(async (req, res) => {
        return service.save(new Save(req.body.title, req.body.answers));
    }));

    // Sends the rendered PDF file.
    
    app.get('/pdf/:id', wrap(async (req, res) => {
        res.contentType('application/pdf');
        res.send(await pdf(await service.find(req.params.id)));
    }));

    // Sends the rendered HTML response.
    
    app.get('/html/:id', wrap(async (req, res) => {
        const id = req.params.id;
        const save = await service.find(id);
        res.render('static', { title: save.title, answers: save.answers, id });
    }));
};
