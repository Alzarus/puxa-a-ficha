const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const xml2js = require("xml2js");

const INPUT_PATH = path.join(
  __dirname,
  "./frequencyFiles/LEG_SYS_frequencia.xml"
);
const OUTPUT_PATH = path.join(
  __dirname,
  "./frequencyFiles/LEG_SYS_frequencia.json"
);
const DOWNLOAD_BUTTON_SELECTOR = ".scButton_default";
const DOWNLOAD_FOLDER_PATH = path.join(__dirname, "./frequencyFiles");
const EXPECTED_FILENAME = "LEG_SYS_frequencia.xml";
const LINK = "http://177.136.123.157/leg/salvador/LEG_SYS_frequencia/";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const SCRIPT_TIME_LABEL = "Script Time";
const XML_BUTTON_SELECTOR = "#xml_top";

// TODO: COMO RODAR O JOB NOVAMENTE EM CASO DE ERRO?
// DE QUEM EH A RESPONSABILIDADE DE SUBIR OS DADOS PARA A API? ESSE JOB OU UM NOVO?
// COMO APENAS SUBIR OS DADOS NOVOS? EVITAR SOBRESCRITA DESNECESSARIA? MELHORAR A PERFORMANCE
// MELHORAR LOGS

async function frequencyDataJob() {
  try {
    console.time(SCRIPT_TIME_LABEL);
    const [context, browser, page] = await initialConfigs();

    await goToXMLDownloadPage(page);

    await waitForAvailableDownload(page);

    await makeDownload(page);

    await waitForDownloadComplete(DOWNLOAD_FOLDER_PATH, EXPECTED_FILENAME)
      .then((filePath) => writeLog(`Download concluído: ${filePath}`))
      .catch((error) => writeLog(error));

    await convertXmlToJson(
      INPUT_PATH,
      await getFormattedPath(OUTPUT_PATH)
    ).catch(console.error);

    await wait(10000);

    await browser.close();
    console.timeEnd(SCRIPT_TIME_LABEL);
  } catch (error) {
    await writeLog(error);
    process.exit();
  }
}

async function initialConfigs() {
  const myArgs = [
    "--disable-extensions",
    "--disable-features=IsolateOrigins,site-per-process",
    "--disable-gpu",
    "--disable-infobars",
    "--disable-setuid-sandbox",
    "--disable-web-security",
    "--enable-webgl",
    "--enable-accelerated-2d-canvas",
    "--force-device-scale-factor",
    "--ignore-certificate-errors",
    "--no-sandbox",
    "--disable-features=site-per-process",
    "--disable-features=IsolateOrigins,site-per-process,SitePerProcess",
    "--flag-switches-begin --disable-site-isolation-trials --flag-switches-end",
  ];

  const options = {
    args: myArgs,
    headless: "new",
    defaultViewport: null,
  };

  const browser = await puppeteer.launch(options);

  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  await page.setUserAgent(USER_AGENT);

  const client = await page.target().createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: DOWNLOAD_FOLDER_PATH,
  });

  //   await context.overridePermissions(LINK, ["geolocation"]);

  await page.setViewport({ width: 1280, height: 800 });

  page.setDefaultTimeout(61000);

  return [context, browser, page];
}

async function convertXmlToJson(inputPath, outputPath) {
  const xml = fs.readFileSync(inputPath, "utf8");

  const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });

  const result = await parser.parseStringPromise(xml);

  const json = JSON.stringify(result, null, 2);

  fs.writeFileSync(outputPath, json, "utf8");

  writeLog(`Arquivo JSON salvo em: ${outputPath}`);
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

async function getFormattedPath(originalFileName) {
  const now = new Date();

  const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;
  const formattedTime = `${now.getHours().toString().padStart(2, "0")}${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`;

  const fileNameWithoutExtension = originalFileName.replace(".json", "");

  const fileExtension = originalFileName.split(".").pop();

  return `${fileNameWithoutExtension}_${formattedDate}_${formattedTime}.${fileExtension}`;
}

async function goToXMLDownloadPage(page) {
  await page.goto(LINK, { waitUntil: "networkidle0" });

  await page.waitForSelector(XML_BUTTON_SELECTOR, { visible: true });
  await page.click(XML_BUTTON_SELECTOR);

  await wait(5000);
}

async function getTimeNow() {
  const now = new Date();
  return await getFormattedDate(now);
}

async function makeDownload(page) {
  await page.waitForSelector(DOWNLOAD_BUTTON_SELECTOR, { visible: true });

  const downloadButton = await page.evaluateHandle(
    (DOWNLOAD_BUTTON_SELECTOR) =>
      Array.from(document.querySelectorAll(DOWNLOAD_BUTTON_SELECTOR)).find(
        (button) =>
          button.textContent.includes("Baixar") &&
          !button.classList.contains("disabled")
      ),
    DOWNLOAD_BUTTON_SELECTOR
  );

  if (downloadButton.asElement()) {
    await downloadButton.asElement().click();
  } else {
    console.log('Botão "Baixar" não encontrado.');
  }
}

async function wait(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function waitForAvailableDownload(page) {
  await page.waitForFunction(
    () => {
      const exportMessages = Array.from(
        document.querySelectorAll(".scExportLineFont")
      );
      return exportMessages.some((message) =>
        message.textContent.includes("Arquivo gerado com sucesso")
      );
    },
    { timeout: 0 }
  );
}

async function waitForDownloadComplete(
  downloadPath,
  expectedFilename,
  timeout = 30000
) {
  let filename;
  const startTime = new Date().getTime();

  while (true) {
    const files = fs.readdirSync(downloadPath);

    filename = files.find((file) => file.includes(expectedFilename));

    if (filename) {
      const filePath = path.join(downloadPath, filename);
      const fileSize1 = fs.statSync(filePath).size;
      await wait(1000);
      const fileSize2 = fs.statSync(filePath).size;

      if (fileSize1 === fileSize2) break;
    }

    if (new Date().getTime() - startTime > timeout) {
      throw new Error("Download timeout");
    }
  }

  return path.join(downloadPath, filename);
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

frequencyDataJob();
