import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import "../types";
import store from '@/store';
import { getConfig, postConfig } from './configApi';

@Module({ namespaced: true })
export default class FootSwitchConfig extends VuexModule {


    data: ConfigType = {
        name: "FootSwitch",
        configs: {},
        currentConfig: ""
    };

    possibleKeys = ["LEFT", "RIGHT", "UP", "DOWN", "TAB", "HOME", "PgUp", "PgDn", "SPACE", "BACKSP", "DEL"];


    shortToLongNameMap: { [key: string]: string } = {
        LA: "Left short",
        LB: "Left long",
        RA: "Right short",
        RB: "Right long",
        C: "Center"
    };





    @Mutation
    public setCurrentConfig(value: string): void {
        this.data.currentConfig = value;
    }


    @Mutation
    public resetConfig(): void {
        this.data.currentConfig = "";
        this.data.configs = {};
    }

    @Mutation
    public addNewConfig(name: string): void {
        let newConfig: ConfigType = JSON.parse(JSON.stringify(this.data));
        let newData: SingleConfig = JSON.parse(JSON.stringify(this.data.configs[this.data.currentConfig]));
        newConfig.configs[name] = newData;
        newConfig.currentConfig = name;
        this.data = newConfig;
    }

    @Mutation
    public deleteCurrentConfig(): void {
        let newConfig: ConfigType = JSON.parse(JSON.stringify(this.data));
        delete newConfig.configs[this.data.currentConfig];
        newConfig.currentConfig = Object.keys(newConfig.configs)[0];
        this.data = newConfig;
    }


    //#region read bluetooth config in chunks
    indexBluetoothString: Uint8Array = new Uint8Array(1);
    totalBluetoothString: string = "";

    @Mutation
    public loadConfigBluetooth(): void {
        this.totalBluetoothString = "";
        this.indexBluetoothString[0] = 0;
        store.dispatch("fsConfig/setConfigChunkIndex", 25)
            .catch((error: Error) => {
                alert("Connection Error. Please retry.");
                store.commit("appState/failProgress");
                store.commit("appState/disconnect");
            }
            );
    }


    @Action
    public endBluetoothString(): void {
        let parseConfig: ConfigType = JSON.parse(this.totalBluetoothString);
        store.commit("fsConfig/setBluetoothConfig", parseConfig);
        store.commit("appState/finishProgress");
    }

    @Mutation
    public appendBluetoothString(input: string): void {
        this.totalBluetoothString += input;
        this.indexBluetoothString[0]++;
    }

    @Mutation
    public setBluetoothConfig(input: ConfigType): void {
        this.data = input;
    }

    @Action
    public setConfigChunkIndex(progressValue: number): Promise<any> {
        return store.dispatch("appState/getDevice", this.data.name)
            .then((server: BluetoothRemoteGATTServer) => {
                return server.getPrimaryService("automation_io");
            }).then((serviceA: BluetoothRemoteGATTService) => {
                return serviceA.getCharacteristic("user_index");
            }).then((characteristic: BluetoothRemoteGATTCharacteristic) => {
                return characteristic.writeValue(this.indexBluetoothString);
            }).then(() => {
                return new Promise((r: any) => setTimeout(r, 100))
                    .then(() => store.dispatch("fsConfig/getConfigChunk", progressValue + 5));
            });
    }

    @Action
    public getConfigChunk(progressValue: number): Promise<any> {

        return store.dispatch("appState/getDevice", this.data.name)
            .then((server: BluetoothRemoteGATTServer) => {
                return server.getPrimaryService("automation_io");
            })
            .then((service: BluetoothRemoteGATTService) => {
                return service.getCharacteristic("string");
            })
            .then((characteristic: BluetoothRemoteGATTCharacteristic) => {
                return characteristic.readValue();
            }).then((data: DataView) => {
                store.commit("appState/setProgress", progressValue);
                let decoder: TextDecoder = new TextDecoder("utf-8");
                let inputString: string = decoder.decode(data);
                if (inputString === "end") {
                    return store.dispatch("fsConfig/endBluetoothString");
                } else {
                    store.commit("fsConfig/appendBluetoothString", inputString);
                    return new Promise((r: any) => setTimeout(r, 20))
                        .then(() => store.dispatch("fsConfig/setConfigChunkIndex", progressValue + 5));
                }
            });




    }
    //#endregion






