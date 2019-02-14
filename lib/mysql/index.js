const assert = require('assert');
const util = require('util');
const pool = require('./pool');
const debug = require('debug')('app:db');

// Promised getConnection function.

const aquire = util.promisify((pool, cb) =>
    pool.getConnection(cb));

// Attempts to start a transaction on the
// given connection.

const begin = util.promisify((connection, cb) =>
    connection.beginTransaction(cb));

// Attemps to commit the transaction on the
// connection.

const commit = util.promisify((connection, cb) =>
    connection.commit(cb));

// Attemps to rollback the transaction on the
// connection.

const rollback = util.promisify((connection, cb) =>
    connection.rollback(cb));

// Executes the given function inside
// a transaction.

exports.transaction = async (fn) => {
    assert.equal(typeof fn, 'function');
    // Aquire a connection.
    const connection = await aquire(pool);
    debug('Aquired a connection.');
    try {
        // Begin the transaction.
        await begin(connection);
        debug('Started the transaction.');
        try {
            // Run queries.
            const result = await fn(connection);
            debug('Ran the queries.');
            // Commit the transaction.
            await commit(connection);
            debug('Committed the transaction.');
            // Return query results.
            return result;
        } catch (err) {
            // Rollback the transaction.
            await rollback(connection);
            debug('Rolled back the transaction.');
            throw err;
        }
    } finally {
        // Release the connection.
        connection.release();
        debug('Released the connection.');
    }
};

// Closes the pool.

exports.close = util.promisify((cb) => pool.end(cb));
