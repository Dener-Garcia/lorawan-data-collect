const { devicesRemoteIo } = require("../devices/devicesList");
const pool = require("../models/connectMySql");
const readStatusCategoryModel = require("../models/readStatusCategoryModel");
const registerChangeStatusModel = require("../models/registerStatusChangeModel");
const registerChangeStatus = require("../models/registerStatusChangeModel");
const durationChangeStatus = require("../utils/durationChangeStatus");

const saveConsolidationService = async () => {

  const query = `
    SELECT *
    FROM lorawan_consolidation
    WHERE val_workcenter = $1
    AND dtt_start = $2
    ORDER BY dtt_start DESC
  `;

  const checkIfExist = async (val_workcenter, record_timestamp) => {
    console.log("dentro model", val_workcenter, record_timestamp);
    const { rows } = await pool.query(query, [
      val_workcenter,
      record_timestamp,
    ]);
    return rows;
  };

  try {
    for (const module of devicesRemoteIo) {
      const tagNames = Object.values(module.inputs).map(
        (input) => input.tagName
      );
      const inputs = await readStatusCategoryModel(module.val_workcenter);

      for (const tag of tagNames) {
        const lastOffStatus = inputs.rows.find(
          (el) => el.input_name === tag && el.input_value === "0"
        );

        const lastOnStatus = inputs.rows.find(
          (el) => el.input_name === tag && el.input_value === "1"
        );

        const offStatus = lastOffStatus
        const onStatus = lastOnStatus || "tem nada aqui caralho"

        console.log("vendo minhas inpuuts", offStatus, onStatus)


        if (offStatus.record_timestamp < onStatus.record_timestamp) {
          console.log("input em 1")

          const duration = durationChangeStatus(
            onStatus.record_timestamp,
            offStatus.record_timestamp
          );

          const registerExist = await checkIfExist(
            onStatus.val_workcenter,
            onStatus.record_timestamp
          );
          console.log("ja existe", registerExist, registerExist.length);

          if (registerExist.length > 0) {
            console.log("ja existe", registerExist);
          } else {
            await registerChangeStatusModel(onStatus, duration);
          }
        } else {
          console.log("input em 0")
          const duration = durationChangeStatus(
            offStatus.record_timestamp,
            onStatus.record_timestamp
          );

          const registerExist = await checkIfExist(
            offStatus.val_workcenter,
            offStatus.record_timestamp
          );

          if (registerExist.length > 0) {
            console.log("ja existe", registerExist);
          } else {
            await registerChangeStatusModel(offStatus, duration);
          }
        }
      }
    }
  } catch (error) {
    console.error("[ERROR] Falha ao consolidar status:", error.message);
    throw new Error(`Erro ao consolidar status: ${error.message}`);
  }
};

module.exports = saveConsolidationService
