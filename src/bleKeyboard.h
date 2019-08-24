
#ifndef _BLE_KEYBOARD_h
#define _BLE_KEYBOARD_h


#include <BLEDevice.h>
#include "BLEHIDDevice.h"
#include "clickEvent.h"
#include <list>
#include <ArduinoJson.h>

#define DEBUG

class BleKeyboard
{

public:
  BleKeyboard();

public:
  BLEHIDDevice *hid;
  BLECharacteristic *input;
  BLECharacteristic *output;
  bool connected;
  unsigned long now = 0;
  unsigned long lastEventTime = 0;
  uint32_t passkey;
  String serverName;
  String configString;
  std::vector<String> configStrings;

  int readBufferPos;
  BLECharacteristic *configCharacteristic;
  BLECharacteristic *posCharacteristic;

  bool needReboot;
  unsigned long rebootTimestamp;

public:
  void setup(uint32_t _passkey, String _serverName, String _configString);
  void loop();
  void send_to_sleep();
  void sendKey(ARDUINOJSON_NAMESPACE::VariantConstRef keyData);

  void updateReadBuffer(int newIndex);

};

extern BleKeyboard bleKeyboard;



#endif