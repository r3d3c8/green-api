import {useState} from "react";
import {Button} from "@blueprintjs/core";
import AppTwoColumnLayout from "../common/components/AppTwoColumnLayout";
import {AppInlineInput} from "../common/components/AppInput";
import AppTextArea, {AppInlineTextArea} from "../common/components/AppTextArea";
import AppSpacer from "../common/components/AppSpacer";
import GreenApiService from "../../api/green-api";
import {showToast, ToastType} from "../common/components/AppToaster";
import {phoneToChatId} from "../../api/green-api-messages";


const defaultIdInstance = import.meta.env.VITE_DEFAULT_ID_INSTANCE || ''
const defaultApiTokenInstance = import.meta.env.VITE_DEFAULT_API_TOKEN_INSTANCE || ''

const filenamePattern = /^[a-zA-Z0-9_\s]{1,100}\.[a-zA-Z0-9_\s]{1,15}$/
const defaultFileName = "file.bin"

const extractFileName = (urlStr: string): string => {
    try {
        const url = new URL(urlStr)
        const elems = url.pathname.split("/")
        if (elems.length === 0) return defaultFileName
        const last = elems[elems.length - 1]
        if (filenamePattern.test(last)) {
            return last
        }
        return defaultFileName
    } catch {
        return defaultFileName
    }
}

const withToastOnError = (block: () => Promise<unknown>) => {
    return async () => {
        try {
            await block()
        } catch (e) {
            showToast(`oops... (${e})`, ToastType.Danger, 3000)
        }
    }
}

const HomeView = () => {

    const [idInstance, setIdInstance] = useState(defaultIdInstance)
    const [apiTokenInstance, setApiTokenInstance] = useState(defaultApiTokenInstance)
    const [messagePhone, setMessagePhone] = useState("")
    const [message, setMessage] = useState("")
    const [filePhone, setFilePhone] = useState("")
    const [fileUrl, setFileUrl] = useState("https://")
    const [answer, setAnswer] = useState("")

    const hasApiCredentials = idInstance && apiTokenInstance
    const isGetSettingsDisabled = !hasApiCredentials
    const isGetStateInstanceDisabled = !hasApiCredentials
    const isSendMessageDisabled = !hasApiCredentials || !messagePhone || !message
    const isSendFileDisabled = !hasApiCredentials || !filePhone || !/http(s)?:\/\/.+/.test(fileUrl)

    const setPrettyAnswer = (resp: unknown) => {
        const prettyAnswer = JSON.stringify(resp, undefined, 4)
        setAnswer(prettyAnswer)
    }

    const getSettingsClickHandler = withToastOnError(async () => {
        setPrettyAnswer(await GreenApiService.getSettings({idInstance, apiTokenInstance}))
    })
    const getStateInstanceClickHandler = withToastOnError(async () => {
        setPrettyAnswer(await GreenApiService.getStateInstance({idInstance, apiTokenInstance}))
    })
    const sendMessageClickHandler = withToastOnError(async () => {
        setPrettyAnswer(
            await GreenApiService.sendMessage({
                idInstance: idInstance,
                apiTokenInstance: apiTokenInstance,
                body: {
                    chatId: phoneToChatId(messagePhone),
                    message: message
                }
            })
        )
    })
    const sendFileClickHandler = withToastOnError(async () => {
        setPrettyAnswer(
            await GreenApiService.sendFileByUrl({
                idInstance: idInstance,
                apiTokenInstance: apiTokenInstance,
                body: {
                    chatId: phoneToChatId(messagePhone),
                    urlFile: fileUrl,
                    fileName: extractFileName(fileUrl)
                }
            })
        )
    })
    const column1 = (
        <>
            <AppInlineInput
                onChange={value => setIdInstance(value)}
                placeholder="idInstance"
                value={idInstance}
            />
            <AppSpacer/>
            <AppInlineInput
                onChange={value => setApiTokenInstance(value)}
                placeholder="apiTokenInstance"
                value={apiTokenInstance}
            />
            <AppSpacer size="medium"/>
            <div>
                <Button
                    fill
                    disabled={isGetSettingsDisabled}
                    onClick={getSettingsClickHandler}
                >
                    getSettings
                </Button>
            </div>
            <AppSpacer size="medium"/>
            <div>
                <Button
                    fill
                    disabled={isGetStateInstanceDisabled}
                    onClick={getStateInstanceClickHandler}
                >
                    getStateInstance
                </Button>
            </div>
            <AppSpacer size="large"/>

            <AppInlineInput
                onChange={value => setMessagePhone(value)}
                placeholder="phone"
                value={messagePhone}
            />
            <AppSpacer/>
            <AppInlineTextArea
                onChange={value => setMessage(value)}
                placeholder="message"
                value={message}
            />
            <AppSpacer size="medium"/>
            <Button fill disabled={isSendMessageDisabled} onClick={sendMessageClickHandler}>sendMessage</Button>
            <AppSpacer size="large"/>

            <AppInlineInput
                onChange={value => setFilePhone(value)}
                placeholder="phone"
                value={filePhone}
            />
            <AppSpacer/>
            <AppInlineInput
                onChange={value => setFileUrl(value)}
                placeholder="message"
                value={fileUrl}
            />
            <AppSpacer size="medium"/>
            <Button fill disabled={isSendFileDisabled} onClick={sendFileClickHandler}>sendFileByUrl</Button>
        </>
    )
    const column2 = (
        <AppTextArea
            label="Ответ:"
            onChange={_value => {}}
            placeholder=""
            value={answer}
            rows={30}
            readOnly
        />
    )

    return (
        <div style={{width: "100%", padding: "50px"}}>
            <AppTwoColumnLayout
                width1="calc(50% - 50px)"
                width2="50%"
                dividerWidth="50px"
                column1={column1}
                column2={column2}
            />
        </div>
    )
}

export default HomeView
