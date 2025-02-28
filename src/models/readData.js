const pool = require('./dbConnect')

const readMachines = async (machine) => {
    console.log("dentro model", machine)

    const query = `
        SELECT * FROM iot_lorawan
        WHERE machine = $1
        ORDER BY record_timestamp DESC
    `
   const result = await pool.query(query, [machine])
    console.log(result)
    return {rows} = result
}

module.exports = {
    readMachines
}