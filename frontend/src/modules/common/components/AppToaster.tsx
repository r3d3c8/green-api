import {Intent, OverlayToaster, Position} from "@blueprintjs/core";
import React, {useEffect} from "react";

let appToaster: OverlayToaster | null = null

const AppToaster = () => {
    const toaster = React.useRef<OverlayToaster>(null);

    useEffect(() => {
        appToaster = toaster.current
        return () => {
            appToaster = null
        }
    }, []);

    return <OverlayToaster position={Position.TOP} ref={toaster} />
}

// eslint-disable-next-line react-refresh/only-export-components
export enum ToastType {
    Primary = "info",
    Success = "success",
    Warning = "warning",
    Danger = "danger",
}

// eslint-disable-next-line react-refresh/only-export-components
export const showToast = (message: string, type: ToastType = ToastType.Primary, timeout: number = 1000) => {
    let intent: Intent = Intent.PRIMARY
    switch (type) {
        case ToastType.Primary:
            intent = Intent.PRIMARY
            break;
        case ToastType.Success:
            intent = Intent.SUCCESS
            break;
        case ToastType.Warning:
            intent = Intent.WARNING
            break;
        case ToastType.Danger:
            intent = Intent.DANGER
            break;
        default:
    }
    appToaster?.show({message, intent, timeout});
}

export default AppToaster
