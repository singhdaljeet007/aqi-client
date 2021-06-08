FROM node:12.13-alpine

ARG branch
# STAGE #1 Create work directory & build node project
WORKDIR /aqi_client

COPY package.json .

RUN npm install
COPY . .

# STAGE #2 Download dependencies and build for client project
RUN cd frontend && npm i && npm run build && mv dist /aqi_client/dist_m && rm -rf /frontend/* && mv /aqi_client/dist_m /aqi_client/frontend/dist

# Bundle app source
EXPOSE 80
CMD ["npm", "start"]