import axios from "axios";
import {
    GetSettingsParams, GetSettingsResponse, GetStateInstanceParams, GetStateInstanceResponse,
    SendFileByUrlParams, SendFileByUrlResponse, SendMessageParams, SendMessageResponse
} from "./green-api-messages";

export const instance = axios.create({
    baseURL: '/proxy',
})

const Endpoint = Object.freeze({
    getSettings: "getSettings",
    getStateInstance: "getStateInstance",
    sendMessage: "sendMessage",
    sendFileByUrl: "sendFileByUrl",
})

const GreenApiService = {

    getUrl(endpoint: string, idInstance: string, apiTokenInstance: string): string {
        return `/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`
    },

    async GET(endpoint: string, idInstance: string, apiTokenInstance: string) {
        return (await instance.get(this.getUrl(endpoint, idInstance, apiTokenInstance))).data
    },

    async POST(endpoint: string, idInstance: string, apiTokenInstance: string, body: object) {
        return (await instance.post(
            this.getUrl(endpoint, idInstance, apiTokenInstance),
            {...body, idInstance: undefined, apiTokenInstance: undefined}
        )).data
    },

    async getSettings(params: GetSettingsParams): Promise<GetSettingsResponse> {
        return this.GET(Endpoint.getSettings, params.idInstance, params.apiTokenInstance)
    },

    async getStateInstance(params: GetStateInstanceParams): Promise<GetStateInstanceResponse> {
        return this.GET(Endpoint.getStateInstance, params.idInstance, params.apiTokenInstance)
    },

    async sendMessage(params: SendMessageParams): Promise<SendMessageResponse> {
        return this.POST(Endpoint.sendMessage, params.idInstance, params.apiTokenInstance, params.body)
    },

    async sendFileByUrl(params: SendFileByUrlParams): Promise<SendFileByUrlResponse> {
        return this.POST(Endpoint.sendFileByUrl, params.idInstance, params.apiTokenInstance, params.body)
    },
}

export default GreenApiService
