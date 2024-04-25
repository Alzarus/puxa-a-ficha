const fs = require("fs");
const path = require("path");
const playwright = require("playwright");

const DROPDOWN_OPTIONS_SELECTOR = ".opt";
const DROPDOWN_PERIOD_BUTTON_SELECTOR =
  ".SumoSelect.sumo_TRA_TRA_DT_MOVIMENTACAO_SC_1";
const INPUT_PATH = path.join(
  __dirname,
  "./propositionProductivityFiles/tableData.json"
);
const LINK =
  "http://177.136.123.157/leg/salvador/LEG_SYS_produtividade_parlamentar_proposicao/";

const T_BODY_SELECTOR = "#sc-ui-summary-body > tbody:nth-child(2)";
const T_ROWS_SELECTOR = "#sc-ui-summary-body > tbody:nth-child(2) > tr";
const SCRIPT_TIME_LABEL = "Script Time";

// TODO: COMO RODAR O JOB NOVAMENTE EM CASO DE ERRO?
// DE QUEM EH A RESPONSABILIDADE DE SUBIR OS DADOS PARA A API? ESSE JOB OU UM NOVO?
// COMO APENAS SUBIR OS DADOS NOVOS? EVITAR SOBRESCRITA DESNECESSARIA? MELHORAR A PERFORMANCE
// MELHORAR LOGS

async function propositionProductivityDataJob() {
  try {
    console.time(SCRIPT_TIME_LABEL);
    const [browser, page] = await initialConfigs();

    await goToMainPage(page);

    await getTableData(page);

    await wait(5000);

    await browser.close();
    console.timeEnd(SCRIPT_TIME_LABEL);
  } catch (error) {
    await writeLog(error);
    process.exit();
  }
}

async function initialConfigs() {
  const options = {
    headless: true,
  };

  const browser = await playwright.chromium.launch(options);
  const page = await browser.newPage();

  return [browser, page];
}

async function getFormattedDate(date) {
  const options = {
    timeZone: "America/Sao_Paulo", // Configura o fuso horário para Brasília (BRT)
    hour12: false, // Usa formato de 24 horas
    // weekday: 'short', // Exibe apenas o dia da semana abreviado
    year: "numeric", // Exibe apenas o ano (com 4 dígitos)
    month: "2-digit", // Exibe o mês como dois dígitos
    day: "2-digit", // Exibe o dia do mês como dois dígitos
    hour: "2-digit", // Exibe a hora como dois dígitos
    minute: "2-digit", // Exibe os minutos como dois dígitos
    second: "2-digit", // Exibe os segundos como dois dígitos
  };

  return date.toLocaleString("pt-BR", options);
}

async function getFormattedPath(originalFilePath) {
  const now = new Date();

  const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;
  const formattedTime = `${now.getHours().toString().padStart(2, "0")}${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`;

  const fileNameWithoutExtension = originalFilePath.replace(".json", "");

  const fileExtension = originalFilePath.split(".").pop();

  return `${fileNameWithoutExtension}_${formattedDate}_${formattedTime}.${fileExtension}`;
}

async function getTableData(page) {
  try {
    await page.waitForSelector(T_BODY_SELECTOR);

    const rows = await page.$$(T_ROWS_SELECTOR);

    if (rows.length < 2) {
      throw new Error("Não há dados suficientes na tabela.");
    }

    // Lê os títulos das colunas da primeira linha
    const headerCells = await rows[0].$$("td");
    let headers = [];
    for (const cell of headerCells) {
      const text = await cell.textContent();
      headers.push(text.trim());
    }

    // [
    //   'Ano', 'Parlamentar/Autor',
    //   'MOC', 'PDL',
    //   'PEL', 'PIN',
    //   'PLC', 'PLE',
    //   'PRE', 'RAD',
    //   'REP', 'RUP',
    //   'VTO', 'Total'
    // ]

    let tableData = [];

    // Processa cada linha a partir da terceira
    for (let i = 2; i < rows.length; i++) {
      const cells = await rows[i].$$("td");
      let auxList = [];
      let rowData = {};
      let isTotalLine = !isNaN(parseInt(await cells[1].textContent(), 10));

      for (let j = 0; j < cells.length; j++) {
        const text = (await cells[j]?.textContent()) || "";
        auxList.push(text.trim());

        if (isTotalLine) {
          switch (j) {
            case 0:
              rowData[headers[j]] = text.trim();
              break;
            case 1:
              rowData[headers[j]] = "";
              break;
            case cells.length - 1:
              rowData[headers[j + 1]] = auxList[j];
            default:
              rowData[headers[j]] = auxList[j - 1];
              break;
          }
        } else {
          rowData[headers[j]] = text.trim();
        }

        // console.log(text.trim());
      }

      // Adiciona uma coluna Tipo para identificar a linha
      if (i === rows.length - 1) {
        // Última linha como 'Total Geral'
        rowData["Tipo"] = "Total Geral";
      } else if (isTotalLine) {
        // Linhas de total sem nome de autor
        rowData["Tipo"] = "Total";
      } else {
        // Linhas normais com nome de autor
        rowData["Tipo"] = "Autor";
      }

      tableData.push(rowData);
    }

    const jsonContent = JSON.stringify(tableData, null, 2);
    await fs.promises.writeFile(
      "./propositionProductivityFiles/tableData.json",
      jsonContent
    );

    await writeLog("Dados salvos com sucesso!");

    const newFilePath = await getFormattedPath(INPUT_PATH);

    await renameFile(INPUT_PATH, newFilePath);

    await writeLog(`Arquivo renomeado para: ${newFilePath}`);
  } catch (error) {
    await writeLog(error);
  }
}

async function goToMainPage(page) {
  try {
    await page.goto(LINK, { waitUntil: "networkidle0" });

    await page.waitForSelector(DROPDOWN_PERIOD_BUTTON_SELECTOR, {
      visible: true,
    });

    const dropdownOptions = await page.$$(DROPDOWN_OPTIONS_SELECTOR);

    if (dropdownOptions.length > 0) {
      await page.click(DROPDOWN_PERIOD_BUTTON_SELECTOR);

      await wait(1000);

      await dropdownOptions[1].click();
    }

    await wait(1000);

    await page.waitForFunction(
      () => !document.querySelector(".blockUI.blockOverlay"),
      { timeout: 30000 }
    );
  } catch (error) {
    await writeLog(error);
  }
}

async function getTimeNow() {
  const now = new Date();
  return await getFormattedDate(now);
}

async function renameFile(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  }).catch((error) => {
    throw new Error(`Erro ao renomear o arquivo: ${error}`);
  });
}

async function wait(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function writeLog(receivedString) {
  let string = `${await getTimeNow()} - `;
  if (typeof receivedString === "object" && receivedString !== null) {
    if (receivedString instanceof Error) {
      string += `Error: ${receivedString.message}\nStack: ${receivedString.stack}`;
    } else {
      string += `Object: ${JSON.stringify(receivedString)}`;
    }
  } else {
    string += receivedString;
  }
  string += "\n";

  console.log(string);
}

propositionProductivityDataJob();
