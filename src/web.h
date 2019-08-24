#ifndef _WEB_h
#define _WEB_h

#include <Wifi.h>
#include <DNSServer.h>
#include "ESPAsyncWebServer.h"
#include "AsyncTCP.h"

class Web
{
public:
  Web();
  void setup(String _serverName, String _configString);
  void loop();
  void stop();

  bool needReboot;
  unsigned long rebootTimestamp;

public:
  DNSServer dnsServer; // Create the DNS object
  
  String configString; // the config string to send 
};

extern Web web;

#endif
