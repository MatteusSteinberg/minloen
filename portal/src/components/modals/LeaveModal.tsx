import DateRangePicker from "@wojtekmaj/react-daterange-picker"
import { useEffect, useState } from "react"
import Dropdown from "../elements/Dropdown"
import Base from "./Base"
import "./customDatePicker.css"

interface ILeavemodal {
    isOpen: boolean
    toggleModal: (v: boolean) => void
    selectedDate: [Date, Date] | undefined
}

const options = [
    { value: "sick", label: "Sygdom" },
    { value: "offday", label: "Fridag" },
    { value: "vacation", label: "Feriedag" },
]

const LeaveModal = ({ isOpen, toggleModal, selectedDate }: ILeavemodal) => {
    const [selectedOption, setSelectedOption] = useState(options[0].value)
    const [value, setValue] = useState<[Date, Date] | undefined>(selectedDate)

    const handleChange = (value: string) => {
        setSelectedOption(value)
    }

    useEffect(() => {
        setValue(selectedDate)
    }, [selectedDate])

    return (
        <Base isOpen={isOpen} title="Fravær" toggleModal={toggleModal}>
            <div>
                <div className="px-12 my-6">
                    <Dropdown label="Vælg fraværstype" name="type" options={options} onChange={(value) => handleChange(value)} value={selectedOption} />
                </div>
                <div className="px-12 my-6">
                    {selectedOption === "sick" && (
                        <>
                            <h1 className="block mb-3 text-text dark:text-white">Skriv årsag</h1>
                            <div>
                                <textarea className="rounded-[14px] w-full h-[68px] border-[1px] border-solid text-text dark:text-white border-lightPrimary dark:border-[#33363E] outline-0 bg-[rgba(0,84,69,0.1)] dark:bg-[rgba(33,33,34,0.2)] resize-none min-h-[227px] py-4 pl-4" name="årsag" placeholder="Sygdom" />
                            </div>
                        </>
                    )}
                    {selectedOption === "offday" && (
                        <>
                            <h1 className="block mb-3 text-text dark:text-white">Skriv årsag</h1>
                            <div>
                                <textarea className="rounded-[14px] w-full h-[68px] border-[1px] border-solid text-text dark:text-white border-lightPrimary dark:border-[#33363E] outline-0 bg-[rgba(0,84,69,0.1)] dark:bg-[rgba(33,33,34,0.2)] resize-none min-h-[227px] py-4 pl-4" name="årsag" placeholder="Ferie" />
                            </div>
                        </>
                    )}
                    {selectedOption === "vacation" && (
                        <>
                            <h1 className="block mb-3 text-text dark:text-white">Fra - Til</h1>
                            <div>
                                {/* <DateRangePicker className="custom-date-range-picker" onChange={(value) => setValue(value as [Date, Date] | undefined)} value={value} /> */}
                                <DateRangePicker format="dd-MM-yy" onChange={(value) => setValue(value as [Date, Date] | undefined)} value={value} />
                            </div>
                        </>
                    )}
                    <div className="my-12">
                        <button className="w-[120px] h-[44px] bg-lightPrimary dark:bg-darkPrimaryLight text-white dark:text-text rounded-xl border border-solid border-lightBorder dark:border-darkBorder mr-3">Godkend</button>
                        <button className="w-[120px] h-[44px] bg-darkSecondarySupport text-white rounded-xl border border-solid border-darkBorder" onClick={() => toggleModal(false)}>
                            Annullere
                        </button>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default LeaveModal
