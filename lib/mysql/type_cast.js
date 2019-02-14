// Helper to cast TINYINT(1) to a boolean.

module.exports = (field, next) => {
    if (field.type === 'TINY' && field.length === 1) {
        return field.string() === '1';
    }
    return next();
};
