const pool = require("./connectMySql");

const registerFieldTagModel = async (fieldTags) => {
  const query = `
    INSERT INTO iot_lorawan (
      dev_address, dev_model, machine, val_workcenter, input_name, input_category, input_value, input_generic
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  for (const tag of fieldTags) {

    const values = [
      tag.dev_address,
      tag.dev_model,
      tag.machine,
      tag.val_workcenter,
      tag.input_name,
      tag.input_category,
      tag.input_value,
      tag.input_generic,
    ];

    try {
      const [results] = await pool.execute(query, values);
      console.log(`Novo registro inserido com ID: ${results.insertId}`);
    } catch (error) {
      console.error("[ERROR] Falha ao salvar dados no banco:", error.message);
      throw error;
    }
  }
};

module.exports = registerFieldTagModel;
