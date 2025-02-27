const pool = require('./dbConnect')

const readMachines = async (machine) => {
    console.log("dentro model", machine)

    const query = `
        SELECT * FROM iot_lorawan
    `
    return await pool.query(query)
}

module.exports = {
    readMachines
}