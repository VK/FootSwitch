#include "bleKeyboard.h"
#include "keymap.h"
#include "arduino.h"
#include "SPIFFS.h"

BleKeyboard bleKeyboard;

#define SERVICE_UUID "fdbfb7fe-85bc-4448-96cc-2b3fd7d2e994"
#define CHARACTERISTIC_UUID "569cf7e3-b08f-4578-9cbf-1f34470ed0d4"

String writeBuffer = "";

class MyConfigStringCallbacks : public BLECharacteristicCallbacks
{
  void onRead(BLECharacteristic *pCharacteristic)
  {
  }

  //every write event is captured and used to stich the full jsaon
  void onWrite(BLECharacteristic *pCharacteristic)
  {
    String data = String(pCharacteristic->getValue().c_str());

    if (data == "start")
    {
      writeBuffer = "";
    }
    else if (data == "save")
    {
      File file = SPIFFS.open("/config.json", FILE_WRITE);
      file.print(writeBuffer);
      file.close();
      bleKeyboard.needReboot = true;
      bleKeyboard.rebootTimestamp = micros();
    }
    else
    {
      writeBuffer += data;
    }
  }
};


class MyConfigPosCallbacks : public BLECharacteristicCallbacks
{
  void onRead(BLECharacteristic *pCharacteristic)
  {
    Serial.println("read");
  }

  //write events are used to set a new section of the conif json as characterisitc
  void onWrite(BLECharacteristic *pCharacteristic)
  {
    uint8_t* data = pCharacteristic->getData();
    Serial.print("new index");
    Serial.println(data[0]);
    bleKeyboard.updateReadBuffer(data[0]);
  }
};



class MyCallbacks : public BLEServerCallbacks
{
  void onConnect(BLEServer *pServer)
  {
    bleKeyboard.connected = true;
    BLE2902 *desc = (BLE2902 *)bleKeyboard.input->getDescriptorByUUID(BLEUUID((uint16_t)0x2902));
    desc->setNotifications(true);
    bleKeyboard.updateReadBuffer(0);
#ifdef DEBUG
    Serial.println("Connected");
#endif
  }

  void onDisconnect(BLEServer *pServer)
  {
    bleKeyboard.connected = false;
    BLE2902 *desc = (BLE2902 *)bleKeyboard.input->getDescriptorByUUID(BLEUUID((uint16_t)0x2902));
    desc->setNotifications(false);

#ifdef DEBUG
    Serial.println("Disconnected");
#endif
  }
};

void taskServer(void *)
{
  BLEDevice::init(bleKeyboard.serverName.c_str());
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyCallbacks());

  BLEService *pService = pServer->createService(BLEUUID((uint16_t)0x1815));
  bleKeyboard.configCharacteristic = pService->createCharacteristic(
      BLEUUID((uint16_t)0x2A3D),
      BLECharacteristic::PROPERTY_READ |
          BLECharacteristic::PROPERTY_WRITE);
  bleKeyboard.configCharacteristic->setCallbacks(new MyConfigStringCallbacks());
  bleKeyboard.configCharacteristic->setWriteProperty(true);

  bleKeyboard.posCharacteristic = pService->createCharacteristic(
      BLEUUID((uint16_t)0x2A9A),
      BLECharacteristic::PROPERTY_READ |
          BLECharacteristic::PROPERTY_WRITE);
  bleKeyboard.posCharacteristic->setCallbacks(new MyConfigPosCallbacks());
  bleKeyboard.posCharacteristic->setWriteProperty(true);


  bleKeyboard.updateReadBuffer(0);
  pService->start();

  bleKeyboard.hid = new BLEHIDDevice(pServer);
  bleKeyboard.input = bleKeyboard.hid->inputReport(1);   // <-- input REPORTID from report map
  bleKeyboard.output = bleKeyboard.hid->outputReport(1); // <-- output REPORTID from report map

  std::string manufac = "Viktor Krueckl";
  bleKeyboard.hid->manufacturer()->setValue(manufac);

  bleKeyboard.hid->pnp(0x02, 0xe502, 0xa111, 0x0210);
  bleKeyboard.hid->hidInfo(0x00, 0x02);

  const uint8_t report[] = {
      USAGE_PAGE(1), 0x01, // Generic Desktop Ctrls
      USAGE(1), 0x06,      // Keyboard
      COLLECTION(1), 0x01, // Application
      REPORT_ID(1), 0x01,  //   Report ID (1)
      USAGE_PAGE(1), 0x07, //   Kbrd/Keypad
      USAGE_MINIMUM(1), 0xE0,
      USAGE_MAXIMUM(1), 0xE7,
      LOGICAL_MINIMUM(1), 0x00,
      LOGICAL_MAXIMUM(1), 0x01,
      REPORT_SIZE(1), 0x01, //   1 byte (Modifier)
      REPORT_COUNT(1), 0x08,
      HIDINPUT(1), 0x02,     //   Data,Var,Abs,No Wrap,Linear,Preferred State,No Null Position
      REPORT_COUNT(1), 0x01, //   1 byte (Reserved)
      REPORT_SIZE(1), 0x08,
      HIDINPUT(1), 0x01,     //   Const,Array,Abs,No Wrap,Linear,Preferred State,No Null Position
      REPORT_COUNT(1), 0x06, //   6 bytes (Keys)
      REPORT_SIZE(1), 0x08,
      LOGICAL_MINIMUM(1), 0x00,
      LOGICAL_MAXIMUM(1), 0x65, //   101 keys
      USAGE_MINIMUM(1), 0x00,
      USAGE_MAXIMUM(1), 0x65,
      HIDINPUT(1), 0x00,     //   Data,Array,Abs,No Wrap,Linear,Preferred State,No Null Position
      REPORT_COUNT(1), 0x05, //   5 bits (Num lock, Caps lock, Scroll lock, Compose, Kana)
      REPORT_SIZE(1), 0x01,
      USAGE_PAGE(1), 0x08,    //   LEDs
      USAGE_MINIMUM(1), 0x01, //   Num Lock
      USAGE_MAXIMUM(1), 0x05, //   Kana
      HIDOUTPUT(1), 0x02,     //   Data,Var,Abs,No Wrap,Linear,Preferred State,No Null Position,Non-volatile
      REPORT_COUNT(1), 0x01,  //   3 bits (Padding)
      REPORT_SIZE(1), 0x03,
      HIDOUTPUT(1), 0x01, //   Const,Array,Abs,No Wrap,Linear,Preferred State,No Null Position,Non-volatile
      END_COLLECTION(0)};

  bleKeyboard.hid->reportMap((uint8_t *)report, sizeof(report));
  bleKeyboard.hid->startServices();

  
  BLEAdvertising *pAdvertising = pServer->getAdvertising();
  pAdvertising->setAppearance(HID_KEYBOARD);
  pAdvertising->addServiceUUID(bleKeyboard.hid->hidService()->getUUID());
  pAdvertising->start();

  bleKeyboard.hid->setBatteryLevel(100);
  

  BLESecurity *pSecurity = new BLESecurity();
  esp_ble_gap_set_security_param(ESP_BLE_SM_SET_STATIC_PASSKEY, &(bleKeyboard.passkey), sizeof(uint32_t));
  pSecurity->setCapability(ESP_IO_CAP_OUT);


  ESP_LOGD(LOG_TAG, "Advertising started!");
  //delay(portMAX_DELAY);
};

