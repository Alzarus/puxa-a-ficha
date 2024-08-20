const fs = require("fs");
const path = require("path");
const axios = require("axios");

const jsonDir = "/app/crawlers/output"; // Diretório onde os JSONs são salvos pelos crawlers

async function processJsonFiles() {
  const files = fs.readdirSync(jsonDir);

  for (const file of files) {
    if (path.extname(file) === ".json") {
      const filePath = path.join(jsonDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

      // Verifique se os dados são duplicados ou não
      const isDuplicate = await checkForDuplicates(data);

      if (!isDuplicate) {
        // Envie os dados para a API
        await sendToApi(data);
      } else {
        console.log(`Dados duplicados encontrados no arquivo ${file}.`);
      }
    }
  }
}

async function checkForDuplicates(data) {
  // Implementar lógica para verificar duplicação
  // Por exemplo, consultar a API para verificar se o dado já existe
  // Pode usar identificadores únicos como IDs ou timestamps
  return false; // Placeholder: Retornar true se duplicado
}

async function sendToApi(data) {
  try {
    await axios.post("http://api:3000/your-endpoint", data);
    console.log("Dados enviados para a API com sucesso.");
  } catch (error) {
    console.error("Erro ao enviar dados para a API:", error);
  }
}

processJsonFiles();
