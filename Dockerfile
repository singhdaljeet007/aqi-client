# STAGE 1
FROM node:12-alpine as builder
ARG branch
# STAGE #1 Create work directory & build node project
WORKDIR /aqi_client

COPY package.json .

RUN npm config set unsafe-perm true && npm install && npm i -g typescript
COPY . .
# Download dependencies and build for client project
RUN cd frontend && npm i && npm run build && mv dist /aqi_client/dist_m && rm -rf /aqi_client/frontend/* && mv /aqi_client/dist_m /aqi_client/frontend/dist
# build node project
RUN tsc

# STAGE 2
FROM node:12-alpine as production

WORKDIR /aqi_client

COPY --from=builder /aqi_client/package.json /aqi_client/package.json
COPY --from=builder /aqi_client/frontend/ /aqi_client/frontend/
COPY --from=builder /aqi_client/app.js /aqi_client/app.js
COPY --from=builder /aqi_client/node_modules /aqi_client/node_modules

# Bundle app source
CMD ["npm", "start"]