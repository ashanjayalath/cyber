const route = require('express').Router();
const contactPersonController = require('../controllers/customer_controller/contactPersonController');
const validateToken = require('../midleware/validateTokenHandler');

//save contact Person
route.post('/save',contactPersonController.ContactPersonSave);

//contact Person update
route.put('/update/:id',contactPersonController.ContactPersonUpdate);

//contact Person delete one by one
route.delete('/delete/:id',contactPersonController.ContactPersonDelete);

//contact Person delete bulk check them name
route.delete('/delete_bulk',contactPersonController.ContactPersonDeleteBulk);

//contact Person get all
route.get('/get_all',contactPersonController.ContactPersonGetAll);

//contact Person get
route.get('/get/:id',contactPersonController.ContactPersonGet);


module.exports = route