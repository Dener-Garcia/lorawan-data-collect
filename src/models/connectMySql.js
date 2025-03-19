const mysql = require('mysql2/promise.js');

// console.log("dentro arquivo configuracao")
// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host : process.env.RASPIP,
//   user : process.env.DBMYSQLUSER,
//   password : process.env.DBMYSQLPASSWORD,
//   database : process.env.DBMYSQLDATABASE
// });

var pool  = mysql.createPool({
  connectionLimit : 10,
  host :'localhost',
  user : 'root',
  password : 'Dagaxl',
  database : process.env.DBMYSQLDATABASE
});

    //const nameDb = response.rows[0].dbname
  //  console.log("Conexão com banco realizada com sucesso ", results, fields)
 //   return nameDb

const testConnection = async () => {

  try {

    // execute will internally call prepare and query
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