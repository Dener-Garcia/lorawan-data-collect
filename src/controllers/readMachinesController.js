const readByMachineModel = require('../models/readByMachineModel')

const readByMachineController = async (req, res) => {
    const {typeMachine} = req.params

    try {
        
    const machines = await readByMachineModel(typeMachine)

    res.status(200).json(machines)
    } catch (error) {
        console.error('[ERROR] Erro no controller:', error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = readByMachineController