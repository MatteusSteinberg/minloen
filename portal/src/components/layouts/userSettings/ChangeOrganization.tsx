import { BuildingOfficeIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import _ from "lodash"
import { useState } from "react"
import { useSet } from "react-use"
import { IOrganization } from "../../../../../interfaces/organization.interface"
import { useAuth } from "../../../hooks/use-auth"
import Input from "../../elements/Input"

interface IChangeOrganization {
  handleClose: () => void
}

const ChangeOrganization = ({ handleClose }: IChangeOrganization) => {
  const { organization, updateOrganization } = useAuth()
  const [form, setForm] = useState<Partial<IOrganization>>({})
  const [edited, { has, reset, add }] = useSet<string>()
  const [error, setError] = useState<any>()

  const formPathHandler = (path: keyof IOrganization, onError: string) => ({
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => {
      add(path)
      setForm((f) => ({ ...f, [path]: ev.target.value }))
    },
    value: has(path) ? _.get(form, path) : _.get(organization, path),
    error: error?.path === path ? onError : undefined,
  })

  const handleSubmit = async () => {
    const res = await updateOrganization({
      ...organization,
      ..._.pick(form, Array.from(edited))
    })
    if (res.error) {
      setError(res.error)
    }
    else {
      setForm({})
      reset()
    }
  }

  const handleOnCancel = () => {
    setForm({})
    reset()
    handleClose?.()
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-[42px] w-full">
        <p className="font-h4">Virksomhed</p>
        <div className="flex flex-col w-full gap-4">
          <Input
            {...formPathHandler("name", "Virksomheds navn er påkrævet")}
            label="Navn"
            placeholder="Virksomhed ApS"
            name="company"
            icon={<BuildingOfficeIcon className="text-lightPrimary dark:text-darkBorder" />}
          />
          <Input {...formPathHandler("cvr", "CVR er påkrævet")}
            label="CVR" placeholder="CVR"
            name="cvr"
            icon={<LockClosedIcon className="text-lightPrimary dark:text-darkBorder" />}
          />
          <Input
            {...formPathHandler("address", "")}
            label="Firma adresse"
            placeholder="Adresse..."
            name="address"
            icon={<LockClosedIcon className="text-lightPrimary dark:text-darkBorder" />}
          />
          <Input
            {...formPathHandler("zipCode", "")}
            label="Post nummer"
            placeholder="Post nr."
            name="zipCode"
            icon={<LockClosedIcon className="text-lightPrimary dark:text-darkBorder" />}
          />

        </div>
      </div>
      <div className="flex flex-col w-full gap-4 sm:flex-row">
        <button type="submit" className="w-full py-5 text-white bg-lightPrimary dark:bg-darkPrimaryLight dark:text-text rounded-2xl" onClick={handleSubmit}>
          Gem ændringer
        </button>
        <button className="w-full py-5 text-white bg-text dark:bg-gradientmain rounded-2xl" onClick={handleOnCancel}>
          Annuller
        </button>
      </div>
    </>
  )
}

export default ChangeOrganization
