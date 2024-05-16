FROM --platform=linux/amd64 node:20

WORKDIR /src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["npm","start"]