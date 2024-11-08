#!/bin/bash

LOCKFILE="/tmp/crawlers.lock"

# Verifica se o arquivo de bloqueio existe
if [ -f "$LOCKFILE" ]; then
    echo "Os crawlers já estão sendo executados."
    exit 1
fi

# Cria um arquivo de bloqueio
touch "$LOCKFILE"

# Diretório de logs
mkdir -p /app/crawlers/logs

echo "Iniciando o script de crawlers..."

# URL do endpoint para verificar execução
EXECUTION_CHECK_URL="http://api:3000/execution-status/"
echo "Verificando execução no endpoint: $EXECUTION_CHECK_URL"

# Verifica se os crawlers já foram executados hoje
response=$(curl -s $EXECUTION_CHECK_URL)

# Verifica se a resposta é 'false'
if [[ "$response" == "false" ]]; then
    echo "Os crawlers já foram executados hoje. Encerrando."
    rm -f "$LOCKFILE"
    exit 0
elif [ "$response" != "true" ]; then
    echo "Erro: O endpoint retornou um valor inesperado: $response."
    rm -f "$LOCKFILE"
    exit 1
fi

echo "Verificação completa, os crawlers podem ser executados."

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
  (async () => {
    const { sendMessage } = require('./broker');
    try {
      await sendMessage('json-processor-queue', 'Crawlers completed');
      console.log('Mensagem de conclusão enviada ao broker com sucesso.');
    } catch (error) {
      console.error('Erro ao enviar mensagem ao broker:', error);
    }
  })();
"

# Registra a execução no banco de dados
CREATE_EXECUTION_STATUS_JSON='{"crawlerName": "contractCrawler", "lastExecution": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'", "status": "COMPLETED"}'

curl -X POST -H "Content-Type: application/json" -d "$CREATE_EXECUTION_STATUS_JSON" $EXECUTION_CHECK_URL

# Remove o arquivo de bloqueio ao final da execução
rm -f "$LOCKFILE"