/*

  Click Event
  Copyright (C) 2019 by Viktor

*/

#ifndef _CLICK_EVENT_h
#define _CLICK_EVENT_h

#include <functional>

class ClickEvent
{

public:
  typedef std::function<void(uint8_t count, unsigned long total_duration)> TClickEventCallback;

public:
  ClickEvent(uint8_t pin, TClickEventCallback callback, int max_duration = 2000000, int min_duration = 10000);
  void loop();
  void rise();
  void fall();

public:
  TClickEventCallback _callback = NULL;

  uint8_t _pin;

  uint8_t _last_state;
  unsigned long _last_time;
  unsigned long _start_time;
  unsigned long _last_event;

  unsigned long _duration_on;

  int _max_duration;
  int _min_duration;

  uint8_t _count;
};

#endif
