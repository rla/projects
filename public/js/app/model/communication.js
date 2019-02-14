const { B, Q, G, C, To } = require('../schema');

module.exports = To('Communication', G([
    Q('There is a preferred communication method.', B([
        C('The preferred communication method is on-site meetings.'),
        C('The preferred communication method is email.'),
        C('The preferred communication method is Slack or similar service/app.'),
        C('The preferred communication method is Skype.'),
        C('The preferred communication method is phone calls.')
    ])),
    Q('Team members should be available in the business hours of a specific timezone.', B([
        C('The business hours timezone is in western/central/eastern Europe.'),
        C('The business hours timezone is in US East Coast.'),
        C('The business hours timezone is in US West Coast.'),
        C('The business hours timezone is in Australia/New Zealand/Japan.'),
    ]))])
);
