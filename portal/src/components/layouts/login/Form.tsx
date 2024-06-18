import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/use-auth"
import { Svg } from "../../../svgs"
import Button from "../../elements/Button"
import Input from "../../elements/Input"

type Props = {}

const Form = (props: Props) => {
  const { authenticate } = useAuth()
  const [form, setForm] = useState<{ email?: string; password?: string }>({})
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const updateForm = (path: "email" | "password") => (ev: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [path]: ev.target.value }))
    if (error) {
      setError(false)
    }
  }

  const onSubmit = async () => {
    const { error } = await authenticate(form?.email || "", form.password || "")

    if (error) {
      setError(true)
    }

    if (!error) {
      navigate("/overblik", { replace: true })
    }
  }

  return (
    <div className="w-full min-h-dvh sm:min-h-[calc(100vh-48px)] inline-flex items-center justify-center flex-col sm:rounded-3xl lg:mr-6 bg-lightSecondary dark:bg-darkSecondarySupport p-4 sm:p-12 relative">
      <div className="max-w-[500px] w-full h-full flex flex-col gap-8 relative mb-44">
        <div className="mx-auto">
          <Svg.Logo />
        </div>
        <form>
          <div className="mb-2">
            <Input error={error ? " " : ""} onChange={updateForm("email")} name="e-mail" type="email" label="E-mail" icon={<UserIcon className="text-lightPrimary dark:text-white" />} placeholder="AnneAnnesen@outlook.dk" />
          </div>
          <div className="mb-2">
            <Input error={error ? "Forkert e-mail eller kodeord" : ""} onChange={updateForm("password")} name="password" type="password" label="Password" icon={<LockClosedIcon className="text-lightPrimary dark:text-white" />} placeholder="1234..." />
          </div>
          <div className="flex justify-center">
            <Button onClick={onSubmit} background="primaryLight" color="text">
              Log ind
            </Button>
          </div>
        </form>
      </div>
      <div className="absolute bottom-3 sm:bottom-6 max-w-[calc(100%-16px)] sm:max-w-[calc(100%-48px)] w-full">
        <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row lg:flex-col xl:flex-row xl:gap-7">
          <div className="w-full bg-white dark:bg-darkPrimarySupport border-lightBorder border border-solid shadow-custom rounded-[22px] p-6 relative">
            <p className="font-small-medium text-lightPrimary dark:text-darkPrimaryLight">Har du ikke et login?</p>
            <p className="text-text dark:text-white pt-[10px] font-medium-medium max-w-[350px]">Kontakt din administrator for at blive inviteret</p>
          </div>
          <Link to="/signup" className="w-full bg-white dark:bg-darkPrimarySupport border-lightBorder border border-solid shadow-custom rounded-[22px] p-6 relative">
            <p className="font-small-medium text-lightPrimary dark:text-darkPrimaryLight">Er du en virksomhed?</p>
            <p className="text-text dark:text-white pt-[10px] font-medium-medium max-w-[300px]">Klik her for at registrere dig som Virksomhed</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Form
