const { B, Q, G, C } = require('../schema');

module.exports = G([
    Q('The mobile application should run on Apple iPhone.'),
    Q('The mobile application should run on Android.'),
    Q('The mobile application should run on a device that is neither iPhone or Android.'),
    Q('There is a preferred technology to implement the mobile application.', B([
        C('It is preferred to use native platform development tools on mobile.'),
        C('It is preferred to use React Native on mobile.'),
        C('It is preferred to use Xamarin on mobile.'),
        C('It is preferred to use Qt on mobile.')
    ]))
]);
