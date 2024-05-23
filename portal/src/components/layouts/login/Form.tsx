import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../../hooks/use-auth"
import { Svg } from "../../../svgs"
import Button from "../../elements/Button"
import Input from "../../elements/Input"

type Props = {}

const Form = (props: Props) => {

  const { authenticate } = useAuth()
  const [form, setForm] = useState<{ email?: string, password?: string }>({})

  const updateForm = (path: "email" | "password") => (ev: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [path]: ev.target.value }))
  }

  const onSubmit = async () => {
    await authenticate(form?.email || "", form.password || "")
  }

  return (
    <div className="w-full min-h-dvh sm:min-h-[calc(100vh-48px)] inline-flex items-center justify-center flex-col sm:rounded-3xl lg:mr-6 bg-secondarySupport p-4 sm:p-12 relative">
      <div className="max-w-[500px] w-full h-full flex flex-col gap-8 relative mb-44">
        <div className="mx-auto">
          <Svg.Logo />
        </div>
        <form>
          <div className="mb-2">
            <Input onChange={updateForm("email")} name="e-mail" type="email" label="E-mail" icon={<UserIcon />} placeholder="AnneAnnesen@outlook.dk" />
          </div>
          <div className="mb-2">
            <Input onChange={updateForm("password")} name="password" type="password" label="Password" icon={<LockClosedIcon />} placeholder="1234..." />
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
          <div className="w-full bg-primarySupport rounded-[22px] p-6 relative">
            <p className="font-small-medium text-primaryLight">Har du ikke et login?</p>
            <p className="text-white pt-[10px] font-medium-medium max-w-[350px]">Kontakt din administrator for at blive inviteret</p>
          </div>
          <Link to="/register" className="w-full bg-primarySupport rounded-[22px] p-6 relative">
            <p className="font-small-medium text-primaryLight">Er du en virksomhed?</p>
            <p className="text-white pt-[10px] font-medium-medium max-w-[300px]">Klik her for at registrere dig som Virksomhed</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Form
