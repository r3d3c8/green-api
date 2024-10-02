import "./AppSpacer.scss"

export type AppSpacerProps = {
    size?: "small" | "medium" | "large"
}

const AppSpacer = (
    {size}: AppSpacerProps
) => {
    let actualSize = size
    if (!actualSize) actualSize = "small"
    return <div className={`app-spacer-${actualSize}`}/>
}

export default AppSpacer
