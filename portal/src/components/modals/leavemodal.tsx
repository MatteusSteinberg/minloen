import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useState } from "react";
import Dropdown from "../elements/Dropdown";
import Base from "./Base";
import './customDatePicker.css';

interface ILeavemodal {
    isOpen: boolean;
    toggleModal: (v: boolean) => void;
}

const LeaveModal = ({ isOpen, toggleModal }: ILeavemodal) => {
    const options = [
        { value: "Option 1", label: "Sygdom" },
        { value: "Option 2", label: "Fridag" },
        { value: "Option 3", label: "Feriedag" }
    ];

    const [selectedOption, setSelectedOption] = useState(options[0].value);

    const handleChange = (value: string) => {
        setSelectedOption(value);
    };

    const [value, setValue] = useState<[Date, Date] | undefined>([new Date(), new Date()]);

    return (
        <Base isOpen={isOpen} title="Fravær" toggleModal={toggleModal}>
            <div>
                <div className="px-12 my-6">
                    <Dropdown
                        label="Vælg fraværstype"
                        name="type"
                        options={options}
                        onChange={(value) => handleChange(value)}
                    />
                </div>
                <div className="px-12 my-6">
                    {selectedOption === "Option 1" && (
                        <>
                            <h1 className="block mb-3 text-white">
                                Skriv årsag
                            </h1>
                            <div>
                                <textarea className="rounded-[14px] w-full h-[68px] border-[1px] border-solid text-white border-border outline-0 bg-[rgba(33,33,34,0.2)] resize-none min-h-[227px] py-4 pl-4" name="årsag" placeholder="sygdom" />
                            </div>
                            <div className="my-12">
                                <button className="w-[120px] h-[44px] bg-primaryLight text-text rounded-xl border border-solid border-border mr-3">Godkend</button>
                                <button className="w-[120px] h-[44px] bg-secondarySupport text-white rounded-xl border border-solid border-border">Annullere</button>
                            </div>
                        </>
                    )}
                    {selectedOption === "Option 2" && (
                        <>
                            <h1 className="block mb-3 text-white">
                                Skriv årsag
                            </h1>
                            <div>
                                <textarea className="rounded-[14px] w-full h-[68px] border-[1px] border-solid text-white border-border outline-0 bg-[rgba(33,33,34,0.2)] resize-none min-h-[227px] py-4 pl-4" name="årsag" placeholder="ferie" />
                            </div>
                            <div className="my-12">
                                <button className="w-[120px] h-[44px] bg-primaryLight text-text rounded-xl border border-solid border-border mr-3">Godkend</button>
                                <button className="w-[120px] h-[44px] bg-secondarySupport text-white rounded-xl border border-solid border-border">Annullere</button>
                            </div>
                        </>
                    )}
                    {selectedOption === "Option 3" && (
                        <>
                            <h1 className="block mb-3 text-white">
                                Fra - Til
                            </h1>
                            <div>
                                <DateRangePicker className="custom-date-range-picker" onChange={(value) => setValue(value as [Date, Date] | undefined)} value={value} />
                            </div>
                            <div className="my-12">
                                <button className="w-[120px] h-[44px] bg-primaryLight text-text rounded-xl border border-solid border-border mr-3">Godkend</button>
                                <button className="w-[120px] h-[44px] bg-secondarySupport text-white rounded-xl border border-solid border-border">Annullere</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Base>
    );
};

export default LeaveModal;
