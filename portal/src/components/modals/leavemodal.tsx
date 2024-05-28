import { useState } from "react";
import Dropdown from "../elements/Dropdown";
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
    };

    const renderView = () => {
        switch (selectedOption) {
            case "Option 1":
                return <div>View for Option 1</div>;
            case "Option 2":
                return <div>View for Option 2</div>;
            case "Option 3":
                return <div>View for Option 3</div>;
            case "Option 4":
                return <div>View for Option 4</div>;
            case "Option 5":
                return <div>View for Option 5</div>;
            default:
                return null;
        }
    };

    return (
        <Base isOpen={isOpen} title="Leave Modal" toggleModal={toggleModal}>
            <div>
                <div className="px-12 my-6">
                    <Dropdown
                        label="Vælg fraværstype"
                        name="type"
                        options={options}
                        onChange={(event) => handleChange(event.target.value)}
                    />
                </div>
                <div className="px-12 my-6">
                    {renderView()}
                </div>
            </div>
        </Base>
    );
};

export default LeaveModal;
