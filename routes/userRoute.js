const route = require('express').Router();
const validateToken = require('../midleware/validateTokenHandler');
const controller = require('../controllers/userController')

//user login controller
route.post('/login',controller.userLogin);

//user logOut controller
route.post('/logout/:id',validateToken,controller.userLogOut);

//user register controller
route.post('/register',controller.userRegister);

//user data update
route.put('/update/:id',validateToken,controller.userUpdate);

//user password update
route.put('/update/pwd/:id',validateToken,controller.userPasswordUpdate);


//delete user
route.delete('/delete/:id',validateToken,controller.userDelete);

module.exports = route