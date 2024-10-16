# puxa-a-ficha
Repositório contendo o projeto Puxa a Ficha - Tcc de Pedro Batista de Almeida Filho

Créditos à Câmara Municipal de Salvador pela disponibilidade dos dados de transparência - https://www.cms.ba.gov.br

nest g resource data/...

docker-compose -f docker-compose.prod.yml up --build
docker-compose down --remove-orphans
docker-compose logs -f
