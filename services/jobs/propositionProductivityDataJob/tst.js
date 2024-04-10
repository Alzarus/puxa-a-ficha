const playwright = require('playwright');

async function run() {
  const browser = await playwright.chromium.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://177.136.123.157/leg/salvador/LEG_SYS_produtividade_parlamentar_proposicao/');
  // Adicione mais ações aqui
}

run();
