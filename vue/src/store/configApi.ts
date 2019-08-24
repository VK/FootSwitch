import axios from 'axios';

const CONFIG_URL:string = "http://192.168.4.1/configApi";


export function getConfig() {
    return axios.get(`${CONFIG_URL}`);
}

export function postConfig(data: any) {
    return axios.post(`${CONFIG_URL}`, data);
}