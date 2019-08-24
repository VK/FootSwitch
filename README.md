# VK FootSwitch

An ESP32 bluetooth and wifi footswitch I not only use to flip pages during music making but much more :).

Foot switch                                                  |  Web App in action
:-----------------------------------------------------------:|:-----------------------------------------------------------:
![](https://vk.github.io/FootSwitch/docu/FootSwitchApp.gif)  |  ![](https://vk.github.io/FootSwitch/docu/FootSwitchApp.gif)


## Build Procedure
FootSwitch consists of a VueJs app that needs to be built before the the ESP32 build.
### Build Vue page
run in vue folder
```
yarn install
yarn build
.\deployGitHub.cmd
```
### Build compressed vue app for ESP32
```
yarn buildNode
```

### Build ESP32 code and upload
```
pio run -t upload
pio run -t uploadfs
```