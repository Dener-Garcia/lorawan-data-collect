const { Pool } = require('pg')


const pool = new Pool({
    user : "postgres", // process.env.DBUSER,
    password : "Dagaxl", // process.env.DBPASSWORD,
    host: '127.0.0.1', //process.env.RASPIP,
    database : "dw_lorawan", //process.env.DBDATABASE,
    port : process.env.DBPORT
})

console.log("env tags", process.env.DBUSER, process.env.DBPASSWORD, process.env.DBDATABASE)

const testConnection = async () => {
    try{
        const response = await pool.query('SELECT current_database() AS dbname')
        const nameDb = response.rows[0].dbname
        console.log("Conexão com banco realizada com sucesso " + nameDb)
        return nameDb
    } catch (error){
        console.log("Erro ao conectar com banco local:", error)
        return null
    }
}

testConnection()

module.exports = pool