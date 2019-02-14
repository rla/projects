const assert = require('assert');
const mysql = require('./mysql');
const repo = require('./repo');
const config = require('./config');
const Save = require('./model/save');
const Hashids = require('hashids');

const hashids = new Hashids(config.hashids_salt, 8);

// Saves the set of the answers.

exports.save = async (save) => {
    assert.ok(save instanceof Save);
    return mysql.transaction(async (connection) => {
        const id = await repo.generateSaveId(connection, save.title);
        let order = 0;
        for (const answer of save.answers) {
            const textId = await repo.saveText(connection, answer.text);
            await repo.saveAnswer(connection, id, textId,
                answer.answer, order, answer.type);
            order++;
        }
        return hashids.encode(id);
    });
};

// Finds the saved results.
// Returns null if not exists.

exports.find = async (hashid) => {
    assert.equal(typeof hashid, 'string');
    const id = hashids.decode(hashid);
    return mysql.transaction(async (connection) => {
        const saveRow = await repo.findSave(connection, id);
        if (saveRow === null) {
            return null;
        }
        const answers = await repo.answers(connection, id);
        return new Save(saveRow.title, answers);
    });
};
