
#include "web.h"
#include "bleKeyboard.h"

#include "FS.h"
#include "SPIFFS.h"
#include <ArduinoJson.h>

ClickEvent *centerButton;
ClickEvent *leftButton;
ClickEvent *rightButton;

DynamicJsonDocument config(10000);
String currentCfgName;

bool runWebConfig = false;

void setup()
{

  Serial.begin(115200);

  Serial.println("Starting BLE work!");
  SPIFFS.begin();

  if (SPIFFS.exists("/webConfig"))
  {
    runWebConfig = true;
    SPIFFS.remove("/webConfig");
  }

  File file = SPIFFS.open("/config.json");

  // Deserialize the JSON document
  DeserializationError error = deserializeJson(config, file);
  if (error)
    Serial.println(F("Failed to read file, using default configuration"));

  file.close();
  long passkey = config.operator[]("pin");
  String serverName = config.operator[]("name");
  String configString = "";
  serializeJson(config, configString);

  //start the bluetooth keyboard interface
  if (!runWebConfig)
    bleKeyboard.setup(passkey, serverName, configString);

  //start the webserver
  if (runWebConfig)
    web.setup(serverName, configString);

  //add keyboard events
  if (!runWebConfig)
  {
    String curCfg = config["currentConfig"];
    currentCfgName = curCfg;

    centerButton = new ClickEvent(32, [](uint8_t count, unsigned long duration) {
      if (duration < 500)
      {
        bleKeyboard.sendKey(config["configs"][currentCfgName.c_str()]["C"]);
      }
      else if (duration > 1500)
      {
        File file = SPIFFS.open("/webConfig", FILE_WRITE);
        file.print("NextTime");
        file.close();

        bleKeyboard.needReboot = true;
        bleKeyboard.rebootTimestamp = micros();
      }
      bleKeyboard.lastEventTime = micros();
    });

    leftButton = new ClickEvent(25, [](uint8_t count, unsigned long duration) {
      if (duration < 500)
      {
        bleKeyboard.sendKey(config["configs"][currentCfgName.c_str()]["LA"]);
      }
      else
      {
        bleKeyboard.sendKey(config["configs"][currentCfgName.c_str()]["LB"]);
      }
      bleKeyboard.lastEventTime = micros();
    });

    rightButton = new ClickEvent(16, [](uint8_t count, unsigned long duration) {
      if (duration < 500)
      {
        bleKeyboard.sendKey(config["configs"][currentCfgName.c_str()]["RA"]);
      }
      else
      {
        bleKeyboard.sendKey(config["configs"][currentCfgName.c_str()]["RB"]);
      }
      bleKeyboard.lastEventTime = micros();
    });
  }
}

void loop()
{
  if (runWebConfig)
  {
    web.loop();
  }
  else
  {
    bleKeyboard.loop();

    centerButton->loop();
    leftButton->loop();
    rightButton->loop();
  }
  delay(1);
}
