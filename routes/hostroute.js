const express = require('express')
const router = express.Router();
const hostcontroller = require('../controllers/hostcontroller')


router.post('/signin',hostcontroller.signup)
router.post('/activate',hostcontroller.activate)
// router.get('/getuser',hostcontroller.get_user)
router.get('/getall',hostcontroller.getall)
// router.put('/updateuser',hostcontroller.updateuser)
// router.delete('/deleteuser',hostcontroller.deleteuser)

module.exports = router;