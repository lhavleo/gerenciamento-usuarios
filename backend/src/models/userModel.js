const connection = require('./connection');

// const usersInMemory = [
//     { id: 1, login: 'leonardo@hotmail.com', password:'leonardo', name: 'leonardo'},
//     { id: 2, login: 'vinicius@hotmail.com', password:'vinicius', name: 'vinicius'},
//     { id: 3, login: 'mateus@hotmail.com', password:'mateus', name: 'mateus'}
// ];

const getAll = async () => {
    // return usersInMemory;

    const [users] = await connection.execute('select * from users');
    return users;
};

const createUser = async (user) => {
    // const newUser = {id: usersInMemory.length + 1, ...user};
    // usersInMemory.push(newUser);

    const { login, password, name } = user;
    const querry = 'insert into users (login,password,name) values (?, ?, ?)';

    const newUser = await connection.execute(querry, [login, password, name]);
    return { id: newUser.insertId, login, password, name };
};

const updateUser = async (id, updatedData) => {
    let atributes = [];
    let values = [];

    if (updatedData.login) {
        atributes.push('login = ?');
        values.push(updatedData.login);
    }

    if (updatedData.password) {
        atributes.push('password = ?');
        values.push(updatedData.password);
    }

    if (updatedData.name) {
        atributes.push('name = ?');
        values.push(updatedData.name);
    }

    atributes = atributes.join(', ');

    const checkUserId = 'select * from users where id = ?';
    const [userId] = await connection.execute(checkUserId, [id]);

    if (userId.length === 0) {
        throw new Error('Usuário não encontrado');
    }

    values.push(id);

    const querry = `update users set ${atributes} where id = ?`;

    const [updatedUser] = await connection.execute(querry, values);

    // const updatedUser = {...usersInMemory[userId], ...updatedData};
    // usersInMemory[userId] = updatedUser;
    return updatedUser;
};

const removeUser = async (id) => {
    const checkUserId = 'select * from users where id = ?';
    const [userId] = await connection.execute(checkUserId, [id]);

    if (userId.length === 0) {
        throw new Error('Usuário não encontrado');
    }

    const querry = 'delete from users where id = ?';
    const [removedUser] = await connection.execute(querry, [id]);

    return removedUser;
};


module.exports = {
    getAll,
    createUser,
    updateUser,
    removeUser
};