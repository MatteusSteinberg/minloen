import Dropdown from "../elements/Dropdown";
import Base from "./Base";

interface ILeavemodal {
    isOpen: boolean
    toggleModal: (v: boolean) => void
}

const LeaveModal = ({ isOpen, toggleModal }: ILeavemodal) => {

    return (
        <Base isOpen={isOpen} title="Leave Modal" toggleModal={toggleModal}>
            <div>
                <div>
                    <Dropdown label="Vælg fraværstype" name="diller" options={diller2}}></Dropdown>
            </div>
        </div>
        </Base >
    );
}

export default LeaveModal;