import {CSSProperties, ReactNode} from "react";
import {clsx} from "clsx";
import "./AppRow.scss"

interface AppRowProps {
    verticalAlign?: "center"
    style?: CSSProperties
    className?: string | string[]
    children: ReactNode
}

const AppRow = ({verticalAlign, children, className, style}: AppRowProps) => {
    return (
        <div style={style} className={clsx("app-row", verticalAlign && "app-row-center", className)}>
            {children}
        </div>
    )
}

export default AppRow
