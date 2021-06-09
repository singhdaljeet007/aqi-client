# Initial Setup for node backend
npm init -y

touch app.ts


# Frontend angular app setup
npm i -g @angular/cli

ng new air-quality-monitoring

npm i  highcharts highcharts-angular --save

# business logic
Created components aqi-dashboard & aqi-chart for showing city wise aqi data and selected city chart respectively. User can view the realtime AQI graph for a city by clicking on the city name.

Data Service was added for connecting to websocket and updating the data realtime from websocket connection.

HighlightAqi directive was added to aqi column in the table to set the color code corresponding to the AQI value & LastUpdated pipe is used to show the Updated time corresponsing to the data.

ng g service data

ng g directive hightlight-aqi

ng g pipe last-updated

# styling
Material table is used to display the city wise AQI data retrieved from web socket, having a pagination and sorting functionality using below command.

    ng add @angular/material
# Docker & heroku setup
A multistage Dockerfile was added with the build steps to build angular project and then compile nodejs project along with a startup command.

Application was pushed to heroku via cli using below comands:

    heroku login

    heroku create --app aqiclient

    heroku container:push web --app aqiclient

    heroku container:release web --app aqiclient

    heroku logs --tail --app aqiclient

