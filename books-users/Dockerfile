FROM node:22-alpine

WORKDIR /app

COPY . .

ENTRYPOINT [ "./docker-entrypoint.sh" ]

CMD ["npm", "run", "start:prod"]
