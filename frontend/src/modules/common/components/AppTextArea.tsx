import {ChangeEvent, useCallback, useState} from "react";
import {v7 as uuid} from "uuid";
import {FormGroup, TextArea} from "@blueprintjs/core";
import {AppInlineInputProps} from "./AppInput";

export interface AppInlineTextAreaProps extends AppInlineInputProps {
    fill?: boolean
    rows?: number
}

export const AppInlineTextArea = (
    {id, value, placeholder, style, fill = true, rows = 8, readOnly, onChange}: AppInlineTextAreaProps
) => {
    const changeHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value), [onChange])

    return (
        <TextArea
            id={id}
            placeholder={placeholder}
            style={style}
            fill={fill}
            rows={rows}
            readOnly={readOnly}
            value={value}
            onChange={changeHandler}
        />
    )
}


export interface AppTextAreaProps extends AppInlineTextAreaProps {
    label: string
}

const AppTextArea = (
    {id, value, label, placeholder, style, fill = true, rows = 8, readOnly, onChange}: AppTextAreaProps
) => {
    const [inputId] = useState(id || uuid())

    return (
        <FormGroup label={label} labelFor={inputId}>
            <AppInlineTextArea
                id={inputId}
                placeholder={placeholder}
                style={style}
                fill={fill}
                rows={rows}
                readOnly={readOnly}
                value={value}
                onChange={onChange}
            />
        </FormGroup>
    )
}

export default AppTextArea
