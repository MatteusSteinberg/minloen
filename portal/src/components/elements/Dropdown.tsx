import { useEffect, useMemo, useRef, useState } from "react"
import { useOutsideClick } from "../../hooks/useOutsideClick"

export type DropdownOption = { value: any, label: string }

type Props = {
  options: Array<DropdownOption>
  spacing?: boolean
  error?: string
  value?: any
  placeholder?: string
  onChange?: (v: any) => void
  name: string
  label?: string
}

const Dropdown = ({ options, name, placeholder, error, label, onChange, spacing, value }: Props) => {
  const [selectedOption, setSelectedOption] = useState<any>(value)
  const [dropdownDirection, setDropdownDirection] = useState("mt-1")
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isVisible, dropdownRef, toggleVisibility] = useOutsideClick(false, buttonRef)

  const onOptionClicked = (value: any) => () => {
    setSelectedOption(value)
    onChange?.(value)
    toggleVisibility(false)
  }

  const currentOption = useMemo(() => {
    return options.find(x => x.value === selectedOption)
  }, [options, selectedOption])

  useEffect(() => {
    const checkIfTooCloseToBottom = () => {
      const rect = dropdownRef.current?.getBoundingClientRect()
      const spaceToBottom = window.innerHeight - (rect?.bottom || 0)
      const dropdownHeight = rect?.height || 0

      if (spaceToBottom < dropdownHeight) {
        setDropdownDirection("bottom-[105%] origin-bottom")
      } else {
        setDropdownDirection("top-[105%] origin-top")
      }
    }

    if (isVisible) {
      setTimeout(checkIfTooCloseToBottom, 0)
    }

    window.addEventListener("resize", checkIfTooCloseToBottom)

    return () => {
      window.removeEventListener("resize", checkIfTooCloseToBottom)
    }
  }, [isVisible])

  const isPlaceholder = !currentOption && placeholder

  return (
    <div className={`relative block w-full ${spacing ? "mb-4" : "mb-0"}`}>
      <label className="block mb-3 text-white">{label}</label>
      <button className={`px-5 relative rounded-[14px] text-white w-full h-[68px] inline-flex items-center justify-start border-[1px] border-solid ${error ? "border-error" : "border-[#33363E]"} bg-[rgba(33,33,34,0.2)]`} ref={buttonRef} onClick={() => toggleVisibility(!isVisible)}>
        <span className={isPlaceholder ? "text-[rgba(255,255,255,0.3)]" : undefined}>{currentOption?.label || placeholder || "Select an Option"}</span>
        <svg className="absolute right-4 top-1/2 -transform-y-1/2" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L4.29289 4.29289C4.68342 4.68342 5.31658 4.68342 5.70711 4.29289L9 1" stroke="#767676" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
      {isVisible && (
        <div className={`${dropdownDirection} z-40 left-0 p-2 absolute rounded-[14px] text-white w-full h-auto inline-flex flex-col gap-2 items-start gap justify-start border-[1px] border-solid bg-[rgba(33,33,34,1)] border-[#33363E]`} ref={dropdownRef}>
          {options.map((option) => (
            <div className="w-full px-3 py-3 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-secondarySupport"
              onClick={onOptionClicked(option.value)}
              key={Math.random()}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
