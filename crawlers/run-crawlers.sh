#!/bin/bash

# Diretório de logs
mkdir -p /app/crawlers/logs

# Captura o horário de início
start_time=$(date +%s)

# Executa cada crawler em paralelo e redireciona o log para um arquivo separado
npm run start-contract >> /app/crawlers/logs/contract.log 2>&1 &
npm run start-councilor >> /app/crawlers/logs/councilor.log 2>&1 &
npm run start-frequency >> /app/crawlers/logs/frequency.log 2>&1 &
npm run start-general-productivity >> /app/crawlers/logs/general-productivity.log 2>&1 &
npm run start-proposition >> /app/crawlers/logs/proposition.log 2>&1 &
npm run start-proposition-productivity >> /app/crawlers/logs/proposition-productivity.log 2>&1 &
npm run start-travel-expenses >> /app/crawlers/logs/travel-expenses.log 2>&1 &

# Aguarda todos os processos terminarem antes de continuar
wait

# Calcula o tempo total de execução
end_time=$(date +%s)
execution_time=$((end_time - start_time))
hours=$((execution_time / 3600))
minutes=$(( (execution_time % 3600) / 60))
seconds=$((execution_time % 60))

echo "Todos os crawlers foram executados com sucesso!"
echo "Tempo total de execução: ${hours}h ${minutes}m ${seconds}s"

# Envia mensagem ao broker indicando conclusão
node -e "
  const { sendMessage } = require('./broker');
  (async () => {
    await sendMessage('json-processor-queue', 'Crawlers completed');
  })();
"
