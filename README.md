# Project-expert

A dialog (expert) system with questions and yes/no and selection answers. The set of questions is structured as a tree data structure that is supposed to ask questions "intelligently". It only asks certain top-level questions and then proceeds to ask only those questions that make sense by previous answers.

The app uses special-purpose tree-like data structure to handle the questions and answers. It allows to skip and review modify some of the answers and still continue in a meaningful way. The app was inspired by expert systems and the Fallout 3 dialog system.

During the Q/A session, it also tries to explain why it asks the specific question.

## Example structure

```js
const { B, Q, G, C, To } = require('../schema');

module.exports = To('Existing solution', Q('There is an existing solution.', G([
    Q('The existing solution needs a maintainer.'),
    Q('The existing solution needs a rewrite.', B([
        C('The existing solution is rewritten because it is too expensive to maintain.'),
        C('The existing solution is rewritten because it does not cover all needs.'),
        C('The existing solution is rewritten because it is obsolete.')
    ]))
])));
```

Where the nodes have the following meaning:

 * `To` - intermediate node to set the subtree title in the generated output.
 * `Q` - a yes/no question node. Enables or disables the subtree from the question.
 * `B` - branching question. Only one answer can be selected.
 * `C` - a choice in the branching question.
 * `G` - a group of similar questions.
