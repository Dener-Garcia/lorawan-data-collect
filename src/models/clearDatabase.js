const { pool } = require("./connectMySql")

const clearTableIotLorawan = async () => {
    const query = 
    `
        DELETE FROM iot_lorawan
        WHERE record_timestamp < NOW() - INTERVAL 12 MONTH;
    `

    const clearDatabase = await pool.execute(query)
    console.log("limpando dados da tabela iot_lorawan ")
    return clearDatabase
}

const clearTableConsolidation = async () => {
    const query = 
    `
        DELETE FROM lorawan_consolidation
        WHERE record_timestamp < NOW() - INTERVAL 12 MONTH;
    `

    const clearDatabase = await pool.execute(query)
    console.log("limpando dados da tabela lorawan_consolidation")
    return clearDatabase
}

module.exports = {
    clearTableIotLorawan,
    clearTableConsolidation
}