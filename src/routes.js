const express = require('express')
const path = require('path')
const router = express.Router()

const fieldDataCollectService = require('./services/fieldDataCollectService')
const saveConsolidationService = require('./services/saveConsolidationService')
const {clearTableConsolidation, clearTableIotLorawan } = require('./models/clearDatabase')
const { cleanOldDataChronos } = require('./services/saveDataChronos')

const historicByModuleController = require('./controllers/historicByModuleController')

const readAllRemoteIoController = require('./controllers/readAllRemoteIoController')
const readByMachineController = require('./controllers/readMachinesController')

router.get("/readAllRemoteIo", readAllRemoteIoController)

router.get("/machines/:typeMachine", readByMachineController)

router.get("/machine/", historicByModuleController)

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


setInterval(async () => {
  try {
    await clearTableIotLorawan();
    await clearTableConsolidation();
    await cleanOldDataChronos();
    console.log("🧹 Limpezas agendadas executadas com sucesso.");
  } catch (err) {
    console.error("❌ Erro na execução das limpezas agendadas:", err.message);
  }
}, 1000 * 60 * 60 * 24); // a cada 24h




module.exports = router