const fetchDeviceData = require("../utils/fetchGateway");
const devicesRemoteIo = require("../devices/devicesList");
const registerFieldTagModel = require("../models/registerFieldTagModel");
const { inserirPessoa } = require("./saveDataChronos");

const gatewayUrl = process.env.GATEWAYURL;
const gatewayUser = process.env.GATEWAYUSERNAME;
const gatewayPassword = process.env.GATEWAYPASSWORD;

const fieldDataCollectService = async () => {
  console.log("Running routine each 30s - field data collect service");

  for (const device of devicesRemoteIo) {
    const { val_workcenter, machine, devAddr, inputs } = device;

    //console.log("device dados", val_workcenter, machine, devAddr, inputs);

    try {
      const response = await fetchDeviceData(
        gatewayUrl,
        gatewayUser,
        gatewayPassword,
        device.devAddr
      );

      const inputAdress = Object.keys(inputs);
      const readResult = [];

      inputAdress.map((input) => {
        const inputData = response.data[input];

        fieldTag = {
          dev_address: response.info.devaddr,
          dev_model: response.info.model,
          machine: machine,
          val_workcenter: val_workcenter,
          input_name: inputs[input].tagName || input,
          input_category: inputs[input].category,
          input_value: inputData.status.SignalLogic,
          input_generic: input,
        };
        readResult.push(fieldTag);
      });
      registerFieldTagModel(readResult);
    } catch (error) {
      console.log("Error execute routine", error);
    }
  }
};

setInterval(fieldDataCollectService, 30000);

module.exports = fieldDataCollectService;
