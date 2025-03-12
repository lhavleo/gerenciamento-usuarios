const connection = require('./connection');

const usersInMemory = [
    { id: 1, login: 'leonardo@hotmail.com', password:'leonardo', name: 'leonardo'},
    { id: 2, login: 'vinicius@hotmail.com', password:'vinicius', name: 'vinicius'},
    { id: 3, login: 'mateus@hotmail.com', password:'mateus', name: 'mateus'}
];

const getAll = async () => {
    //const users = await connection.execute('select * from users');
    //return users;

    return usersInMemory
};

const createUser = async (user) => {
    const newUser = {id: usersInMemory.length + 1, ...user};
    usersInMemory.push(newUser);
    return newUser;
};

const updateUser = async (id, updatedData) => {
    const userId = usersInMemory.findIndex(user => user.id === id);
    if (userId === -1){
        throw new Error('Usuário não encontrado');
    }

    const updatedUser = {...usersInMemory[userId], ...updatedData};
    usersInMemory[userId] = updatedUser;
    return updatedUser;
};

const removeUser = async (id) => {
    const userId = usersInMemory.findIndex(user => user.id === id);
    if (userId === -1){
        throw new Error('Usuário não encontrado');
    }

    const deletedUser = usersInMemory.splice(userId, 1);
    return deletedUser[0];
};


module.exports = {
    getAll,
    createUser,
    updateUser,
    removeUser
};