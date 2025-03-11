const pool = require("./connectMySql");

const readByMachineModel = async (machine) => {
  console.log("dentro model", machine);

  const queryPostgres = `
        SELECT DISTINCT ON (input_name, val_workcenter) *
        FROM iot_lorawan
        WHERE machine = ?
        ORDER BY input_name, val_workcenter, record_timestamp DESC
    `;

  const query = `
WITH ranked_data AS (
            SELECT
                machine,
                input_name,
                input_value,
                record_timestamp,
                ROW_NUMBER() OVER (PARTITION BY input_name ORDER BY record_timestamp DESC) AS rn
            FROM iot_lorawan
            WHERE machine = ?
        )
        SELECT machine, input_name, input_value, record_timestamp
        FROM ranked_data
        WHERE rn = 1
        ORDER BY input_name
    `;

  try {
    const [results] = await pool.execute(query, [machine]);
    console.log("#######", results);
    return result;
  } catch (error) {
    console.error("[ERROR] Falha ao buscar dados:", error.message);
    throw new Error(
      `Erro ao buscar dados para a máquina ${machine}: ${error.message}`
    );
  }
};

module.exports = readByMachineModel;
