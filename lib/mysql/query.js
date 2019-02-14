const fs = require('fs');
const util = require('util');
const assert = require('assert');

// Creates a query object.
// Reads file synchronously.

module.exports = class Query {

    constructor(filename) {
        assert.equal(typeof filename, 'string');
        this.filename = filename;
        this.sql = fs.readFileSync(filename, 'utf8');
        this.run = util.promisify((connection, params, cb) =>
            connection.query(this.sql, params, cb));
    }

    async one(connection, params) {
        const rows = await this.run(connection, params);
        if (rows.length > 0) {
            return rows[0];
        }
    }

    async oneField(connection, field, params) {
        assert.equal(typeof field, 'string');
        const row = await this.one(connection, params);
        if (row) {
            assert(row.hasOwnProperty(field));
            return row[field];
        }
    }
};