    //#region send config in chunks to the device


    @Action
    sendMessagePart(
        input: any
    ): Promise<{}> {

        let inputPromise: Promise<any> = input.inputPromise;
        let message: string = input.message;
        let progressValue: number = input.progressValue;

        let encoder: TextEncoder = new TextEncoder();
        let buffer: Uint8Array = encoder.encode(message);

        return inputPromise.then(() => {
            return store.dispatch("appState/getDevice", this.data.name)
                .then((server: BluetoothRemoteGATTServer) => {
                    return server.getPrimaryService("automation_io");
                })
                .then((service: BluetoothRemoteGATTService) => {
                    return service.getCharacteristic("string");
                })
                .then((characteristic: BluetoothRemoteGATTCharacteristic) => {
                    return characteristic.writeValue(buffer);
                })
                .then(() => {
                    store.commit("appState/setProgress", progressValue);
                    return new Promise((r: any) => setTimeout(r, 200));
                });
        });
    }

    @Mutation
    public saveConfigBluetooth(): void {


        // create an array of data to send
        let newConfigString: string = JSON.stringify(this.data);
        let size: number = 200;

        const numChunks: number = Math.ceil(newConfigString.length / size);
        const chunks: string[] = new Array(numChunks + 2);

        chunks[0] = "start";
        for (let i: number = 0, o: number = 0; i < numChunks; ++i, o += size) {
            chunks[i + 1] = newConfigString.substr(o, size);
        }
        chunks[numChunks + 1] = "save";

        let lastPromise: Promise<any> = new Promise((r: any) => setTimeout(r, 200));

        chunks.forEach((element, index) => {
            lastPromise = store.dispatch("fsConfig/sendMessagePart",
                {
                    inputPromise: lastPromise,
                    message: element,
                    progressValue: 10 + (80 / chunks.length) * index
                }
            );
        });

        lastPromise
            .then(() => {
                store.commit("appState/disconnect");
                store.commit("appState/finishProgress");
                store.commit("appState/enableInput");
            })
            .catch((error: any) => {
                alert("Connection Error. Please retry.");
                store.commit("appState/disconnect");
                store.commit("appState/failProgress");
                store.commit("appState/enableInput");
            });

    }



    //#endregion


    //#region load and send config via http
    @Mutation
    public loadConfigWeb(): void {
        getConfig().then(res => {
            let newData = res.data as ConfigType;
            this.data = newData;
            store.commit("appState/finishProgress");
        }).catch((error: any) => {
            alert("Connection Error. Please reload page.");
            store.commit("appState/disconnect");
            store.commit("appState/failProgress");
            store.commit("appState/enableInput");
        });
    }


    @Mutation
    public saveConfigWeb(): void {

        postConfig(JSON.stringify(this.data)).then(res => {
            store.commit("appState/disconnect");
            store.commit("appState/finishProgress");
            store.commit("appState/enableInput");
        }).catch((error: any) => {
            alert("Connection Error. Please reload page.");
            store.commit("appState/disconnect");
            store.commit("appState/failProgress");
            store.commit("appState/enableInput");
        });
    }
    //#endregion

    @Mutation
    public load(): void {

        if (store.state.appState.bluetoothVersion) {

            store.commit("appState/setProgress", 10);
            store.commit("fsConfig/loadConfigBluetooth");
            store.commit("appState/enableInput");
        } else {
            store.commit("appState/setProgress", 10);
            store.commit("fsConfig/loadConfigWeb");
        }

    }



    @Mutation
    public save(): void {

        if (store.state.appState.bluetoothVersion) {
            store.commit("appState/disableInput");
            store.commit("appState/setProgress", 10);
            store.commit("fsConfig/saveConfigBluetooth");
        } else {
            store.commit("appState/disableInput");
            store.commit("appState/setProgress", 10);
            store.commit("fsConfig/saveConfigWeb");
        }
    }

}