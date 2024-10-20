const fs = require("fs");
const path = require("path");
const axios = require("axios");

const directories = {
  contract: "/app/crawlers/packages/contractDataJob/contractFiles",
  councilor: "/app/crawlers/packages/councilorDataJob/councilorFiles",
  frequency: "/app/crawlers/packages/frequencyDataJob/frequencyFiles",
  generalProductivity:
    "/app/crawlers/packages/generalProductivityDataJob/generalProductivityFiles",
  proposition: "/app/crawlers/packages/propositionDataJob/propositionFiles",
  propositionProductivity:
    "/app/crawlers/packages/propositionProductivityDataJob/propositionProductivityFiles",
  travelExpenses:
    "/app/crawlers/packages/travelExpensesDataJob/travelExpensesFiles",
};

const apiEndpoint = "http://api:3000";

async function processJsonFiles() {
  for (const [key, dir] of Object.entries(directories)) {
    console.log(`Processando arquivos no diretório: ${dir}`);
    const files = fs.readdirSync(dir);

    for (const file of files) {
      if (path.extname(file) === ".json") {
        const filePath = path.join(dir, file);
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

        let processedData;
        switch (key) {
          case "contract":
            processedData = await checkForDuplicatesContract(data);
            break;
          case "councilor":
            processedData = await checkForDuplicatesCouncilor(data);
            break;
          case "frequency":
            processedData = await checkForDuplicatesFrequency(data);
            break;
          case "generalProductivity":
            processedData = await checkForDuplicatesGeneralProductivity(data);
            break;
          case "proposition":
            processedData = await checkForDuplicatesProposition(data);
            break;
          case "propositionProductivity":
            processedData = await checkForDuplicatesPropositionProductivity(
              data
            );
            break;
          case "travelExpenses":
            processedData = await checkForDuplicatesTravelExpenses(data);
            break;
          default:
            processedData = data;
        }

        if (processedData.length > 0) {
          await sendToApi(processedData, key);
        } else {
          console.log(`Nenhum dado novo encontrado no arquivo ${file}.`);
        }
      }
    }
  }
}

async function checkForDuplicatesContract(data) {
  try {
    const response = await axios.get(`${apiEndpoint}/contracts/latest`);
    const lastDate = new Date(response.data.data_publicacao);
    return data.filter(
      (contract) => new Date(contract.con_dt_publicacao) > lastDate
    );
  } catch (error) {
    console.error("Erro ao verificar duplicados para contracts:", error);
    return data;
  }
}

async function checkForDuplicatesCouncilor(data) {
  try {
    const newCouncilors = [];
    for (const councilor of data) {
      const response = await axios.get(
        `${apiEndpoint}/councilors?nome=${encodeURIComponent(councilor.nome)}`
      );
      if (response.data.length === 0) {
        newCouncilors.push(councilor);
      }
    }
    return newCouncilors;
  } catch (error) {
    console.error("Erro ao verificar duplicados para councilors:", error);
    return data;
  }
}

async function checkForDuplicatesFrequency(data) {
  try {
    const response = await axios.get(`${apiEndpoint}/frequencies/latest`);
    const lastSessionNumber = response.data.numeroSessao;
    const lastSessionYear = response.data.anoSessao;
    return data.filter(
      (frequency) =>
        frequency.pre_ses_ano > lastSessionYear ||
        (frequency.pre_ses_ano === lastSessionYear &&
          frequency.pre_ses_numero > lastSessionNumber)
    );
  } catch (error) {
    console.error("Erro ao verificar duplicados para frequencies:", error);
    return data;
  }
}

async function checkForDuplicatesGeneralProductivity(data) {
  try {
    const response = await axios.get(`${apiEndpoint}/general-productivity`);
    const existingData = response.data;

    return data.filter((item) => {
      return !existingData.some((existingItem) => {
        const itemAno = parseInt(item.Ano, 10);
        const existingAno = parseInt(existingItem.Ano, 10);
        const isSameYear = itemAno === existingAno;

        const isSameType =
          existingItem.Tipo.trim().toLowerCase() ===
          item.Tipo.trim().toLowerCase();

        return (
          isSameType &&
          isSameYear &&
          (item.Tipo === "Total Geral" ||
            item.Tipo === "Total" ||
            item.Tipo === "Autor")
        );
      });
    });
  } catch (error) {
    console.error(
      "Erro ao verificar duplicados para general productivity:",
      error
    );
    return data;
  }
}

async function checkForDuplicatesProposition(data) {
  try {
    const response = await axios.get(`${apiEndpoint}/propositions/latest`);
    const lastMovementDate = new Date(response.data.tra_dt_movimentacao);
    return data.filter(
      (proposition) =>
        new Date(proposition.tra_dt_movimentacao) > lastMovementDate
    );
  } catch (error) {
    console.error("Erro ao verificar duplicados para propositions:", error);
    return data;
  }
}

async function checkForDuplicatesPropositionProductivity(data) {
  try {
    const response = await axios.get(`${apiEndpoint}/proposition-productivity`);
    const existingData = response.data;

    return data.filter((item) => {
      return !existingData.some((existingItem) => {
        const itemAno = parseInt(item.Ano, 10);
        const existingAno = parseInt(existingItem.Ano, 10);
        const isSameYear = itemAno === existingAno;

        const isSameType =
          existingItem.Tipo.trim().toLowerCase() ===
          item.Tipo.trim().toLowerCase();

        return (
          isSameType &&
          isSameYear &&
          (item.Tipo === "Total Geral" ||
            item.Tipo === "Total" ||
            item.Tipo === "Autor")
        );
      });
    });
  } catch (error) {
    console.error(
      "Erro ao verificar duplicados para proposition productivity:",
      error
    );
    return data;
  }
}

async function checkForDuplicatesTravelExpenses(data) {
  try {
    const response = await axios.get(`${apiEndpoint}/travel-expenses/latest`);
    const lastDate = new Date(response.data.data);
    return data.filter((expense) => new Date(expense.data) > lastDate);
  } catch (error) {
    console.error("Erro ao verificar duplicados para travel expenses:", error);
    return data;
  }
}

async function sendToApi(data, dataType) {
  try {
    let endpoint;
    switch (dataType) {
      case "contract":
        endpoint = `${apiEndpoint}/contracts`;
        break;
      case "councilor":
        endpoint = `${apiEndpoint}/councilors`;
        break;
      case "frequency":
        endpoint = `${apiEndpoint}/frequencies`;
        break;
      case "generalProductivity":
        endpoint = `${apiEndpoint}/general-productivity`;
        break;
      case "proposition":
        endpoint = `${apiEndpoint}/propositions`;
        break;
      case "propositionProductivity":
        endpoint = `${apiEndpoint}/proposition-productivity`;
        break;
      case "travelExpenses":
        endpoint = `${apiEndpoint}/travel-expenses`;
        break;
      default:
        throw new Error("Tipo de dado desconhecido");
    }

    await axios.post(endpoint, data);
    console.log(`Dados enviados para ${endpoint} com sucesso.`);
  } catch (error) {
    console.error(`Erro ao enviar dados para ${dataType}:`, error);
  }
}

processJsonFiles();
