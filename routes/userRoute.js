const route = require('express').Router();
const validateToken = require('../midleware/validateTokenHandler');
const controller = require('../controllers/userController');
const controllerToken = require('../controllers/refreshTokenConroller');
const fileUploadController = require('../controllers/fileUploadController');
const upload = require('../midleware/multerUpload');



//user login controller
route.post('/login',controller.userLogin);

//user logOut controller
route.get('/logout',controller.userLogOut);

//user register controller
route.post('/register',upload.single('image'),controller.userRegister);

//user data update
route.put('/update/:id',validateToken,controller.userUpdate);

//user password update
route.put('/update/pwd/:id',validateToken,controller.userPasswordUpdate);

//delete user
route.delete('/delete/:id',validateToken,controller.userDelete);

//refresh-Token
route.get('/refresh',controllerToken.refreshToken);

//User Photo Upload with register
route.post('/image/upload/:id',upload.single('image'),fileUploadController.uploadPhoto);

//User Photo Delete
route.delete('/image/delete/:public_id',fileUploadController.userPhotoDelete);


module.exports = route