const pool = require('./dbConnect');

const registerFieldTag = async (fieldTags) => {

  const query = `
    INSERT INTO iot_lorawan (
      dev_address, dev_model, machine, val_workcenter, input_name, input_category, input_value, input_generic
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
  `;

  const ids = [];

  for (const tag of fieldTags) {

    const { dev_address, dev_model, machine, val_workcenter, input_name, input_category, input_value, input_generic } = tag;

    const values = [dev_address, dev_model, machine, val_workcenter, input_name, input_category, input_value, input_generic];

    try {
      const { rows } = await pool.query(query, values);
      ids.push(rows[0].id); // Guarda o ID retornado para cada tag
    } catch (error) {
      console.error('[ERROR] Falha ao salvar dados no banco:', error.message);
      throw error;
    }
  }

  return ids;  // Retorna os IDs de todos os registros inseridos
};

module.exports = {
  registerFieldTag
};
