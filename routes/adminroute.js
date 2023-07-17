const express = require('express')
const router = express.Router();
const admincontroller = require('../controllers/admincontroller')


router.post('/signin',admincontroller.signup)
// router.post('/login',usercontroller.login)
// router.get('/getuser',usercontroller.get_user)
// router.get('/getalluser',usercontroller.getAllUsers)
// router.put('/updateuser',usercontroller.updateuser)
// router.delete('/deleteuser',usercontroller.deleteuser)

module.exports = router;