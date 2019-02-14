const path = require('path');
const Query = require('./mysql/query');

const generateSaveIdQuery = new Query(path.join(
    __dirname, 'sql', 'generate_save_id.sql'));

const saveTextQuery = new Query(path.join(
    __dirname, 'sql', 'save_text.sql'));

const textIdQuery = new Query(path.join(
    __dirname, 'sql', 'text_id.sql'));

const saveAnswerQuery = new Query(path.join(
    __dirname, 'sql', 'save_answer.sql'));

const findSaveQuery = new Query(path.join(
    __dirname, 'sql', 'find_save.sql'));

const answersQuery = new Query(path.join(
    __dirname, 'sql', 'answers.sql'));

// Generates save id.

exports.generateSaveId = async (connection, title) => {
    const results = await generateSaveIdQuery.run(connection, { title });
    return results.insertId;
};

// Saves text, queries its id.

exports.saveText = async (connection, text) => {
    await saveTextQuery.run(connection, { text });
    return textIdQuery.oneField(connection, 'id', { text });
};

// Saves the actual answer.

exports.saveAnswer = async (connection, saveId, textId, answer, order, type) => {
    return saveAnswerQuery.run(connection, { saveId, textId, answer, order, type });
};

// Finds the saved result by the id.
// Returns title or null if not found.

exports.findSave = async (connection, id) => {
    return findSaveQuery.one(connection, { id });
};

// Finds answers for the given save.

exports.answers = async (connection, saveId) => {
    return answersQuery.run(connection, { saveId });
};
