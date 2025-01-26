const express = require('express')
const path = require('path')
const router = express.Router()


const readTwiMachine = require('./controllers/twi')



router.get("/twi", readTwiMachine)

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


module.exports = router