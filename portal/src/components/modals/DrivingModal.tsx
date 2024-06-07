import { useState } from "react"
import DatePicker from "react-date-picker"
import { IDriving } from "../../../../interfaces/driving.interface"
import { useAPI } from "../../hooks/use-api"
import Checkbox from "../elements/Checkbox"
import Input from "../elements/Input"
import Base from "./Base"
import "./customDatePicker.css"

interface IDrivingModal {
    isOpen: boolean
    toggleModal: (v: boolean) => void
}

const DrivingModal = ({ isOpen, toggleModal }: IDrivingModal) => {
    const { create, error } = useAPI<IDriving>({ url: "/driving", opts: { autoGet: false } })

    const [form, setForm] = useState<Partial<IDriving>>({})

    const formPathHandler = (path: keyof IDriving, onError: string) => ({
        onChange: (ev: React.ChangeEvent<HTMLInputElement>) => {
            setForm((f) => ({ ...f, [path]: ev.target.value }))
        },
        error: error?.path === path ? onError : undefined,
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await create(form)
        toggleModal(false)
    }

    return (
        <Base isOpen={isOpen} title="Tilføj kørsel" toggleModal={toggleModal}>
            <div className="px-12 my-6">
                <h1 className="block mb-3 text-white">Fra - Til</h1>
                <div>
                    <input {...formPathHandler("locationFrom", "Fra")} className="rounded-lg h-[48.6px] border border-solid text-white border-darkBorder outline-0 bg-[rgba(33,33,34,0.2)] py-4 pl-4" name="Fra" placeholder="fks. Aarhus"></input>
                    <input {...formPathHandler("locationTo", "Til")} className="rounded-lg h-[48.6px] border border-solid text-white border-darkBorder outline-0 bg-[rgba(33,33,34,0.2)] py-4 pl-4 justify-center items-center absolute right-12" name="til" placeholder="Feks. København"></input>
                </div>
                <div>
                    <Checkbox {...formPathHandler("roundtrip", "Tur-retur")} name="retur" text="Tur-retur" value=""></Checkbox>
                </div>
                <div className="my-6">
                    <h1 className="block mb-3 text-white">Dato KM</h1>
                    <div>
                        <DatePicker className="custom-date-range-picker" onChange={(value) => setForm((f) => ({ ...f, date: value as Date }))} value={form.date} />
                        <input {...formPathHandler("distance", "afstand")} className="rounded-[8px] h-[48.6px] border-[1px] border-solid text-white border-darkBorder outline-0 bg-[rgba(33,33,34,0.2)] py-4 pl-4 justify-center align items-center absolute right-12" type="number" name="km" placeholder="antal KM"></input>
                    </div>
                </div>
                <div>
                    <Input {...formPathHandler("licensePlate", "Nummerplade")} name="Nummerplade" placeholder="AB12345" label="Nummerplade"></Input>
                </div>
                <div className="my-12">
                    <button onClick={(e) => handleSubmit(e)} className="w-[120px] h-[44px] bg-darkPrimaryLight text-text rounded-xl border border-solid border-darkBorder mr-3">
                        Tilføj
                    </button>
                    <button className="w-[120px] h-[44px] bg-secondarySupport text-white rounded-xl border border-solid border-border">Annullere</button>
                </div>
            </div>
        </Base>
    )
}

export default DrivingModal
