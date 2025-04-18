const pool = require("./connectMySql");

const readByMachineModel = async (machine) => {
  console.log("dentro model", machine);

  const query = `
WITH ranked AS (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY input_name, val_workcenter
        ORDER BY record_timestamp DESC) AS rn
        FROM iot_lorawan
        WHERE machine = ?
        ORDER BY val_workcenter DESC
)
SELECT *
FROM ranked
WHERE rn = 1;
    `;

  try {
    const [results] = await pool.execute(query, [machine]);
    console.log("#######", results);
    return results;
  } catch (error) {
    console.error("[ERROR] Falha ao buscar dados:", error.message);
    throw new Error(
      `Erro ao buscar dados para a máquina ${machine}: ${error.message}`
    );
  }
};

module.exports = readByMachineModel;
