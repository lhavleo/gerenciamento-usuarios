const userModel = require('../models/userModel');

const getAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({message: 'Erro ao retornar os usuários!'});
    }
    
};

const create = async (req, res) => {
    try {
        const {login, password, name} = req.body;
        if (!login || !password) {
            return res.status(400).json({message: 'Email e senha obrigatórios!'});
        }
        const newUser = await userModel.createUser({login, password, name});
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({message: 'Erro ao adicionar novo usuário!'});
    }
};

const update = async (req, res) => {
    try {
        const {id} = req.params;
        const {login, password, name} = req.body;

        if (!login && !password && !name) {
            return res.status(400).json({ message: 'Pelo menos um campo (email, senha ou nome) deve ser fornecido' });
        }

        const updatedUser = await userModel.updateUser(parseInt(id), {login, password, name});
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await userModel.removeUser(parseInt(id));
        return res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove
};