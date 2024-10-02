import {ChangeEvent, CSSProperties, useCallback, useState} from "react";
import {v7 as uuid} from "uuid";
import {FormGroup, InputGroup} from "@blueprintjs/core";

export interface AppInlineInputProps {
    id?: string
    value: string
    placeholder: string
    style?: CSSProperties
    readOnly?: boolean
    onChange: (value: string) => void
}

export const AppInlineInput = (
    {id = undefined, value, placeholder, style, readOnly, onChange}: AppInlineInputProps
) => {
    const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value), [onChange])

    return (
        <InputGroup id={id} placeholder={placeholder} style={style} value={value} readOnly={readOnly} onChange={changeHandler}/>
    )
}


export interface AppInputProps extends AppInlineInputProps {
    label: string
}

const AppInput = (
    {id = undefined, value, label, placeholder, style, readOnly, onChange}: AppInputProps
) => {
    const [inputId] = useState(id || uuid())

    return (
        <FormGroup label={label} labelFor={inputId}>
            <AppInlineInput
                id={inputId}
                value={value}
                placeholder={placeholder}
                style={style}
                readOnly={readOnly}
                onChange={onChange}
            />
        </FormGroup>
    )
}


export default AppInput
