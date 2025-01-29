
const fetchDeviceData = async (gatewayUrl, username, password, devAddr) => {
  const url = `${gatewayUrl}${devAddr}`;

  const auth = Buffer.from(`${username}:${password}`).toString('base64');
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
      },
      timeout: 6000,
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados do dispositivo ${devAddr}: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

  //  console.log(data)
    
  return data
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error(`[ERRO] Timeout: O dispositivo ${devAddr} não respondeu dentro do tempo limite.`);
    } else {
      console.error(`[ERRO] ${url} - Mensagem: ${error.message}`);
    }
    throw new Error(`Erro ao acessar o dispositivo ${devAddr}: ${error.message}`);
  }
};

module.exports = fetchDeviceData;
