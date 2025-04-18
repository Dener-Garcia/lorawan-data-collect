const sql = require('mssql');

// Configuração da conexão
const config = {
  user: 'usr_mediacore',
  password: 'Integraca0',
  server: '10.116.135.88',
  database: 'db_mcChronosDw',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// Criação do pool global
let pool;

const connectToDatabase = async () => {
  if (!pool) {
    try {
      pool = await sql.connect(config);
      console.log('📡 Conectado ao SQL Server');
    } catch (err) {
      console.error('❌ Falha ao conectar no SQL Server:', err.message);
    }
  }
};

// Função de salvar os dados no SQL Server
async function saveDataChronos(fieldTags) {
  try {
    await connectToDatabase(); // Garante que estamos conectados

    for (const tag of fieldTags) {
      await pool.request()
        .input('val_workcenter', sql.VarChar, tag.val_workcenter)
        .query(`
          INSERT INTO consolidation.tb_DadosWac (Val_WorkCenter, Dtt_Record)
          VALUES (@val_workcenter, GETDATE())
        `);
      console.log('✅ Dado inserido com sucesso!', tag);
    }

  } catch (err) {
    console.error('❌ Erro ao inserir dados:', err.message);
  }
}

module.exports = {
  saveDataChronos
};
