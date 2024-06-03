import { MapPinIcon } from "@heroicons/react/24/outline"
import _isArray from "lodash/isArray"
import _isEmpty from "lodash/isEmpty"
import _set from "lodash/set"
import { useState } from "react"
import { IUser } from "../../../../../interfaces/user.interface"
import TranImage from "../../../assets/images/jonas1.png"
import { useAuth } from "../../../hooks/use-auth"
import Input from "../../elements/Input"

interface IChangeProfile {
    handleClose: () => void
}

const ChangeProfile = ({ handleClose }: IChangeProfile) => {
    const { user, updateMe } = useAuth()
    const [form, setForm] = useState<Partial<IUser>>({})

    const handleOnSave = async () => {
        if (!_isEmpty(form)) {
            await updateMe(form)
            setForm({})
        }
    }

    console.log(form)

    const handleFormChange = (ev: any, path: string) => {
        const newValue = typeof ev === "string" || ev instanceof Date || _isArray(ev) ? ev : ev.target.value

        setForm((v) => {
            return { ..._set(v, path, newValue) }
        })
    }

    const handleOnCancel = () => {
        setForm({})
        handleClose()
    }

    return (
        <>
            <div className="flex flex-col items-start justify-start gap-[42px] w-full">
                <p className="font-h4">Ændre profil</p>
                <div className="flex flex-col items-start gap-4">
                    <p>Profil billede</p>
                    <div className="flex items-center gap-6">
                        <img src={TranImage} alt="ProfileImage" className="rounded-full w-28 h-28" />
                        <div className="flex flex-col justify-start gap-[8px]">
                            <button className="border-solid border-2 border-lightBorder dark:border-[rgb(52,56,57)] bg-transparent text-text dark:text-white font-standard-medium py-3 px-5 rounded-[14px] flex justify-center hover:bg-lightBorder dark:hover:bg-[rgb(52,56,57)] transition-colors duration-150">Upload billede</button>
                            <p className="font-normal text-text dark:text-white font-default text-[14px] leading-4 opacity-30">
                                mindst 800x800 px er anbefalet
                                <br />
                                JPG / PNG er tilladte filtyper
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <form className="flex flex-col gap-4" onSubmit={(ev) => ev.preventDefault()}>
                        <Input label="Lokation" value={form.address} defaultValue={user?.address} onChange={(e) => handleFormChange(e, "address")} type="address" name="address" placeholder="Lokation" icon={<MapPinIcon className="text-lightPrimary dark:text-darkBorder" />} />
                        <div className="flex items-center gap-4">
                            <Input label="By" value={form.city} defaultValue={user?.city} onChange={(e) => handleFormChange(e, "city")} type="address" name="city" placeholder="Lokation" />
                            <Input label="Postnummer" value={form.zipCode} defaultValue={user?.zipCode} onChange={(e) => handleFormChange(e, "zipCode")} type="address" name="zipCode" placeholder="Lokation" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex w-full gap-4">
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

export default ChangeProfile
