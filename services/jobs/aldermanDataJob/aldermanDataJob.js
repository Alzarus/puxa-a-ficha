const fs = require("fs");
const puppeteer = require("puppeteer");

// TODO: https://www.cms.ba.gov.br/vereadores - PARAMETRIZAR PARA PEGAR OS DADOS DE TODOS OS VEREADORES

const MAIN_LINK = "https://www.cms.ba.gov.br";
const ALL_ALDERMAN_LINK = "https://www.cms.ba.gov.br/vereadores";
const SCRIPT_TIME_LABEL = "Script Time";
const LINK = "https://www.cms.ba.gov.br/vereadores/carlos-muniz";
// const LINK = "https://www.cms.ba.gov.br/vereadores/cezar-leite";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function aldermanDataJob() {
  try {
    console.time(SCRIPT_TIME_LABEL);

    const [context, browser, page] = await initialConfigs();

    // await page.goto(ALL_ALDERMAN_LINK, { waitUntil: "networkidle0" });

    // const urls = await getAllAldermanUrls(page);

    // console.log(urls.length);
    // console.log(urls);

    await page.goto(LINK, { waitUntil: "networkidle0" });

    const infoObject = await getAldermanInfoObject(page);
    infoObject["descricao"] = await getAldermanDescription(page);
    infoObject["linkFoto"] = `${MAIN_LINK}${await getBackgroundImageUrl(page)}`;
    infoObject["emAtividade"] = await getAldermanActivityInfo(page);

    console.log(infoObject);
    // console.log(infoObject.extras["e-mail"]);

    await saveAldermanPhoto(page, infoObject);

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

  await context.overridePermissions(ALL_ALDERMAN_LINK, ["geolocation"]);

  await page.setViewport({ width: 1280, height: 800 });

  page.setDefaultTimeout(61000);

  return [context, browser, page];
}

async function getAllAldermanUrls(page) {
  return await page.evaluate(() => {
    const containers = Array.from(
      document.querySelectorAll(".avatar-container")
    );
    return containers
      .map((container) => {
        const onclickValue = container.getAttribute("onclick");
        const urlMatch = onclickValue.match(/'([^']+)'/);
        return urlMatch ? urlMatch[1] : null;
      })
      .filter((url) => url !== null);
  });
}

async function getAldermanActivityInfo(page) {
  return await page
    .$eval("#content > div > div > div.col-md-8 > h2", (elemento) => {
      return elemento.textContent.toLowerCase().includes("legislatura");
    })
    .catch(() => {
      return false;
    });
}

async function getAldermanDescription(page) {
  return await page.evaluate(() => {
    const container = document.querySelector("#fade-content");
    if (!container) return "";

    const paragraphs = Array.from(container.querySelectorAll("p"));
    const paragraphsTexts = paragraphs
      .map((p) => p.textContent.trim().replace(/\n/g, " "))
      .join(" ");

    return paragraphsTexts;
  });
}

async function getAldermanInfoObject(page) {
  return await page.evaluate(() => {
    const infoDiv = document.querySelector(".info");
    if (!infoDiv) return null;

    const h4 = infoDiv.querySelector("h4")
      ? infoDiv.querySelector("h4").innerText
      : "";
    const partido = infoDiv.querySelector(".partido")
      ? infoDiv.querySelector(".partido").innerText
      : "";
    const extras = Array.from(infoDiv.querySelectorAll(".extra")).map(
      (p) => p.innerText
    );

    const infoObj = { nome: h4, partido: partido, extras: {} };

    extras.forEach((extra) => {
      const [label, value] = extra.split(":").map((s) => s.trim());
      if (label && value) {
        infoObj.extras[label.toLowerCase().replace(/ /g, "_")] = value;
      }
    });

    return infoObj;
  });
}

async function getBackgroundImageUrl(page) {
  return await page.evaluate(() => {
    const photoEl = document.querySelector(".photo");
    if (!photoEl) return "";
    const bgImage = photoEl.style.backgroundImage;
    return bgImage.replace(/url\((['"])?(.*?)\1\)/gi, "$2");
  });
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

function renameStringToFileUsage(receivedString) {
  return receivedString.replace(/\s+/g, "-");
}

async function saveAldermanPhoto(page, infoObject) {
  try {
    await page.goto(infoObject.linkFoto, { waitUntil: "networkidle0" });

    const imageBuffer = await page.evaluate(() =>
      fetch(document.location.href)
        .then((res) => res.arrayBuffer())
        .then((buf) => Array.from(new Uint8Array(buf)))
    );

    const filePath = `./aldermanPhotos/${renameStringToFileUsage(
      infoObject.nome
    )}.jpg`;
    fs.writeFileSync(filePath, Buffer.from(imageBuffer));

    await writeLog(`Imagem salva com sucesso: ${filePath}`);
  } catch (error) {
    await writeLog(error);
  }
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

aldermanDataJob();
