// Helper to work with async functions in Express.

module.exports = (fn) => {
    return (req, res, next) => {
        Promise.resolve().then(() => fn(req, res, next)).catch(next);
    };
};
