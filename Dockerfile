FROM node:12-alpine

ARG branch
# STAGE #1 Create work directory & build node project
WORKDIR /aqi_client

COPY package.json .

RUN npm config set unsafe-perm true && npm install
COPY . .

# STAGE #2 Download dependencies and build for client project
RUN cd frontend && npm i && npm run build && mv dist /aqi_client/dist_m && rm -rf /frontend/* && mv /aqi_client/dist_m /aqi_client/frontend/dist

# Bundle app source
CMD ["npm", "start"]