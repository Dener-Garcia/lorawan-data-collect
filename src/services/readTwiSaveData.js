const fetchDeviceData = require("../utils/fetchGateway");
const devicesRemoteIo = require("../devices/devicesList");
const { registerFieldTag } = require("../models/registerData");

const gatewayUrl = process.env.GATEWAYURL;
const gatewayUser = process.env.GATEWAYUSERNAME;
const gatewayPassword = process.env.GATEWAYPASSWORD;

const inputMapping ={
  DI0: { tagName: 'Máquina rodando', category: 'status_machine' },
  DI1: { tagName: 'Máquina standby', category: 'status_machine' }
};

const collectAndSaveData = async (req, res) => {

  for (const device of devicesRemoteIo){
    const { val_workcenter, machine, devAddr } = device;
   // console.log("device dados", val_workcenter, machine, devAddr)

    try {
      const response = await fetchDeviceData(
        gatewayUrl,
        gatewayUser,
        gatewayPassword,
        device.devAddr
      );

      const inputs = Object.keys(inputMapping)
      const readResult = []


      inputs.map(input => {
        const inputData = response.data[input]
       // console.log("dentro input", input, inputData)

       
       fieldTag = {
        dev_address: response.info.devaddr,
        dev_model: response.info.model,
        machine: machine,
        val_workcenter: val_workcenter,
        input_name: inputMapping[input].tagName || input,
        input_category: inputMapping[input].category,
        input_value: inputData.status.SignalLogic,
        input_generic: input
      }

        readResult.push(fieldTag)
      })
      
      registerFieldTag(readResult)      

    } catch (error) {
      
    }

  }

  
};

setInterval(collectAndSaveData, 30000);

module.exports = collectAndSaveData;
