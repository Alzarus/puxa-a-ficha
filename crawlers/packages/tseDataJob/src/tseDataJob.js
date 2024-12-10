const { chromium } = require("playwright-extra");
const stealth = require("puppeteer-extra-plugin-stealth")();

chromium.use(stealth);

const LINK =
  "https://www.tse.jus.br/servicos-eleitorais/autoatendimento-eleitoral#/atendimento-eleitor";
const WHERE_TO_VOTE_BUTTON = '[nome-servico="ConsultarOndeVotar"]';
const COOKIES_MODAL_SELECTOR = "div.cookies";
const COOKIES_MODAL_CLOSE_BUTTON = 'button:has-text("Aceito")';
const INPUT_TITULO_CPF_NOME = '[formcontrolname="TituloCPFNome"]';
const INPUT_DATA_NASCIMENTO = '[formcontrolname="dataNascimento"]';
const INPUT_NOME_MAE = '[formcontrolname="nomeMae"]';
const CHECKBOX_MAE_NAO_CONSTA = '[formcontrolname="MaeNaoConsta"]';
const LOGIN_BUTTON = ".btn-tse";

async function tseDataJob(args) {
  try {
    const { tituloCpf, dataNascimento, nomeMae } = args;

    console.time("Script Execution Time");

    const [browser, page] = await initialConfigs();

    await goToMainPage(page);

    await fillInputData(page, tituloCpf, dataNascimento, nomeMae);

    await login(page);

    await validateLogin(page);

    await browser.close();

    console.timeEnd("Script Execution Time");
  } catch (error) {
    await writeLog(error);
    process.exit(1);
  }
}

async function initialConfigs() {
  const options = {
    headless: false,
    slowMo: 100,
  };

  const browser = await chromium.launch(options);
  const page = await browser.newPage();

  return [browser, page];
}

async function closeModal(page) {
  const modalIsVisible = await page.isVisible(COOKIES_MODAL_SELECTOR);
  if (modalIsVisible) {
    await page.click(COOKIES_MODAL_CLOSE_BUTTON);
  }
}

async function fillInputData(page, cpf, nascimento, nomeMae) {
  await page.fill(INPUT_TITULO_CPF_NOME, cpf);
  await page.fill(INPUT_DATA_NASCIMENTO, nascimento);

  if (nomeMae) {
    await page.fill(INPUT_NOME_MAE, nomeMae);
  } else {
    await page.click(CHECKBOX_MAE_NAO_CONSTA);
  }
}

async function goToMainPage(page) {
  await page.goto(LINK, { waitUntil: "networkidle0" });
  await closeModal(page);
  await page.click(WHERE_TO_VOTE_BUTTON);
  await page.waitForTimeout(3000);
}

async function login(page) {
  await page.click(LOGIN_BUTTON);
}

async function validateLogin(page) {
  try {
    await page.waitForSelector("span.font-weight-bold", { timeout: 5000 });
    const cpfText = await page.textContent("span.font-weight-bold");
    console.log(`Busca bem-sucedida. CPF encontrado: ${cpfText}`);
  } catch (error) {
    console.log("Erro: A página de sucesso não foi carregada.");
    throw error;
  }
}

async function writeLog(message) {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] ${
      typeof message === "object" ? JSON.stringify(message) : message
    }`
  );
}

function processArgs() {
  const args = require("yargs")
    .usage(
      "Uso: node $0 --tituloCpf <titulo ou CPF> --dataNascimento <data> [--nomeMae <nome>]"
    )
    .option("tituloCpf", {
      alias: "t",
      describe: "Título ou CPF do eleitor",
      type: "string",
      demandOption: true,
    })
    .option("dataNascimento", {
      alias: "d",
      describe: "Data de nascimento no formato DD/MM/AAAA",
      type: "string",
      demandOption: true,
    })
    .option("nomeMae", {
      alias: "n",
      describe: "Nome da mãe (opcional, se não constar no documento)",
      type: "string",
      default: null,
    })
    .help("h")
    .alias("h", "help").argv;

  return args;
}

(async () => {
  const args = processArgs();
  await tseDataJob(args);
})();
