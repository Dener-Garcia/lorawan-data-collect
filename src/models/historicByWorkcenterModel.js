const pool = require("./connectMySql");

const historicByWorkcenterModel = async (workcenter, limit, offset) => {  
    const query = `
      SELECT *
      FROM iot_lorawan
      WHERE val_workcenter = ?
      ORDER BY record_timestamp DESC
      LIMIT ? OFFSET ?
      `;
  
    try {
      const [results] = await pool.execute(query, [workcenter, limit, offset]);
      return results;
    } catch (error) {
      console.error("[ERROR] Falha ao buscar dados:", error.message);
      throw new Error(
        `Erro ao buscar dados para a máquina ${workcenter}: ${error.message}`
      );
    }
  };
  
  module.exports = historicByWorkcenterModel
  