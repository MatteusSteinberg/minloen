import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import _ from "lodash"
import React, { useState } from "react"
import { CustomPayrollSupplement, IPayrollSetup } from "../../../../../interfaces/payroll.interface"
import { IUser } from "../../../../../interfaces/user.interface"
import generateUuid from "../../../lib/generate-uuid"
import Input from "../../elements/Input"

interface DeductionOrSupplement {
    type: "supplements" | "deduction"
    list: Array<CustomPayrollSupplement>
    formChange?: (path: string, value: any) => void
    add?: () => void
    remove?: (id: any) => void
}

function SalaryListSupplementOrDeduction({ list, type, formChange, add, remove }: DeductionOrSupplement) {
    const name = type === "supplements" ? "Tillæg" : "Fradrag"

    return (
        <div className="p-4 bg-white sm:p-6 md:p-8 dark:bg-darkPrimarySupport rounded-3xl shadow-custom">
            <div className="mb-4">
                <h2 className="text-text dark:text-white font-large-normal">{name}</h2>
                <p className="opacity-50 text-text dark:text-white font-small-normal">Diverse {name.toLowerCase()}</p>
            </div>
            <div className="flex flex-col items-stretch justify-start gap-1">
                {list.map((item, index) => (
                    <div className="flex flex-row items-stretch gap-1" key={item.id}>
                        <Input onChange={(ev) => formChange?.(`${type}.${index}.name`, ev.target.value)} name={type + item.id} value={item.name} placeholder={`${name}-navn ${index + 1}`} type={"text"} />
                        <Input onChange={(ev) => formChange?.(`${type}.${index}.value`, parseFloat(ev.target.value))} name={type + item.id} value={item.value} placeholder={`${name} mængde`} type={"number"} />
                        <button className="w-full max-w-[68px] h-[68px] bg-error rounded-xl flex items-center justify-center" onClick={() => remove?.(item.id)}>
                            <MinusCircleIcon className="block w-5 h-5 text-white" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center w-full mt-4">
                <button className="flex items-center justify-center gap-2" onClick={add}>
                    <PlusCircleIcon className="block w-5 h-5 text-text dark:text-white" />
                    <span className="-mt-1 text-text dark:text-white">Tilføj {name.toLowerCase()}</span>
                </button>
            </div>
        </div>
    )
}

interface IPayrollForm {
    user?: IUser
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

    const inputHandler = (path: string, isNumber: boolean) => ({
        onChange: (ev: React.ChangeEvent<HTMLInputElement>) => {
            if (isNumber) {
                onFormChange?.(path, parseFloat(ev.target.value))
            } else {
                onFormChange?.(path, ev.target.value)
            }
        },
        value: _.get(payrollSetup, path),
    })

    const addSalaryChange = (type: "deduction" | "supplements") => {
        let list: Array<any> = ((payrollSetup as any) || {})[type as any] || []

        list.push({
            id: generateUuid(),
        })
        onFormChange?.(type, list)
    }

    const removeSalaryChange = (type: "deduction" | "supplements", id: number) => {
        let list: Array<CustomPayrollSupplement> = ((payrollSetup as any) || {})[type as any] || []

        list = list.filter((x) => x.id !== id)
        onFormChange?.(type, list)
    }

    return (
        <>
            <div className="p-4 bg-white sm:p-6 md:p-8 dark:bg-darkPrimarySupport rounded-3xl shadow-custom">
                <div className="mb-4">
                    <h2 className="text-text dark:text-white font-large-normal">Faste lønoplysninger</h2>
                    <p className="opacity-50 text-text dark:text-white font-small-normal">Medarbejderens faste lønoplysninger</p>
                </div>
                <div className="flex flex-col items-stretch justify-start gap-1">
                    {user?.salaryType === "salary" && (
                        <>
                            <Input {...inputHandler("wageInfo.standardHours", true)} name="normTime" placeholder="Normtimer" type="number" />
                            <Input {...inputHandler("wageInfo.salary", true)} name="gage" placeholder="Gage" type="number" />
                        </>
                    )}
                    {user?.salaryType === "hourly" && (
                        <>
                            <Input {...inputHandler("wageInfo.numberOfHours", true)} name="numberOfHours" placeholder="Antal timer" type="number" />
                            <Input {...inputHandler("wageInfo.hourlyWage", true)} name="hourlyPaid" placeholder="Individuel sats (Timeløn)" type="number" />
                        </>
                    )}
                    <Input {...inputHandler("wageInfo.personalAdditions", true)} name="personalAdditions" placeholder="Personligt tillæg" type="number" />
                    <Input {...inputHandler("wageInfo.taxDeduction", true)} name="taxDeduction" placeholder="Personligt skattefradrag" type="number" />
                </div>
            </div>
            <div className="p-4 bg-white sm:p-6 md:p-8 dark:bg-darkPrimarySupport rounded-3xl shadow-custom">
                <div className="mb-4">
                    <h2 className="text-text dark:text-white font-large-normal">Personalegoder</h2>
                    <p className="opacity-50 text-text dark:text-white font-small-normal">Mobil, Bil, Internet</p>
                </div>
                <div className="flex flex-col items-stretch justify-start gap-1">
                    <Input {...inputHandler("benefits.freeCar", true)} name="friBil" placeholder="Fri bil" type="number" />
                    <Input {...inputHandler("benefits.freeYearRoundResidence", true)} name="friHelaarsBolig" placeholder="Fri helårsbolig" type="number" />
                    <Input {...inputHandler("benefits.freeSummerResidence", true)} name="friSommerBolig" placeholder="Fri sommerbolig" type="number" />
                    <Input {...inputHandler("benefits.freeYacht", true)} name="friLystBaad" placeholder="Fri lystbåd" type="number" />
                    <Input {...inputHandler("benefits.freeMediaAndRadioLicense", true)} name="friMedieRadioLicens" placeholder="Fri medie-/radiolicens" type="number" />
                    <Input {...inputHandler("benefits.benefitsWithFloor", true)} name="personalegoderWithLimit" placeholder="Andre personalegoder med bundgrænse" type="number" />
                    <Input {...inputHandler("benefits.benefitsWithoutFloor", true)} name="personalegoderWithNoLimit" placeholder="Andre personalegoder uden bundgrænse" type="number" />
                    <Input {...inputHandler("benefits.freePhoneAndInternet", true)} name="friInternetMobil" placeholder="Fri telefon / internet" type="number" />
                    <Input {...inputHandler("benefits.freepassForPublicCarriage", true)} name="frikortOffentligBefordring" placeholder="Frikort til offentlig befordring" type="number" />
                    <Input {...inputHandler("benefits.healthInsurance", true)} name="sundhedsForsikring" placeholder="Sundhedsforsikring" type="number" />
                    <Input {...inputHandler("benefits.lunch", true)} name="lunch" placeholder="Frokost" type="number" />
                </div>
            </div>
            <SalaryListSupplementOrDeduction list={payrollSetup?.supplements || []} type="supplements" formChange={onFormChange} add={() => addSalaryChange("supplements")} remove={(id) => removeSalaryChange("supplements", id)} />
            <SalaryListSupplementOrDeduction list={payrollSetup?.deduction || []} type="deduction" formChange={onFormChange} add={() => addSalaryChange("deduction")} remove={(id) => removeSalaryChange("deduction", id)} />
        </>
    )
}

export default PaycheckForm
