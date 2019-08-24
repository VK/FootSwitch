#include <Arduino.h>

#include "clickEvent.h"

void isr_change(void *arg)
{
    ClickEvent *event = (ClickEvent *)(arg);

    uint8_t state = digitalRead(event->_pin);
    unsigned long time = micros();


    if (state != event->_last_state)
    {

        ///Last event in the past, restart
        if (state == 0 && event->_start_time < time - event->_max_duration)
        {
            event->_start_time = time;
            event->_last_time = time;
            event->_count = 0;
            event->_duration_on = 0;
        }

        //increase the click count and duration
        if (state == 1 && event->_last_time < time - event->_min_duration && event->_start_time > time - event->_max_duration)
        {
            event->_count++;
            event->_duration_on += time - event->_last_time;
        }

        event->_last_time = time;
        event->_last_state = state;
    }
}

ClickEvent::ClickEvent(uint8_t pin, TClickEventCallback callback, int max_duration, int min_duration)
{
    _callback = callback;
    _pin = pin;
    _max_duration = max_duration;
    _min_duration = min_duration;
    _start_time = 0;
    _last_time = 0;
    _last_state = 1;
    _last_event = 0;
    _count = 0;

    pinMode(pin, INPUT_PULLUP);
    attachInterruptArg(pin, isr_change, this, CHANGE);

    Serial.print("Register ClickEvent on pin ");
    Serial.println(pin);
}

void ClickEvent::loop()
{
    unsigned long time = micros();



    if (_last_state == 1 && _count > 0 && _last_time < time - _min_duration)
    {
        _callback(_count, _duration_on / 1000);
        _last_event = time;
        _count = 0;
        _duration_on = 0;
        _start_time = 0;
        _last_time = 0;
    }

  /*
    Serial.print(_last_state);
    Serial.print(" ");
    Serial.print(_start_time);
    Serial.print(" ");
    Serial.print(_last_time);
    Serial.println(" ");
*/
    if (_last_state == 0 && _start_time > 0 && _last_time < time - _max_duration)
    {
        _duration_on += time - _last_time;
        _callback(_count, _duration_on / 1000);
        _last_event = time;
        _count = 0;
        _duration_on = 0;
        _start_time = 0;
        _last_time = 0;
        _last_state = 0;
    }

    if (_start_time < time - _max_duration)
    {
        _count = 0;
    }
}
