#!/bin/bash

# Verifica se a API está acessível
until $(curl --output /dev/null --silent --head --fail http://api:3000); do
    echo "Aguardando API ficar disponível..."
    sleep 5
done

# Executa cada crawler e redireciona o log para um arquivo separado
npm run start-contract >> /var/log/contract.log 2>&1
npm run start-councilor >> /var/log/councilor.log 2>&1
npm run start-frequency >> /var/log/frequency.log 2>&1
npm run start-general-productivity >> /var/log/general-productivity.log 2>&1
npm run start-proposition >> /var/log/proposition.log 2>&1
npm run start-proposition-productivity >> /var/log/proposition-productivity.log 2>&1
npm run start-travel-expenses >> /var/log/travel-expenses.log 2>&1
