#include <Arduino.h>
#include "web.h"
#include "bleKeyboard.h"
#include "SPIFFS.h"
#include "vue/content.h"

Web web;

Web::Web()
{
}

void Web::setup(String _serverName, String _configString)
{
  Serial.println("Web::setup");
  configString = _configString;

  const byte DNS_PORT = 53;       // Capture DNS requests on port 53
  IPAddress apIP(192, 168, 4, 1); // Private network for server

  dnsServer = DNSServer(); // Create the DNS object

  // configure access point
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
  WiFi.softAP(_serverName.c_str()); // WiFi name

  // provided IP to all DNS request
  dnsServer.start(DNS_PORT, "*", apIP);

  //Create a redirect page if some page is loaded
  AsyncWebServer *webServer = new AsyncWebServer(80); // HTTP server
  webServer->onNotFound([](AsyncWebServerRequest *request) {
    Serial.println(request->url());
    request->redirect("/index.html");
  });
  reg_callbacks(*webServer);

  //send config json string
  webServer->on("/configApi", HTTP_GET, [](AsyncWebServerRequest *request) {
    Serial.println("GET /configApi");
    request->send(200, "application/json", web.configString);
  });

  //save config json string and reboot
  webServer->on("/configApi", HTTP_POST, [](AsyncWebServerRequest *request) {
    Serial.println("POST /configApi");
    if (request->hasParam("body", true))
    {
      AsyncWebParameter *p = request->getParam("body", true);
      String json = p->value();
      File file = SPIFFS.open("/config.json", FILE_WRITE);
      file.print(json);
      file.close();
      web.needReboot = true;
      web.rebootTimestamp = micros();
    }
    request->send(200, "application/json", "{}");
  });

  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");

  webServer->begin();
}

void Web::loop()
{
  dnsServer.processNextRequest();

  long now = micros();

  if (needReboot && rebootTimestamp + 200000 < now)
  {
    ESP.restart();
  }
}

void Web::stop()
{
  dnsServer.stop();
}
