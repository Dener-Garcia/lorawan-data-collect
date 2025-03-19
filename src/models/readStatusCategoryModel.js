const pool = require("./connectMySql");

const readStatusCategoryModel = async (workcenter) => {
  const query = `
    SELECT *
    FROM iot_lorawan 
    WHERE input_category = 'status_machine'
    AND val_workcenter = ?
    ORDER BY record_timestamp DESC 
`;

  try {
    const [inputs] = await pool.execute(query, [workcenter]);
    return inputs;
  } catch (error) {
    console.log("erro banco", error);
  }
};

module.exports = readStatusCategoryModel;
