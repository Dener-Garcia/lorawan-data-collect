const fetchDeviceData = require("../utils/fetchGateway");
const devicesRemoteIo = require('../devices/devicesList')

const gatewayUrl = process.env.GATEWAYURL
const gatewayUser = process.env.GATEWAYUSERNAME;
const gatewayPassword = process.env.GATEWAYPASSWORD;

  const readAllRemoteIoController = async (req, res) => {

      const results = []

      for (const device of devicesRemoteIo) {
          try {
            const data = await fetchDeviceData(gatewayUrl, gatewayUser, gatewayPassword, device.devAddr)
            results.push({
                machine: device.machine,
                status: true,
                workcenter: device.val_workcenter,
                remoteName: device.devAddr,
                data: data,
            })
        } catch (error) {
            results.push({
                machine: device.machine,
                status: false,
                workcenter: device.val_workcenter,
                remoteName: device.devAddr,
                error: `Erro ao ler device: ${error.message}`
            })
        }
    }
    console.log('[INFO] Leitura concluída.');

    res.status(200).json(results)


  }

  module.exports = readAllRemoteIoController





