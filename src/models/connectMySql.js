const mysql = require('mysql2/promise.js');

console.log("dentro arquivo configuracao banco", process.env.RASPIP, process.env.DBMYSQLUSER, process.env.DBMYSQLPASSWORD, process.env.DBMYSQLDATABASE)

var pool = mysql.createPool({
  connectionLimit : 10,
  host : "localhost",//process.env.RASPIP,
  user : process.env.DBMYSQLUSER,
  password : process.env.DBMYSQLPASSWORD,
  database : process.env.DBMYSQLDATABASE,
});

// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host :'localhost',
//   user : 'root',
//   password : 'Dagaxl',
//   database : process.env.DBMYSQLDATABASE
// });

const testConnection = async () => {

  try {
    // execute will internally call prepare and query
    console.log("Tentando conectar ao banco")
    const response = await pool.execute('SELECT database() AS dbname')
    const nameDb = response[0]
    console.log("Conexão com banco de dados realizada com sucesso " + nameDb[0].dbname)
    return nameDb
  } catch (error) {
    console.log("Erro ao conectar com banco local:", error)
  }
}

testConnection()

module.exports = pool