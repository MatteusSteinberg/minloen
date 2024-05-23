import { BuildingOfficeIcon, LockClosedIcon, Square2StackIcon, UserIcon } from "@heroicons/react/24/outline"
import { Svg } from "../../../svgs"
import Button from "../../elements/Button"
import Input from "../../elements/Input"

type Props = {}

const Form = (props: Props) => {
  return (
    <div className="w-full min-h-dvh sm:min-h-[calc(100vh-48px)] inline-flex items-center justify-center flex-col sm:rounded-3xl lg:mr-6 bg-secondarySupport p-4 sm:p-12 relative">
      <div className="max-w-[500px] w-full h-full flex flex-col gap-8 relative my-12 sm:my-0">
        <div className="mx-auto">
          <Svg.Logo />
        </div>
        <form>
          <div className="mb-2">
            <Input name="companyName" type="text" label="Virksomhedsnavn" icon={<BuildingOfficeIcon />} placeholder="Virksomhed ApS..." />
          </div>
          <div className="mb-2">
            <Input name="cvr" type="text" label="CVR" icon={<Square2StackIcon />} placeholder="1234..." />
          </div>
          <div className="items-start justify-between gap-2 mb-2 sm:flex">
            <Input name="firstName" type="text" label="Fornavn" placeholder="John..." />
            <Input name="lastName" type="text" label="Efternavn" placeholder="Doe..." />
          </div>
          <div className="mb-2">
            <Input name="adminEmail" type="email" label="Administrator E-mail" icon={<UserIcon />} placeholder="AnneAnnesen@outlook.dk" />
          </div>
          <div className="items-start justify-between gap-2 mb-2 sm:flex">
            <Input name="password" type="password" label="Adgangskode" icon={<LockClosedIcon />} placeholder="1234..." />
            <Input name="confirmPassword" type="password" label="Bekræft adgangskode" icon={<LockClosedIcon />} placeholder="1234..." />
          </div>
          <div className="flex justify-center">
            <Button background="primaryLight" color="text">
              Registrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
