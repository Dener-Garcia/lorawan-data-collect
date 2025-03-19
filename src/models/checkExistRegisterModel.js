const pool = require("./connectMySql");

const checkIfStatusExistsModel = async (fieldTags) => {
    
  const query = `
    SELECT id FROM lorawan_consolidation 
    WHERE dev_address = ? 
    AND input_name = ? 
    AND input_category = ? 
    AND dtt_start = ? 
  `;

  const values = [
    fieldTags.dev_address,
    fieldTags.input_name,
    fieldTags.input_category,
    fieldTags.record_timestamp
  ];

  try {
    const [rows] = await pool.query(query, values);
    return rows.length > 0; // Retorna `true` se já existir, `false` se não existir
  } catch (error) {
    console.error("[ERROR] Falha ao verificar status no banco:", error.message);
    throw error;
  }
};

module.exports = checkIfStatusExistsModel