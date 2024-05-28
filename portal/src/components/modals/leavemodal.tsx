import { useState } from "react";
import Button from "../elements/Button";
import Dropdown from "../elements/Dropdown";
import Input from "../elements/Input";
import Base from "./Base";

interface ILeavemodal {
    isOpen: boolean;
    toggleModal: (v: boolean) => void;
}

const LeaveModal = ({ isOpen, toggleModal }: ILeavemodal) => {
    const options = [
        { value: "Option 1", label: "Option 1" },
        { value: "Option 2", label: "Option 2" },
        { value: "Option 3", label: "Option 3" },
        { value: "Option 4", label: "Option 4" },
        { value: "Option 5", label: "Option 5" }
    ];

    const [selectedOption, setSelectedOption] = useState(options[0].value);

    const handleChange = (value: string) => {
        setSelectedOption(value);
        console.log(value)
    };

    return (
        <Base isOpen={isOpen} title="Leave Modal" toggleModal={toggleModal}>
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
                    {selectedOption == "Option 1" && (
                        <>
                            <div>
                                <Input label="Skirv årsag" name="årsag" placeholder="sygdom" />
                            </div>
                            <div className="px-12 my-12 ">
                                <Button background="primaryLight" color="text">Godkend</Button>
                                <Button background="secondarySupport" color="white">Annullere</Button>
                            </div>
                        </>
                    )}
                    {selectedOption == "Option 2" && (<div>View for Option 2</div>)}
                    {selectedOption == "Option 3" && (<div>View for Option 3</div>)}
                    {selectedOption == "Option 4" && (<div>View for Option 4</div>)}
                    {selectedOption == "Option 5" && (<div>View for Option 5</div>)}
                </div>
            </div>
        </Base>
    );
};

export default LeaveModal;
