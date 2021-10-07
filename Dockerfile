FROM node

WORKDIR /app

ARG DEFAULT_PORT=3000

COPY package.json /app/

RUN npm install

COPY . /app/

ENV PORT=${DEFAULT_PORT}

EXPOSE ${PORT}

CMD ["npm", "start"]
