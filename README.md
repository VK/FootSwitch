# VK FootSwitch

![Vue + PlatformIO CI](https://github.com/VK/FootSwitch/workflows/Vue%20+%20PlatformIO%20CI/badge.svg)

An ESP32 bluetooth and wifi footswitch I use to flip pages during music making.

Features:
* Emulates a Bluetooth Low Energy Keyboard
* Custrom key commands for short and long click
* Settings easily changeable via [Web App](https://vk.github.io/FootSwitch/)
  * using BLE Automation IO interface
  * or via WLAN captive portal + ReST service


Foot switch                                                      |  Web App in action
:---------------------------------------------------------------:|:-----------------------------------------------------------:
![](https://vk.github.io/FootSwitch/docu/FootSwitchBoxMini.png)  |  ![](https://vk.github.io/FootSwitch/docu/FootSwitchApp.gif)


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