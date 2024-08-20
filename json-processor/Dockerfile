FROM node:18

WORKDIR /app/json-processor

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "process-json"]
