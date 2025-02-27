const fetchDeviceData = require("../utils/fetchGateway");
const devicesRemoteIo = require('../devices/devicesList');
const { saveDeviceData } = require('../models/deviceData');

const gatewayUrl = process.env.GATEWAYURL;
const gatewayUser = process.env.GATEWAYUSERNAME;
const gatewayPassword = process.env.GATEWAYPASSWORD;

const readAndSaveTwiData = async () => {
    const results = [];

    for (const device of devicesRemoteIo) {
        try {
            const data = await fetchDeviceData(gatewayUrl, gatewayUser, gatewayPassword, device.devAddr);
            const timestamp = new Date();

            for (const [inputName, inputData] of Object.entries(data.data)) {
                const record = {
                    devAddr: device.devAddr,
                    machine: device.machine,
                    workcenter: device.val_workcenter,
                    input_name: inputName,
                    value: inputData.value || inputData.RawData || null,
                    dtt_record: timestamp
                };

                await saveDeviceData(record);
            }

            results.push({
                machine: device.machine,
                status: true,
                workcenter: device.val_workcenter,
                remoteName: device.devAddr
            });
        } catch (error) {
            console.error(`Erro ao ler device ${device.devAddr}:`, error.message);
            results.push({
                machine: device.machine,
                status: false,
                workcenter: device.val_workcenter,
                remoteName: device.devAddr,
                error: error.message
            });
        }
    }

    console.log('[INFO] Leitura e salvamento concluídos.');
};

module.exports = { readAndSaveTwiData };
