import { LockClosedIcon } from "@heroicons/react/24/outline"
import _set from "lodash/set"
import { useState } from "react"
import { IUser } from "../../../../../interfaces/user.interface"
import { useAuth } from "../../../hooks/use-auth"
import Input from "../../elements/Input"

interface IChangePassword {
    handleClose: () => void
}

const ChangePassword = ({ handleClose }: IChangePassword) => {
    const { user, updateMe } = useAuth()
    const [form, setForm] = useState<Partial<IUser> & { currentPassword?: string; repeatPassword?: string }>({})

    const handleFormChange = (ev: any, path: string) => {
        const value = typeof ev === "string" ? ev : ev.target.value
        setForm((f) => {
            const newForm = _set(f, path, value)
            return { ...newForm }
        })
    }

    const handleOnSave = async () => {
        if (form.password && (samePassword || passwordLength)) {
            return
        }
        if (form.password) {
            const result = await updateMe(form)
            if (result.error) {
                console.log(result.error)
                return
            }
        } else {
            updateMe(form)
        }
        setForm({})
    }

    const handleOnCancel = () => {
        setForm({})
        handleClose()
    }

    const samePassword = form.password !== form.repeatPassword ? "Adgangskode er ikke ens" : undefined
    const passwordLength = (form.password || "").length < 8 && !!form.password ? "Minimum 8 tegn" : undefined

    console.log(form)

    return (
        <>
            <div className="flex flex-col items-start justify-start gap-[42px] w-full">
                <p className="font-h4">Skift password</p>
                <div className="flex flex-col w-full gap-4">
                    <Input value={form.currentPassword} onChange={(ev) => handleFormChange(ev, "currentPassword")} label="Password" placeholder="Nuværende password" name="password" icon={<LockClosedIcon className="text-lightPrimary dark:text-darkBorder" />} />
                    <Input value={form.password} error={samePassword || passwordLength} onChange={(ev) => handleFormChange(ev, "password")} label="Nyt password" placeholder="Nye password" name="newPassword" icon={<LockClosedIcon className="text-lightPrimary dark:text-darkBorder" />} />
                    <Input value={form.repeatPassword} onChange={(ev) => handleFormChange(ev, "repeatPassword")} label="Bekræft password" placeholder="Bekræft" name="confirmPassword" icon={<LockClosedIcon className="text-lightPrimary dark:text-darkBorder" />} />
                </div>
            </div>
            <div className="flex flex-col w-full gap-4 sm:flex-row">
                <button type="submit" className="w-full py-5 text-white bg-lightPrimary dark:bg-darkPrimaryLight dark:text-text rounded-2xl" onClick={handleOnSave}>
                    Gem ændringer
                </button>
                <button className="w-full py-5 text-white bg-text dark:bg-gradientmain rounded-2xl" onClick={handleOnCancel}>
                    Anuller
                </button>
            </div>
        </>
    )
}

export default ChangePassword
