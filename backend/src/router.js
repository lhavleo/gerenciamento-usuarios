const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');


router.get('/users', userController.getAll);

router.post('/users', userController.create);

router.put('/users/:id', userController.update);

router.delete('/users/:id', userController.remove);

module.exports = router;