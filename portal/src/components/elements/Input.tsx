import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import dayjs from "dayjs"
import React, { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react"

interface IInput {
    placeholder?: string
    type?: HTMLInputTypeAttribute
    error?: string
    value?: any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string
    autocomplete?: HTMLInputAutoCompleteAttribute | undefined
    children?: React.ReactNode
    label?: string
    icon?: React.ReactNode
    spacing?: boolean
    locked?: boolean
    defaultValue?: any
}

const Input = ({ name, autocomplete, children, defaultValue, locked, error, label, onChange, placeholder, type, value, icon, spacing }: IInput) => {
    if (type === "date" && !!value) {
        value = dayjs(value).format("YYYY-MM-DD")
    }

    return (
        <div className={`relative block w-full ${spacing ? "mb-4" : "mb-0"}`}>
            {label && <label className="block mb-3 text-text dark:text-white">{label}</label>}
            <div className={`p-0 relative rounded-[14px] w-full h-[68px] border-[1px] border-solid ${error ? "border-error" : "border-lightPrimary dark:border-[#33363E]"} bg-[rgba(0,84,69,0.1)] dark:bg-[rgba(33,33,34,0.2)]`}>
                {icon && <div className="absolute top-1/2 left-4 -translate-y-1/2 flex items-center h-6 w-6 text-[rgba(255,255,255,0.6)] dark:text-[rgba(255,255,255,0.3)]">{icon}</div>}
                <input defaultValue={defaultValue} disabled={locked} autoComplete={autocomplete} className={`w-full h-full text-text dark:text-white bg-transparent outline-0 ${icon ? "pr-4 pl-12" : "px-5"} placeholder:rgba(231,231,233,0.3) dark:placeholder:text-[rgba(255,255,255,0.3)] placeholder:font-normal`} name={name} onChange={onChange} placeholder={placeholder} type={type} value={value} />
                {error && (
                    <div className="absolute flex items-center w-6 h-6 -translate-y-1/2 top-1/2 right-4 text-error">
                        <ExclamationCircleIcon />
                    </div>
                )}
            </div>
            {error && <p className="mt-2 text-sm text-error">{error}</p>}
        </div>
    )
}

export default Input
