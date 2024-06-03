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
        <div className={`${noSpacing ? "mb-0 mt-0" : "mb-4 mt-4"} grid grid-cols-[1em_auto] gap-4 items-center font-standard-medium text-text text-left dark:text-white`}>
            <input className="appearance-none bg-[rgba(0,84,69,0.1)] border-solid border border-lightPrimary dark:border-darkPrimaryLight dark:bg-[rgba(33,33,34,.2)] m-0 font-small-normal text-text dark:text-white h-5 w-5 rounded-lg -translate-y-[0.075em] grid place-content-center transition-all duration-150 outline-none before:w-[10px] before:h-[10px] before:opacity-0 before:bg-lightPrimary dark:before:bg-darkPrimaryLight checked:before:opacity-100 before:rounded-[4px]" type="checkbox" />
            <span className="-mt-1">{text}</span>
        </div>
    )
}

export default Checkbox
