const express = require('express')
const router = express.Router();
const stationcontroller = require('../controllers/stationcontroller')


router.post('/insert',stationcontroller.insert)
router.get('/getuser',stationcontroller.get_Station)
router.get('/getallstations',stationcontroller.getAllStations)
router.post('/getcompanystations',stationcontroller.getCompanyStations)
router.put('/updateuser',stationcontroller.updateStation)
router.delete('/deleteuser',stationcontroller.deleteStation)

module.exports = router;