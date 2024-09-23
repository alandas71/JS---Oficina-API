ARG NODE_VERSION=20.2.0
FROM node:${NODE_VERSION}-bullseye-slim

LABEL fly_launch_runtime="Node.js"

WORKDIR /app

ENV NODE_ENV="production"

COPY --link package-lock.json package.json ./
RUN npm install --production

COPY --link . .

EXPOSE 3000

CMD [ "node", "server.js" ]
