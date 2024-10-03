import axios from "axios";
import {
    GetSettingsParams, GetSettingsResponse, GetStateInstanceParams, GetStateInstanceResponse,
    SendFileByUrlParams, SendFileByUrlResponse, SendMessageParams, SendMessageResponse
} from "./green-api-messages";
import {getStatusText} from "./utils";

export const instance = axios.create({
    baseURL: '/proxy',
})

const Endpoint = Object.freeze({
    getSettings: "getSettings",
    getStateInstance: "getStateInstance",
    sendMessage: "sendMessage",
    sendFileByUrl: "sendFileByUrl",
})

export class GreenApiError extends Error {

    code: number
    statusText: string
    body: unknown

    constructor(code: number, statusText: string, body: unknown) {
        const actualStatusText = statusText || getStatusText(code)
        super(`GreenApi error: ${code}(${actualStatusText})`)
        this.code = code
        this.statusText = actualStatusText
        this.body = body
    }
}

const OwnStatusInternalServerError = 599

const GreenApiService = {

    getUrl(endpoint: string, idInstance: string, apiTokenInstance: string): string {
        return `/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`
    },

    async processErrors(block: () => Promise<any>) {
        try {
            return await block()
        } catch (e) {
            if (e instanceof axios.AxiosError) {
                if (e.response && e.response.status !== OwnStatusInternalServerError) {
                    throw new GreenApiError(e.response.status, e.response.statusText, e.response.data)
                }
            }
            throw e
        }
    },


    async GET(endpoint: string, idInstance: string, apiTokenInstance: string) {
        return this.processErrors(async () => {
            return (await instance.get(this.getUrl(endpoint, idInstance, apiTokenInstance))).data
        })
    },

    async POST(endpoint: string, idInstance: string, apiTokenInstance: string, body: object) {
        return this.processErrors(async () => {
            return (await instance.post(
                this.getUrl(endpoint, idInstance, apiTokenInstance),
                {...body, idInstance: undefined, apiTokenInstance: undefined}
            )).data
        })
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