BleKeyboard::BleKeyboard()
{
  connected = false;
  lastEventTime = 0;
  configStrings = std::vector<String>();
}



void BleKeyboard::updateReadBuffer(int newIndex)
{
  readBufferPos = newIndex;
  const char *outputVal = configStrings[readBufferPos].c_str();

  configCharacteristic->setValue((uint8_t *)outputVal, strlen(outputVal));
}

void BleKeyboard::sendKey(ARDUINOJSON_NAMESPACE::VariantConstRef keyData)
{

  String key = keyData["KEY"];
  uint8_t shift = keyData["SHIFT"];
  uint8_t ctr = keyData["CTR"];
  uint8_t alt = keyData["ALT"];


  uint8_t mod = ctr + 2 * shift + 4 * alt;

  uint8_t a[] = {mod, 0x0, m[key.c_str()], 0x0, 0x0, 0x0, 0x0, 0x0};
  bleKeyboard.input->setValue(a, sizeof(a));
  bleKeyboard.input->notify();

  uint8_t v[] = {0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0};
  bleKeyboard.input->setValue(v, sizeof(v));
  bleKeyboard.input->notify();

  lastEventTime = micros();
}

void BleKeyboard::setup(uint32_t _passkey, String _serverName, String _configString)
{
  passkey = _passkey;
  serverName = _serverName;

  int chunckSize = 512;
  int nrChunks = floor(_configString.length() / chunckSize) + 1;

  for (int i = 0; i < nrChunks; i++)
  {
    configStrings.push_back(_configString.substring(i * chunckSize, (i + 1) * chunckSize));
  }
  configStrings.push_back("end");


  configString = _configString;

  taskServer(NULL);
  //xTaskCreate(taskServer, "server", 30000, NULL, 5, NULL);
}

void BleKeyboard::loop()
{
  now = micros();
  if (now < 100000)
  {
    lastEventTime = 0;
    if (needReboot)
    {
      ESP.restart();
    }
  }

  //deep sleep after 5 minutes inactive
  if (lastEventTime + 300000000 < now)
  {
    send_to_sleep();
  }


  if (needReboot && rebootTimestamp + 200000 < now && !connected)
  {
    ESP.restart();
  }

  if (needReboot && rebootTimestamp + 2000000 < now)
  {
    ESP.restart();
  }
}

void BleKeyboard::send_to_sleep()
{
#ifdef DEBUG
  Serial.println("Going to sleep now");
#endif

  //Configure GPIO33 as ext0 wake up source for HIGH logic level
  esp_sleep_enable_ext0_wakeup(GPIO_NUM_32, 0);

  //Go to sleep now
  esp_deep_sleep_start();
}