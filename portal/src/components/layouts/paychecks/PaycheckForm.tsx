import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import Input from "../../elements/Input"

type Props = {}

const PaycheckForm = (props: Props) => {
    const [inputFields, setInputFields] = useState([{ id: 1, name: "tillaeg-1", placeholder: "Tillæg 1", type: "number" }])

    const addInputField = () => {
        const newField = {
            id: inputFields.length + 1,
            name: `tillaeg${inputFields.length + 1}`,
            placeholder: `Tillæg ${inputFields.length + 1}`,
            type: "number",
        }
        setInputFields([...inputFields, newField])
    }

    return (
        <>
            <div className="p-8 bg-primarySupport rounded-3xl shadow-custom">
                <div className="mb-4">
                    <h2 className="text-white font-large-normal">Faste lønoplysninger</h2>
                    <p className="text-white opacity-50 font-small-normal">Medarbejderens faste lønoplysninger</p>
                </div>
                <div className="flex flex-col items-stretch justify-start gap-1">
                    <Input name="normTime" placeholder="Normtimer" type="number" />
                    <Input name="gage" placeholder="Gage" type="number" />
                    <Input name="hourlyPaid" placeholder="Individuel sats (Timeløn)" type="number" />
                    <Input name="personalAdditions" placeholder="Personligt tillæg" type="number" />
                </div>
            </div>
            <div className="p-8 bg-primarySupport rounded-3xl shadow-custom">
                <div className="mb-4">
                    <h2 className="text-white font-large-normal">Personalegoder</h2>
                    <p className="text-white opacity-50 font-small-normal">Mobil, Bil, Internet</p>
                </div>
                <div className="flex flex-col items-stretch justify-start gap-1">
                    <Input name="friBil" placeholder="Fri bil" type="number" />
                    <Input name="friHelaarsBolig" placeholder="Fri helårsbolig" type="number" />
                    <Input name="friSommerBolig" placeholder="Fri sommerbolig" type="number" />
                    <Input name="friLystBaad" placeholder="Fri lystbåd" type="number" />
                    <Input name="friMedieRadioLicens" placeholder="Fri medie-/radiolicens" type="number" />
                    <Input name="personalegoderWithLimit" placeholder="Andre personalegoder med bundgrænse" type="number" />
                    <Input name="personalegoderWithNoLimit" placeholder="Andre personalegoder uden bundgrænse" type="number" />
                    <Input name="friInternetMobil" placeholder="Fri telefon / internet" type="number" />
                    <Input name="frikortOffentligBefordring" placeholder="Frikort til offentlig befordring" type="number" />
                    <Input name="sundhedsForsikring" placeholder="Sundhedsforsikring" type="number" />
                </div>
            </div>
            <div className="p-8 bg-primarySupport rounded-3xl shadow-custom">
                <div className="mb-4">
                    <h2 className="text-white font-large-normal">Faste tillæg</h2>
                    <p className="text-white opacity-50 font-small-normal">Diverse faste tillæg</p>
                </div>
                <div className="flex flex-col items-stretch justify-start gap-1">
                    {inputFields.map((field) => (
                        <Input key={field.id} name={field.name} placeholder={field.placeholder} type={field.type} />
                    ))}
                </div>
                <div className="flex items-center justify-center w-full mt-4">
                    <button className="flex items-center justify-center gap-2" onClick={addInputField}>
                        <PlusCircleIcon className="block w-5 h-5 text-white" />
                        <span className="-mt-1 text-white">Tilføj tillæg</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default PaycheckForm
