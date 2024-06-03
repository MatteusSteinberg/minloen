import { BuildingOfficeIcon, LockClosedIcon, Square2StackIcon, UserIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IOrganizationRegister } from "../../../../../interfaces/organization.interface"
import { useAPI } from "../../../hooks/use-api"
import { useAuth } from "../../../hooks/use-auth"
import { Svg } from "../../../svgs"
import Button from "../../elements/Button"
import Input from "../../elements/Input"

type Props = {}

const Form = (props: Props) => {
    const { authenticate } = useAuth()
    const [form, setForm] = useState<IOrganizationRegister>({})
    const navigate = useNavigate()

    const { create, error } = useAPI({ url: "/organization/register", opts: { autoGet: false } })

    const formPathHandler = (path: keyof IOrganizationRegister, onError: string) => ({
        onChange: (ev: React.ChangeEvent<HTMLInputElement>) => {
            setForm((f) => ({ ...f, [path]: ev.target.value }))
        },
        error: error?.path === path ? onError : undefined,
    })

    const onSubmit = async () => {
        const result = await create(form)
        if (!result.error) {
            await authenticate(form?.adminEmail || "", form.password || "")
            navigate("/overblik")
        }
    }

    return (
        <div className="w-full min-h-dvh sm:min-h-[calc(100vh-48px)] inline-flex items-center justify-center flex-col sm:rounded-3xl lg:mr-6 bg-lightSecondary dark:bg-darkSecondarySupport p-4 sm:p-12 relative">
            <div className="max-w-[500px] w-full h-full flex flex-col gap-8 relative my-12 sm:my-0">
                <div className="mx-auto">
                    <Svg.Logo />
                </div>
                <form>
                    <div className="mb-3">
                        <Input {...formPathHandler("name", "Virksomhedsnavn er påkrævet")} name="companyName" type="text" label="Virksomhedsnavn" icon={<BuildingOfficeIcon className="text-lightPrimary dark:text-white" />} placeholder="Virksomhed ApS..." />
                    </div>
                    <div className="mb-3">
                        <Input {...formPathHandler("cvr", "Venligst indtast et legitimt CVR-nummer")} name="cvr" type="text" label="CVR" icon={<Square2StackIcon className="text-lightPrimary dark:text-white" />} placeholder="1234..." />
                    </div>
                    <div className="items-start justify-between gap-2 mb-3 sm:flex">
                        <Input {...formPathHandler("firstName", "Fornavn er påkrævet")} name="firstName" type="text" label="Fornavn" placeholder="John..." />
                        <Input {...formPathHandler("lastName", "Efternavn er påkrævet")} name="lastName" type="text" label="Efternavn" placeholder="Doe..." />
                    </div>
                    <div className="mb-3">
                        <Input {...formPathHandler("adminEmail", "Venligst indtast en legitimt e-mail")} name="adminEmail" type="email" label="Administrator E-mail" icon={<UserIcon className="text-lightPrimary dark:text-white" />} placeholder="AnneAnnesen@outlook.dk" />
                    </div>
                    <div className="items-start justify-between gap-2 mb-3 sm:flex">
                        <Input {...formPathHandler("password", "Kodeord skal være mindst 8 karaktere, have bogstaver, tal og specialtegn.")} name="password" type="password" label="Adgangskode" icon={<LockClosedIcon className="text-lightPrimary dark:text-white" />} placeholder="1234..." />
                        <Input {...formPathHandler("passwordRepeat", "Kodeord skal være ens")} name="confirmPassword" type="password" label="Bekræft adgangskode" icon={<LockClosedIcon className="text-lightPrimary dark:text-white" />} placeholder="1234..." />
                    </div>
                    <div className="flex justify-center mt-8">
                        <Button onClick={onSubmit} background="primaryLight" color="text">
                            Registrer
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form
