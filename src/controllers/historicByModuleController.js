const historicByWorkcenterModel = require("../models/historicByWorkcenterModel")

const historicByModuleController = async (req, res) => {
    const { workcenter, limit, offset } = req.query

    try {
        const result = await historicByWorkcenterModel(workcenter, limit, offset)

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = historicByModuleController