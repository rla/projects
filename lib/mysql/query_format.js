// Custom bound parameters.

module.exports = function(query, values) {
    if (!values) {
        return query;
    }
    const formatted = query.replace(/\:(\w+)/g, (txt, key) => {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        } else {
            throw new Error('No parameter ' + key + ' supplied to MySQL query.');
        }
        return txt;
    });
    return formatted;
};
