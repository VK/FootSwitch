type KeyConfig = {
    KEY: string;
    CTR: boolean;
    ALT: boolean;
    SHIFT: boolean;
};

type SingleConfig = {
    [key: string]: KeyConfig;
};

type AllConfigs = {
    [key: string]: SingleConfig;
};

type ConfigType = {
    name: string,
    configs: AllConfigs,
    currentConfig: string
};