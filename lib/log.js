exports.info = (message) => {
    console.log(message);
};

exports.error = (error) => {
    if (error instanceof Error) {
        process.stderr.write(`${error.stack}\n`);
    } else {
        process.stderr.write(`${error}\n`);
    }
};
