const express = require('express')
const path = require('path')
const router = express.Router()

const fieldDataCollectService = require('./services/fieldDataCollectService')
const saveConsolidationService = require('./services/saveConsolidationService')

const readTwiMachine = require('./controllers/twi')
const readByMachineController = require('./controllers/readMachinesController')

router.get("/twi", readTwiMachine)

router.get("/machines/:typeMachine", readByMachineController)

router.get("/teste", saveConsolidationService)

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


module.exports = router