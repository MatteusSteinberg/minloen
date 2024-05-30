interface ICheckbox {
    name: string
    value: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    defaultChecked?: boolean
    checked?: boolean
    noSpacing?: boolean
    text: string
}

const Checkbox = ({ name, value, checked, defaultChecked, noSpacing, onChange, text }: ICheckbox) => {
    return (
        <div className={`${noSpacing ? "mb-0" : "mb-4"} grid grid-cols-[1em_auto] gap-4 items-center font-standard-medium text-text text-left dark:text-white`}>
            <input className="appearance-none bg-" />
            {text}
        </div>
    )
}

export default Checkbox
