# VK FootSwitch



### Setup
```
# init vue page
cd vue
yarn install
yarn build
.\deployGitHub.cmd

# build vue page for ESP32 webserver
yarn buildNode

# compile and upload to ESP32
cd ..
pio run -t upload
pio run -t uploadfs
```