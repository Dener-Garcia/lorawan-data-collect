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
  },
pool: {
  max: 5,              // Máximo de conexões ativas
  min: 0,               // Mínimo de conexões mantidas no pool
  idleTimeoutMillis: 30000 // Tempo que a conexão pode ficar ociosa antes de ser fechada
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
async function saveDataChronos(fieldTag) {
  console.log("Dentro da minh afuncoa", fieldTag)
  try {
    await connectToDatabase(); // Garante que estamos conectados

    for (const tag of fieldTag) {
      await pool.request()
        .input('val_workcenter', sql.VarChar, tag.val_workcenter)
        .input('val_tagname', sql.VarChar, tag.input_name)
        .input('val_valoramostra', sql.Decimal, tag.input_value)
        .query(`
          INSERT INTO consolidation.tb_DadosWac (Val_WorkCenter, Val_Linha, Val_ValorAmostra, Dtt_Amostra)
          VALUES (@val_workcenter, @val_tagname, @val_valoramostra, GETDATE())
        `);
      console.log('✅ Dado inserido com sucesso!', tag);
    }

  } catch (err) {
    console.error('❌ Erro ao inserir dados:', err.message);
  }
}

// Função para limpar dados com mais de 2 meses
async function cleanOldDataChronos() {
  try {
    await connectToDatabase();

    const result = await pool.request().query(`
      DELETE FROM consolidation.tb_DadosWac
      WHERE Dtt_Amostra < DATEADD(MONTH, -2, GETDATE())
    `);

    console.log(`🧹 Limpeza concluída. Registros removidos: ${result.rowsAffected[0]}`);
  } catch (err) {
    console.error('❌ Erro ao limpar dados antigos:', err.message);
  }
}

// Exporta ambas as funções
module.exports = {
  saveDataChronos,
  cleanOldDataChronos
};