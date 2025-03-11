const pool = require("./connectMySql");

const registerChangeStatusModel = async (fieldTags, duration) => {
  const query = `
    INSERT INTO lorawan_consolidation (
        dev_address, dev_model, machine, val_workcenter, input_name, input_category, input_value, dtt_start, dtt_duration
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING id
        `;

  const ids = [];
    
  const values = [
    fieldTags.dev_address,
    fieldTags.dev_model,
    fieldTags.machine,
    fieldTags.val_workcenter,
    fieldTags.input_name,
    fieldTags.input_category,
    fieldTags.input_value,
    fieldTags.record_timestamp,
    duration,
  ];

  try {
    const { rows } = await pool.query(query, values);
    ids.push(rows[0].id); // Guarda o ID retornado para cada tag

    return ids
  } catch (error) {
    console.error("[ERROR] Falha ao salvar dados no banco:", error.message);
    throw error;
  }

};

module.exports = registerChangeStatusModel;
