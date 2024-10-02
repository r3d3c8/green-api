import {ReactNode} from "react";
import AppRow from "./AppRow";

const AppTwoColumnLayout = ({
    width1 = "30%",
    width2 = "calc(70% - 5px)",
    dividerWidth = "5px",
    column1,
    column2
}: {
        width1?: number | string | undefined
        width2?: number | string | undefined
        dividerWidth?: number | string | undefined
        column1: ReactNode
        column2: ReactNode
}) => {
    return (
        <AppRow>
            <div style={{width: width1}}>{column1}</div>
            <div style={{width: dividerWidth}}/>
            <div style={{width: width2}}>{column2}</div>
        </AppRow>
    )
}

export default AppTwoColumnLayout
