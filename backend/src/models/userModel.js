const connection = require('./connection');

const getAll = async () => {
    const users = await connection.execute('select * from users');
    return users;
};

module.exports = {
    getAll
};