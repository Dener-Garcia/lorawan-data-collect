const express = require('express')
const path = require('path')
const router = express.Router()


const readTwiMachine = require('./controllers/twi')
const readMachinesController = require('./controllers/readMachinesController')
const readTwiSaveData = require('./services/readTwiSaveData')

router.get("/twi", readTwiMachine)

router.get("/machines/:typeMachine", readMachinesController.readMachines)

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


module.exports = router