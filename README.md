# puxa-a-ficha
Repositório contendo o projeto Puxa a Ficha - Tcc de Pedro Batista de Almeida Filho

Créditos à Câmara Municipal de Salvador pela disponibilidade dos dados de transparência - https://www.cms.ba.gov.br

nest g resource data/...

docker-compose -f docker-compose.prod.yml up -d --build
docker-compose -f docker-compose.prod.yml down --remove-orphans
npm run process-json -- --workers=4 >> /var/log/json-processor.log 2>&1
npm run process-json >> /var/log/json-processor.log 2>&1
docker-compose logs -f

gerar /dist (api):
npx tsc
