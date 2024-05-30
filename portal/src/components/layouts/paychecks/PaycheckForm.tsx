import { PlusCircleIcon } from "@heroicons/react/24/outline"
import _ from "lodash"
import React, { useState } from "react"
import { IPayrollSetup } from "../../../../../interfaces/payroll.interface"
import { IUser } from "../../../../../interfaces/user.interface"
import Input from "../../elements/Input"

interface IPayrollForm {
  user?: IUser,
  payrollSetup?: IPayrollSetup
  onFormChange?: (path: string, value: any) => void
}

const PaycheckForm = ({ payrollSetup, user, onFormChange }: IPayrollForm) => {
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

  const inputHandler = (path: string) => ({
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => {
      onFormChange?.(path, ev.target.value)
    },
    value: _.get(payrollSetup, path)
  })

  return (
    <>
      <div className="p-8 bg-white dark:bg-darkPrimarySupport rounded-3xl shadow-custom">
        <div className="mb-4">
          <h2 className="text-text dark:text-white font-large-normal">Faste lønoplysninger</h2>
          <p className="opacity-50 text-text dark:text-white font-small-normal">Medarbejderens faste lønoplysninger</p>
        </div>
        <div className="flex flex-col items-stretch justify-start gap-1">
          <Input {...inputHandler("wageInfo.standardHours")} name="normTime" placeholder="Normtimer" type="number" />
          <Input {...inputHandler("wageInfo.salary")} name="gage" placeholder="Gage" type="number" />
          <Input {...inputHandler("wageInfo.hourlyWage")} name="hourlyPaid" placeholder="Individuel sats (Timeløn)" type="number" />
          <Input {...inputHandler("wageInfo.personalAdditions")} name="personalAdditions" placeholder="Personligt tillæg" type="number" />
        </div>
      </div>
      <div className="p-8 bg-white dark:bg-darkPrimarySupport rounded-3xl shadow-custom">
        <div className="mb-4">
          <h2 className="text-text dark:text-white font-large-normal">Personalegoder</h2>
          <p className="opacity-50 text-text dark:text-white font-small-normal">Mobil, Bil, Internet</p>
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
      <div className="p-8 bg-white dark:bg-darkPrimarySupport rounded-3xl shadow-custom">
        <div className="mb-4">
          <h2 className="text-text dark:text-white font-large-normal">Tillæg</h2>
          <p className="opacity-50 text-text dark:text-white font-small-normal">Diverse tillæg</p>
        </div>
        <div className="flex flex-col items-stretch justify-start gap-1">
          {inputFields.map((field) => (
            <Input key={field.id} name={field.name} placeholder={field.placeholder} type={field.type} />
          ))}
        </div>
        <div className="flex items-center justify-center w-full mt-4">
          <button className="flex items-center justify-center gap-2" onClick={addInputField}>
            <PlusCircleIcon className="block w-5 h-5 text-text dark:text-white" />
            <span className="-mt-1 text-text dark:text-white">Tilføj tillæg</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default PaycheckForm
