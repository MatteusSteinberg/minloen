import { useState } from "react"
import Dropdown from "../elements/Dropdown"
import Base from "./Base"

interface ILeavemodal {
    isOpen: boolean
    toggleModal: (v: boolean) => void
}

const LeaveModal = ({ isOpen, toggleModal }: ILeavemodal) => {
    const options = [
        { value: "Option 1", label: "Sygdom" },
        { value: "Option 2", label: "fridag" },
        { value: "Option 3", label: "feriedag" },
        { value: "Option 4", label: "Option 4" },
        { value: "Option 5", label: "Option 5" },
    ]

    const [selectedOption, setSelectedOption] = useState(options[0].value)

    const handleChange = (value: string) => {
        setSelectedOption(value)
    }

    return (
        <Base isOpen={isOpen} title="Fravær" toggleModal={toggleModal}>
            <div>
                <div className="px-12 my-6">
                    <Dropdown label="Vælg fraværstype" name="type" options={options} onChange={(value) => handleChange(value)} />
                </div>
                <div className="px-12 my-6">
                    {selectedOption === "Option 1" && (
                        <>
                            <h1 className="block mb-3 text-white">Skriv årsag</h1>
                            <div>
                                <textarea className="rounded-[14px] w-full h-[68px] border-[1px] border-solid text-white border-darkBorder outline-0 bg-[rgba(33,33,34,0.2)] resize-none min-h-[227px] py-4 pl-4" name="årsag" placeholder="sygdom" />
                            </div>
                            <div className="my-12">
                                <button className="w-[120px] h-[44px] bg-darkPrimaryLight text-text rounded-xl border border-solid border-darkBorder mr-3">Godkend</button>
                                <button className="w-[120px] h-[44px] bg-darkSecondarySupport text-white rounded-xl border border-solid border-darkBorder">Annullere</button>
                            </div>
                        </>
                    )}
                    {selectedOption === "Option 2" && (
                        <>
                            <h1 className="block mb-3 text-white">Skriv årsag</h1>
                            <div>
                                <textarea className="rounded-[14px] w-full h-[68px] border-[1px] border-solid text-white border-darkBorder outline-0 bg-[rgba(33,33,34,0.2)] resize-none min-h-[227px] py-4 pl-4" name="årsag" placeholder="ferie" />
                            </div>
                            <div className="my-12">
                                <button className="w-[120px] h-[44px] bg-darkPrimaryLight text-text rounded-xl border border-solid border-darkBorder mr-3">Godkend</button>
                                <button className="w-[120px] h-[44px] bg-darkSecondarySupport text-white rounded-xl border border-solid border-darkBorder">Annullere</button>
                            </div>
                        </>
                    )}
                    {selectedOption === "Option 3" && <div>View for feriedag</div>}
                    {selectedOption === "Option 4" && <div>View for Option 4</div>}
                    {selectedOption === "Option 5" && <div>View for Option 5</div>}
                </div>
            </div>
        </Base>
    )
}

export default LeaveModal
