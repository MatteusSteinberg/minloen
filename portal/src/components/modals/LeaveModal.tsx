import DateRangePicker from "@wojtekmaj/react-daterange-picker"
import { useEffect, useState } from "react"
import { IAbsence } from "../../../../interfaces/absence.interface"
import { useAPI } from "../../hooks/use-api"
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
    const { create, error } = useAPI<IAbsence>({ url: "/absence" })
    const [selectedOption, setSelectedOption] = useState(options[0].value)
    const [date, setDate] = useState<[Date, Date] | undefined>(selectedDate)
    const [form, setForm] = useState<Partial<IAbsence>>({})

    const handleChange = (value: string) => {
        setSelectedOption(value)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await create(form)
        toggleModal(false)
    }

    const handleDateChange = (value: [Date, Date] | undefined) => {
        setDate(value)
        setForm((f) => ({ ...f, dateFrom: value ? value[0] : undefined }))
        setForm((f) => ({ ...f, dateTo: value ? value[1] : undefined }))
    }

    useEffect(() => {
        setDate(selectedDate)
        setForm((f) => ({ ...f, dateFrom: selectedDate ? selectedDate[0] : undefined }))
        setForm((f) => ({ ...f, dateTo: selectedDate ? selectedDate[1] : undefined }))
    }, [selectedDate])

    return (
        <Base isOpen={isOpen} title="Fravær" toggleModal={toggleModal}>
            <div>
                <div className="px-12 my-6">
                    <Dropdown
                        label="Vælg fraværstype"
                        name="type"
                        onChange={(value) => {
                            setForm((f) => ({ ...f, type: value }))
                            handleChange(value)
                        }}
                        options={options}
                        value={selectedOption}
                    />
                </div>
                <div className="px-12 my-6">
                    {selectedOption === "sick" && (
                        <>
                            <h1 className="block mb-3 text-text dark:text-white">Skriv årsag</h1>
                            <div>
                                <textarea onChange={(ev) => setForm((f) => ({ ...f, description: ev.target.value }))} className="rounded-[14px] w-full h-[68px] border-[1px] border-solid text-text dark:text-white border-lightPrimary dark:border-[#33363E] outline-0 bg-[rgba(0,84,69,0.1)] dark:bg-[rgba(33,33,34,0.2)] resize-none min-h-[227px] py-4 pl-4" name="årsag" placeholder="Sygdom" />
                            </div>
                            <h1 className="block mb-3 text-text dark:text-white">Fra - Til</h1>
                            <div>
                                {/* <DateRangePicker className="custom-date-range-picker" onChange={(value) => setValue(value as [Date, Date] | undefined)} value={value} /> */}
                                <DateRangePicker
                                    format="dd-MM-yy"
                                    onChange={(value) => {
                                        handleDateChange(value as [Date, Date] | undefined)
                                    }}
                                    value={date}
                                />
                            </div>
                        </>
                    )}
                    {selectedOption === "offday" && (
                        <>
                            <h1 className="block mb-3 text-text dark:text-white">Skriv årsag</h1>
                            <div>
                                <textarea onChange={(ev) => setForm((f) => ({ ...f, description: ev.target.value }))} className="rounded-[14px] w-full h-[68px] border-[1px] border-solid text-text dark:text-white border-lightPrimary dark:border-[#33363E] outline-0 bg-[rgba(0,84,69,0.1)] dark:bg-[rgba(33,33,34,0.2)] resize-none min-h-[227px] py-4 pl-4" name="årsag" placeholder="Ferie" />
                            </div>
                            <h1 className="block mb-3 text-text dark:text-white">Fra - Til</h1>
                            <div>
                                {/* <DateRangePicker className="custom-date-range-picker" onChange={(value) => setValue(value as [Date, Date] | undefined)} value={value} /> */}
                                <DateRangePicker
                                    format="dd-MM-yy"
                                    onChange={(value) => {
                                        handleDateChange(value as [Date, Date] | undefined)
                                    }}
                                    value={date}
                                />
                            </div>
                        </>
                    )}
                    {selectedOption === "vacation" && (
                        <>
                            <h1 className="block mb-3 text-text dark:text-white">Fra - Til</h1>
                            <div>
                                {/* <DateRangePicker className="custom-date-range-picker" onChange={(value) => setValue(value as [Date, Date] | undefined)} value={value} /> */}
                                <DateRangePicker
                                    format="dd-MM-yy"
                                    onChange={(value) => {
                                        handleDateChange(value as [Date, Date] | undefined)
                                    }}
                                    value={date}
                                />
                            </div>
                        </>
                    )}
                    <div className="my-12">
                        <button onClick={handleSubmit} className="w-[120px] h-[44px] bg-lightPrimary dark:bg-darkPrimaryLight text-white dark:text-text rounded-xl border border-solid border-lightBorder dark:border-darkBorder mr-3">
                            Godkend
                        </button>
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
