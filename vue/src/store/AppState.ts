import { Module, VuexModule, Mutation, Action, } from "vuex-module-decorators";
import store from "../store";
import { getConfig } from './configApi';


@Module({ namespaced: true })
export default class AppState extends VuexModule {

    public publicPath: string = process.env.BASE_URL;
    public connected: boolean = false;
    connectedDevice?: BluetoothDevice = undefined;
    public disabled: boolean = false;


    @Mutation
    public disconnect(): void {
        if (this.connected) {
            try {
                this.connectedDevice!.gatt!.disconnect();
            } catch {
                this.connectedDevice = undefined;
            }
        }
        this.connected = false;
        this.connectedDevice = undefined;
        store.commit("fsConfig/resetConfig");
        store.commit("appState/finishProgress");
    }

    @Mutation
    public connect(): void {
        this.connected = true;
    }

    @Mutation
    public disableInput(): void {
        this.disabled = true;
    }

    @Mutation
    public enableInput(): void {
        this.disabled = false;
    }


    @Mutation
    public registerConnectedDevice(input: BluetoothDevice): void {
        this.connected = true;
        this.connectedDevice = input;
    }

    @Action
    public getDevice(name: string): Promise<BluetoothRemoteGATTServer> {
        if (!this.connected) {
            return navigator.bluetooth
                .requestDevice({
                    filters: [
                        { name: name },
                        { services: ["automation_io"] }
                    ]
                })
                .then((device: BluetoothDevice) => {
                    this.progressbar.set(10);
                    store.commit("appState/registerConnectedDevice", device);
                    return device.gatt!.connect();
                });
        } else {
            return this.connectedDevice!.gatt!.connect();
        }
    }


    //#region handle bluetooth or web interface (the register Progressbar is used to set the value!)
    public bluetoothVersion: boolean = true;
    //#endregion



    //#region progressbar handling
    public progressbar: any = "";

    @Mutation
    public registerProgressbar(input: any): void {
        this.progressbar = input;

        //disable bluetooth version if we find a config service in the network
        this.bluetoothVersion = true;
        getConfig().then(res => {
            this.bluetoothVersion = false;
            store.commit("fsConfig/load");
        }).catch(res => {
            console.log("Use bluetooth to connect");
        });
    }

    @Mutation
    public setProgress(input: number): void {
        this.progressbar.set(input);
    }

    @Mutation
    public finishProgress(): void {
        this.progressbar.finish();
    }

    @Mutation
    public failProgress(): void {
        this.progressbar.fail();
    }
    //#endregion



}