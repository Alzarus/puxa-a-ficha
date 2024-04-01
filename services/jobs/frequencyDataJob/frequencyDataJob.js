const fs = require("fs");
const puppeteer = require("puppeteer");
const xml2js = require("xml2js");

const DOWNLOAD_BUTTON_SELECTOR = ".scButton_default";
const DOWNLOAD_PATH = "./frequencyFiles";
const EXPECTED_FILENAME = "LEG_SYS_frequencia.xml";
const LINK = "http://177.136.123.157/leg/salvador/LEG_SYS_frequencia/";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const XML_BUTTON_SELECTOR = "#xml_top";

async function frequencyDataJob() {
  try {
    const [context, browser, page] = await initialConfigs();

    await page.goto(LINK, { waitUntil: "networkidle0" });

    await page.waitForSelector(XML_BUTTON_SELECTOR, { visible: true });
    await page.click(XML_BUTTON_SELECTOR);

    await wait(5000);

    await page.waitForSelector(DOWNLOAD_BUTTON_SELECTOR, { visible: true });
    await page.click(DOWNLOAD_BUTTON_SELECTOR);

    await waitForDownloadComplete(DOWNLOAD_PATH, EXPECTED_FILENAME)
      .then((filePath) => console.log(`Download concluído: ${filePath}`))
      .catch((error) => console.error(error));

    await wait(10000);

    // // Lê o arquivo XML (substitua 'caminho/do/arquivo.xml' pelo caminho real do seu arquivo XML)
    // const xml = fs.readFileSync("caminho/do/arquivo.xml", "utf8");

    // // Cria uma nova instância do parser
    // const parser = new xml2js.Parser();

    // // Converte o XML para JSON
    // parser.parseString(xml, (err, result) => {
    //   if (err) {
    //     throw err;
    //   }

    //   // `result` é um objeto JavaScript
    //   console.log(result);

    //   // Para converter o objeto JavaScript para uma string JSON
    //   const json = JSON.stringify(result, null, 2);
    //   console.log(json);
    // });

    await browser.close();
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
    headless: false,
    defaultViewport: null,
  };

  const browser = await puppeteer.launch(options);

  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  await page.setUserAgent(USER_AGENT);

  const client = await page.target().createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: DOWNLOAD_PATH,
  });

  //   await context.overridePermissions(LINK, ["geolocation"]);

  await page.setViewport({ width: 1280, height: 800 });

  page.setDefaultTimeout(61000);

  return [context, browser, page];
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

async function getTimeNow() {
  const now = new Date();
  return await getFormattedDate(now);
}

function renameStringToFileUsage(texto) {
  return texto.replace(/\s+/g, "-");
}

async function wait(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
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
      // Isso captura e loga a mensagem de erro e a stack trace
      string += `Error: ${receivedString.message}\nStack: ${receivedString.stack}`;
    } else {
      // Para outros tipos de objetos, você pode querer convertê-los em string
      // ou manipular de outra forma.
      string += `Object: ${JSON.stringify(receivedString)}`;
    }
  } else {
    string += receivedString;
  }
  string += "\n";

  console.log(string);
}

frequencyDataJob();
