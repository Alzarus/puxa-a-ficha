const fs = require("fs");
const path = require("path");
const playwright = require("playwright");

const DROPDOWN_PERIOD_BUTTON_SELECTOR =
  ".SumoSelect.sumo_TRA_TRA_DT_MOVIMENTACAO_SC_1";
const LINK =
  "http://177.136.123.157/leg/salvador/LEG_SYS_produtividade_parlamentar_proposicao/";
// const USER_AGENT =
//   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const SCRIPT_TIME_LABEL = "Script Time";

// TODO: COMO RODAR O JOB NOVAMENTE EM CASO DE ERRO?
// DE QUEM EH A RESPONSABILIDADE DE SUBIR OS DADOS PARA A API? ESSE JOB OU UM NOVO?
// COMO APENAS SUBIR OS DADOS NOVOS? EVITAR SOBRESCRITA DESNECESSARIA? MELHORAR A PERFORMANCE
// MELHORAR LOGS

async function propositionProductivityDataJob() {
  try {
    console.time(SCRIPT_TIME_LABEL);
    const [browser, page] = await initialConfigs();
    // const [context, browser, page] = await initialConfigs();

    await goToMainPage(page);

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
    headless: false,
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

async function goToMainPage(page) {
  await page.goto(LINK, { waitUntil: "networkidle0" });

  await page.waitForSelector(DROPDOWN_PERIOD_BUTTON_SELECTOR, {
    visible: true,
  });
  await page.click(DROPDOWN_PERIOD_BUTTON_SELECTOR);

  await wait(5000);
}

async function getTimeNow() {
  const now = new Date();
  return await getFormattedDate(now);
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
