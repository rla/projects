// Helper to automatically call preventDefault
// on the click handlers.

module.exports = (fn, value) => {
    return (e) => {
        e.preventDefault();
        e.stopPropagation();
        fn(value);
    };
};
