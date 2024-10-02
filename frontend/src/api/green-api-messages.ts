

interface CommonParams {
    idInstance: string
    apiTokenInstance: string
}

export interface GetSettingsParams extends CommonParams {}
export interface GetStateInstanceParams extends CommonParams {}

export interface SendMessageBody {
    chatId: string
    message: string
    quotedMessageId?: string
    linkPreview?: boolean
}
export interface SendMessageParams extends CommonParams {
    body: SendMessageBody
}

export interface SendFileByUrlBody {
    chatId: string
    urlFile: string
    fileName: string
    caption?: string
    quotedMessageId?: string
}
export interface SendFileByUrlParams extends CommonParams {
    body: SendFileByUrlBody
}


export interface GetSettingsResponse {
    // ...
}
export interface GetStateInstanceResponse {
    // ...
}
export interface SendMessageResponse {
    // ...
}
export interface SendFileByUrlResponse {
    // ...
}

export const phoneToChatId = (phone: string) => `${phone}@c.us`
