import { useState } from "react";
import DatePicker from 'react-date-picker';
import Base from "./Base";
import './customDatePicker.css';

interface IDrivingModal {
    isOpen: boolean;
    toggleModal: (v: boolean) => void;
}

const DrivingModal = ({ isOpen, toggleModal }: IDrivingModal) => {

    const [value, setValue] = useState<[Date, Date] | undefined>([new Date(), new Date()]);

    const date = {
        dateFrom: value?.[0],
        dateTo: value?.[1]
    }

    return (
        <Base isOpen={isOpen} title="Tilføj kørsel" toggleModal={toggleModal}>

            <div className="px-12 my-6">
                <h1 className="block mb-3 text-white">
                    Fra - Til
                </h1>
                <div>
                    <input className="rounded-[8px] h-[48.6px] border-[1px] border-solid text-white border-darkBorder outline-0 bg-[rgba(33,33,34,0.2)] py-4 pl-4" name="Fra" placeholder="fks. Aarhus"></input>
                    <input className="rounded-[8px] h-[48.6px] border-[1px] border-solid text-white border-darkBorder outline-0 bg-[rgba(33,33,34,0.2)] py-4 pl-4 justify-center align items-center absolute right-12" name="Til" placeholder="fks. København"></input>
                </div>
                <div className="my-6">
                    <h1 className="block mb-3 text-white">
                        Dato KM
                    </h1>
                    <div>
                        <DatePicker className="custom-date-range-picker" onChange={(value) => setValue(value as [Date, Date] | undefined)} value={value} />
                        <input className="rounded-[8px] h-[48.6px] border-[1px] border-solid text-white border-darkBorder outline-0 bg-[rgba(33,33,34,0.2)] py-4 pl-4 justify-center align items-center absolute right-12" type="number" name="km" placeholder="antal KM"></input>
                    </div>
                </div>
                <div className="my-12">
                    <button className="w-[120px] h-[44px] bg-darkPrimaryLight text-text rounded-xl border border-solid border-darkBorder mr-3">Tilføj</button>
                    <button className="w-[120px] h-[44px] bg-secondarySupport text-white rounded-xl border border-solid border-border">Annullere</button>
                </div>
            </div>
        </Base>
    )
}

export default DrivingModal
