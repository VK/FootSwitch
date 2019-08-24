
#ifndef _KEYMAP_h
#define _KEYMAP_h

#include <map>

//https://github.com/nkolban/esp32-snippets/blob/master/cpp_utils/tests/BLETests/SampleKeyboardTypes.h

std::map<std::string, unsigned char> m = {
    {"BACKSP", 0x2a},
    {"TAB", 0x2b},
    {"SPACE", 0x2c},
    {"DEL", 0x4C},


    

    {"HOME", 0x4a},
    {"PgUp", 0x4b},
    {"PgDn", 0x4e},

    {"RIGHT", 0x4f},
    {"LEFT", 0x50},
    {"DOWN", 0x51},
    {"UP", 0x52},

};

#endif
