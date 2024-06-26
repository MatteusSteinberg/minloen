import { MapPinIcon } from "@heroicons/react/24/outline"
import _isArray from "lodash/isArray"
import _isEmpty from "lodash/isEmpty"
import _set from "lodash/set"
import { useRef, useState } from "react"
import { IUser } from "../../../../../interfaces/user.interface"
import { useAPI } from "../../../hooks/use-api"
import { useAuth } from "../../../hooks/use-auth"
import { compressImage } from "../../../lib/utils/imageCompressor"
import { profileImage } from "../../../lib/utils/profileImage"
import Input from "../../elements/Input"
import toast from 'react-hot-toast'

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

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { create, error } = useAPI({ url: "/user/profile/image", opts: { autoGet: false } })

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const form = new FormData()
    if (file) {
      const compressedFile = await compressImage({ file, quality: 0.8, maxHeight: 200, maxWidth: 200 })
      if (compressedFile.size > 300 * 1000) {
        toast.error("Billedet er for stort")
        return
      }

      form.append("image", compressedFile)

      await create(form)

      if (error) {
        toast.error(error)
      }
    }
  }
  return (
    <>
      <div className="flex flex-col items-start justify-start gap-[42px] w-full">
        <p className="font-h4">Ændre profil</p>
        <div className="flex flex-col items-start gap-4">
          <p>Profil billede</p>
          <div className="flex flex-col gap-6 sm:items-center sm:flex-row">
            <img src={profileImage({ userId: user?._id })} alt="ProfileImage" className="rounded-full w-28 h-28" />
            <div className="flex flex-col justify-start gap-[8px]">
              <button onClick={handleButtonClick} className="border-solid border-2 border-lightBorder dark:border-[rgb(52,56,57)] bg-transparent text-text dark:text-white font-standard-medium py-3 px-5 rounded-[14px] flex justify-center hover:bg-lightBorder dark:hover:bg-[rgb(52,56,57)] transition-colors duration-150">
                Upload billede
              </button>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
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
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Input label="By" value={form.city} defaultValue={user?.city} onChange={(e) => handleFormChange(e, "city")} type="address" name="city" placeholder="Lokation" />
              <Input label="Postnummer" value={form.zipCode} defaultValue={user?.zipCode} onChange={(e) => handleFormChange(e, "zipCode")} type="address" name="zipCode" placeholder="Lokation" />
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 sm:flex-row">
        <button type="submit" className="w-full py-5 text-white bg-lightPrimary dark:bg-darkPrimaryLight dark:text-text rounded-2xl" onClick={handleOnSave}>
          Gem ændringer
        </button>
        <button className="w-full py-5 text-white bg-text dark:bg-gradientmain rounded-2xl" onClick={handleOnCancel}>
          Annuller
        </button>
      </div>
    </>
  )
}

export default ChangeProfile
