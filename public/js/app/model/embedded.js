const { B, Q, G, C } = require('../schema');

module.exports = G([
    B([
        C('The embedded system runs on Raspberry Pi.'),
        C('The embedded system runs on a small form factor PC.'),
        C('The embedded system runs on a MCU.'),
        C('The embedded system platform has not been chosen yet.')
    ])    
]);
