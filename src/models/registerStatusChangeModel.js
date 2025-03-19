const pool = require("./connectMySql");

const registerChangeStatusModel = async (fieldTags, dtt_end, duration) => {


  const query = `
    INSERT INTO lorawan_consolidation (
        dev_address, dev_model, machine, val_workcenter, input_name, input_category, input_value, input_generic, dtt_start, dtt_end, dtt_duration
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

  const ids = [];

  console.log("dentro model", fieldTags, dtt_end, duration)

  // return
    
  const values = [
    fieldTags.dev_address,
    fieldTags.dev_model,
    fieldTags.machine,
    fieldTags.val_workcenter,
    fieldTags.input_name,
    fieldTags.input_category,
    fieldTags.input_value,
    fieldTags.input_generic,  
    fieldTags.record_timestamp,
    dtt_end,
    duration,
  ];

  try {
    const [result] = await pool.query(query, values);

    console.log(`✅ Novo status registrado! ID: ${result.insertId}`);
   // ids.push(rows[0].id); // Guarda o ID retornado para cada tag

    //return ids
  } catch (error) {
    console.error("[ERROR] Falha ao salvar dados no banco:", error.message);
    throw error;
  }

};

module.exports = registerChangeStatusModel;
