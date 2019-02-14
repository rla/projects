const assert = require('assert');
const { B, Q, G, C, Root } = require('../public/js/app/schema');

describe('Schema', () => {

    it('should handle trivial model', async () => {
        const question = Q('Is this a test?');
        const root = new Root(question);
        const query = root.ask();
        assert.equal(query.question, question);
        query.answer('yes');
        const answers = root.answers();
        assert.equal(answers.length, 1);
        const answer = answers[0];
        assert.equal(answer.node, question);
        assert.equal(answer.answer, 'yes');
        root.reset(answer.node);
        assert.equal(question.value, null);
        assert.equal(root.answers().length, 0);
    });

    it('should handle trivial branch model', async () => {
        const question = B([
            C('Is this a test?'),
            C('Is this a bird?')
        ]);
        const root = new Root(question);
        const query = root.ask();
        assert.equal(query.question, question);
        query.answer(0);
        const answers = root.answers();
        assert.equal(answers.length, 1);
        const answer = answers[0];
        assert.equal(answer.node, question);
        assert.equal(answer.answer, 'yes');
        root.reset(answer.node);
        assert.equal(question.value, -2);
        assert.equal(root.answers().length, 0);
    });

    it('should handle diamond model', async () => {
        const bottom = Q('Bottom');
        const question1 = Q('Q1', bottom);
        const question2 = Q('Q2', bottom);
        const root = new Root(G([question1, question2]));
        const query1 = root.ask();
        assert.equal(query1.question, question1);
        query1.answer('yes');
        const query2 = root.ask();
        assert.equal(query2.question, bottom);
        const why1 = query2.why();
        // Bottom asked because of question 1.
        assert.equal(why1[0].node, question1);
        query2.answer('yes');        
        const query3 = root.ask();
        assert.equal(query3.question, question2);
        query3.answer('yes');
        assert.equal(question1.value, 'yes');
        assert.equal(question2.value, 'yes');
        assert.equal(bottom.value, 'yes');
        root.reset(question1);
        assert.equal(question1.value, null);
        assert.equal(question2.value, 'yes');
        assert.equal(bottom.value, 'yes');
        assert.equal(root.answers().length, 2);
    });
});
