const devicesRemoteIo = require("../devices/devicesList");
const readStatusCategoryModel = require("../models/readStatusCategoryModel");
const registerChangeStatusModel = require("../models/registerStatusChangeModel");
const durationChangeStatus = require("../utils/durationChangeStatus");
const checkIfStatusExistsModel = require("../models/checkExistRegisterModel");

const saveConsolidationService = async () => {
  try {
    for (const module of devicesRemoteIo) {
      const tagNames = Object.values(module.inputs).map(
        (input) => input.tagName
      );

      const inputs = await readStatusCategoryModel(module.val_workcenter);

      for (const tag of tagNames) {
        const lastOffStatus = inputs.find(
          (el) => el.input_name === tag && el.input_value === "0"
        );

        const lastOnStatus = inputs.find(
          (el) => el.input_name === tag && el.input_value === "1"
        );

        if (!lastOffStatus || !lastOnStatus) {
          console.warn(
            `⚠️ Input "${tag}" não possui registros suficientes para análise.`
          );
          continue;
        }

        if (lastOffStatus.record_timestamp < lastOnStatus.record_timestamp) {
          const durationStatus = durationChangeStatus(
            lastOnStatus.record_timestamp,
            lastOffStatus.record_timestamp
          );
          console.log("**************** off veio primeiro");

          const alreadyExists = await checkIfStatusExistsModel(
            lastOffStatus,
            lastOnStatus
          );

          alreadyExists
            ? console.log("⚠️ Status já registrado. Ignorando.")
            : await registerChangeStatusModel(
                lastOffStatus,
                lastOnStatus.record_timestamp,
                durationStatus
              );
        } else {
          const durationStatus = durationChangeStatus(
            lastOffStatus.record_timestamp,
            lastOnStatus.record_timestamp
          );

          console.log(
            "🔴 Máquina parou de rodar após estar ligada por",
            durationStatus,
            "segundos."
          );

          const alreadyExists = await checkIfStatusExistsModel(
            lastOnStatus,
            lastOffStatus
          );

          alreadyExists
            ? console.log("⚠️ Status já registrado. Ignorando.")
            : await registerChangeStatusModel(
                lastOnStatus,
                lastOffStatus.record_timestamp,
                durationStatus
              );
        }
      }
    }
  } catch (error) {
    console.error("[ERROR] Falha ao consolidar status:", error.message);
    throw new Error(`Erro ao consolidar status: ${error.message}`);
  }
};

setInterval(saveConsolidationService, 1000 * 60 * 10 );

module.exports = saveConsolidationService;
