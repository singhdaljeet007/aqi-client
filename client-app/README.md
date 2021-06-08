# Initial Setup
npm i -g @angular/cli
ng new air-quality-monitoring
npm i socket.io-client @types/socket.io-client --save

# business logic
ng g service data
ng g directive hightlight-aqi

# styling
ng add @angular/material
