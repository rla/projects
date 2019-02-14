const http = require('http');
const express = require('express');
const log = require('./lib/log');

const app = express();

// Set up templating.
require('./lib/ejs')(app);

// Defaults for locals.
require('./lib/locals')(app);

// Generic middleware stack.
require('./lib/middleware')(app);

// Set up route handlers.
require('./lib/handler')(app);

const httpServer = http.createServer();
httpServer.on('request', app);

httpServer.listen(8000, () => {
    log.info(`Server started.`);
});
