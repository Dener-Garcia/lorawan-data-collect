const readData = require('../models/readData')

const readMachines = async (req, res) => {
    const {typeMachine} = req.params

    console.log(req.params)

    const machines = await readData.readMachines(typeMachine)

    res.status(200).json(machines)

}

module.exports = {
    readMachines
}