const pool = require('./dbConnect')

const readByMachineModel = async (machine) => {
    console.log("dentro model", machine)

    const query = `
        SELECT DISTINCT ON (input_name, val_workcenter) *
        FROM iot_lorawan
        WHERE machine = $1
        ORDER BY input_name, val_workcenter, record_timestamp DESC
    `

    try {
        const result = await pool.query(query, [machine])
        console.log(result.rows)
        return result.rows
    } catch (error) {
        console.error('[ERROR] Falha ao buscar dados:', error.message);
        throw new Error(`Erro ao buscar dados para a máquina ${machine}: ${error.message}`);
    }

}

module.exports = readByMachineModel