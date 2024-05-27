import _ from "lodash"
import React, { useRef, useState } from "react"
import { IUserAdd } from "../../../interfaces/user.interface"
import Button from "../components/elements/Button"
import Dropdown, { DropdownOption } from "../components/elements/Dropdown"
import Input from "../components/elements/Input"
import Header from "../components/globals/Header"
import { useAPI } from "../hooks/use-api"

type Props = {}

interface CoworkerSection {
  form?: IUserAdd
  title: string,
  undertitle?: string
  error?: string
  onChange: (path: string, value: any) => void
  fields: Array<{ placeholder: string, keyPath: string, name: string, type?: React.HTMLInputTypeAttribute | "boolean" | "dropdown", options?: Array<DropdownOption> }>,
  children?: React.ReactNode
}

const Section = ({ title, undertitle, form, onChange, fields, children }: CoworkerSection) => {

  const inputHandler = (keyPath: string) => ({
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => {
      onChange(keyPath, ev.target.value)
    },
    value: _.get(form, keyPath)
  })

  return <div className="p-8 bg-primarySupport rounded-3xl shadow-custom ">
    <div className="mb-4">
      <h2 className="text-white font-large-normal">{title}</h2>
      <p className="text-white opacity-50 font-small-normal">{undertitle}</p>
    </div>
    <div className="flex flex-col items-stretch justify-start gap-1">
      {fields.map(v => <React.Fragment key={v.name}>
        {v.type === "dropdown" && <Dropdown
          name={v.name}
          options={v.options || []}
          placeholder={v.placeholder}
          {...inputHandler(v.keyPath)}
          onChange={(v) => onChange?.(v.keyPath, v)}
        />}

        {!["dropdown", "boolean"].includes(v.type as any) && <Input
          type="text"
          {...v}
          {...inputHandler(v.keyPath)}
        />}
      </React.Fragment>)}
    </div>
    {children}
  </div>
}

const NewCoworker = (props: Props) => {
  const profileInputRef = useRef<HTMLInputElement>(null)

  const { create, error } = useAPI({ url: "/user", opts: { autoGet: false } })

  const [form, setForm] = useState<IUserAdd>({
    organizationRole: "user"
  })

  const formPathHandler = (path: keyof IUserAdd, onError?: string) => ({
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => {
      setForm(f => ({ ...f, [path]: ev.target.value }))
    },
    error: error?.path === path ? onError ?? "Noget gik galt" : undefined
  })

  const handleSectionOnChange = (path: string, value: any) => {
    setForm(f => {
      f = _.set(f, path, value)
      return f
    })
  }

  const handleOnSubmit = async () => {
    await create(form)
  }

  const handleProfileClick = () => {
    if (profileInputRef.current) {
      profileInputRef.current.click()
    }
  }

  return (
    <div className="relative flex max-w-full rounded-none grow bg-secondarySupport md:rounded-3xl dark:bg-white">
      <div className="relative flex flex-col max-w-full grow">
        <div className="px-6 pt-6 pb-10 md:p-12 2xl:px-10">
          <div className="">
            <Header history title="Ny Medarbejder" />
          </div>
          <div className="relative flex items-start justify-between gap-4">
            <div className="relative flex flex-col w-2/5 gap-4">
              <div className="p-8 bg-primarySupport rounded-3xl shadow-custom">
                <h2 className="mb-4 text-white font-large-normal">Medarbejder bilede</h2>
                <div>
                  <input type="file" ref={profileInputRef} className="hidden" />
                  <button onClick={() => handleProfileClick()} className="w-full h-[256px] gap-4 flex flex-col items-center justify-center border-2 border-dashed border-secondarySupport rounded-3xl">
                    <div className="bg-primaryLight h-[62px] w-[62px] rounded-full flex items-center justify-center">
                      <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14.9999 0.533325C22.9894 0.533325 29.4665 7.05012 29.4665 15.0886C29.4665 20.5706 26.4272 25.5115 21.6822 28.0018L21.3205 28.1897L21.0456 28.326L20.8155 28.4292L20.5893 28.5178C19.8725 28.7825 19.1755 28.8407 18.2391 28.7123C17.0515 28.5509 15.3418 27.5069 14.65 26.5237C14.5488 26.3795 14.4567 26.2353 14.3739 26.0884C13.9017 25.2574 13.7465 24.6382 13.7018 23.2964L13.6887 22.6745L13.686 22.3252L13.6847 12.9913L10.6691 16.0241C10.4324 16.2614 10.1148 16.3992 9.78084 16.4095C9.44686 16.4197 9.12152 16.3017 8.8709 16.0793C8.62027 15.857 8.46316 15.547 8.43148 15.2124C8.39979 14.8777 8.4959 14.5434 8.70029 14.2775L8.80945 14.1531L14.0701 8.86026C14.116 8.81391 14.1652 8.77101 14.2174 8.73191L14.3633 8.63664L14.5119 8.56651L14.65 8.5202L14.8052 8.48712L14.9223 8.47521L15.0985 8.47653L15.2629 8.49903L15.4089 8.5374L15.5549 8.59562L15.6824 8.66443L15.8205 8.76235L15.9284 8.85894L21.189 14.1518C21.4248 14.3899 21.5618 14.7094 21.572 15.0454C21.5822 15.3815 21.4649 15.7088 21.2439 15.961C21.0229 16.2131 20.7148 16.3712 20.3822 16.4031C20.0495 16.4349 19.7173 16.3382 19.453 16.1326L19.3293 16.0228L16.315 12.9913L16.3177 22.5541L16.3334 23.2687L16.3545 23.6392C16.3979 24.1962 16.486 24.4715 16.6583 24.7758C16.7012 24.8512 16.7477 24.9245 16.7977 24.9954C17.0686 25.3805 18.1286 26.0262 18.5915 26.0897C19.1229 26.1625 19.3925 26.14 19.6805 26.0328L19.8857 25.9468L20.4656 25.6531C24.3493 23.6167 26.8362 19.5756 26.8362 15.0886C26.8362 13.5247 26.5301 11.9761 25.9352 10.5313C25.3404 9.08642 24.4685 7.7736 23.3694 6.66776C22.2703 5.56192 20.9655 4.68472 19.5294 4.08625C18.0934 3.48777 16.5542 3.17974 14.9999 3.17974C13.4455 3.17974 11.9063 3.48777 10.4703 4.08625C9.03424 4.68472 7.7294 5.56192 6.6303 6.66776C5.53119 7.7736 4.65933 9.08642 4.0645 10.5313C3.46966 11.9761 3.16351 13.5247 3.16351 15.0886C3.16351 19.3903 5.44792 23.2898 9.083 25.4056C9.23619 25.4907 9.37098 25.6056 9.47948 25.7436C9.58798 25.8817 9.66801 26.0402 9.71488 26.2098C9.76175 26.3794 9.77452 26.5567 9.75245 26.7313C9.73037 26.9059 9.67388 27.0743 9.58631 27.2267C9.49873 27.3791 9.38181 27.5123 9.2424 27.6187C9.103 27.725 8.9439 27.8023 8.77444 27.846C8.60497 27.8897 8.42854 27.899 8.25547 27.8733C8.0824 27.8475 7.91618 27.7873 7.76654 27.6961C3.32658 25.1119 0.533203 20.3444 0.533203 15.0886C0.533203 7.05012 7.01033 0.533325 14.9999 0.533325Z"
                          fill="#252525"
                        />
                      </svg>
                    </div>
                    <p className="text-center text-white opacity-30 font-default font-light text-[14px] leading-5">
                      Mindst 800x800 px er anbefalet <br />
                      JPG / PNG er tilladte filtyper
                    </p>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-8 bg-primarySupport rounded-3xl shadow-custom ">
                <p className="text-white font-large-normal">Færdiggør tilføjelse</p>
                <Button onClick={handleOnSubmit} background="primaryLight" color="text">
                  Tilføj medarbejder
                </Button>
              </div>
            </div>
            <div className="relative flex flex-col w-3/5 h-full gap-4">
              <Section
                fields={[
                  { keyPath: "email", name: "email", placeholder: "E-mail" }
                ]}
                form={form}
                title="Bruger oplysninger"
                undertitle="Brugeroplysninger til at logge ind"
                onChange={handleSectionOnChange}
              >
                <div className="flex items-center justify-between mt-4">
                  <p className="text-white font-large-normal">Medarbejder rettigheder</p>
                  <div className=" min-w-[320px]">
                    <Dropdown
                      value={form.organizationRole}
                      name="organizationRole"
                      options={[{ value: "admin", label: "Administrator" }, { value: "user", label: "Medarbejder" }]}
                      onChange={v => setForm(f => ({ ...f, organizationRole: v }))}
                    />
                  </div>
                </div>
              </Section>
              <Section
                fields={[
                  { keyPath: "email", name: "email", placeholder: "E-mail" },
                  { keyPath: "firstName", name: "Fornavn", placeholder: "Fornavn" },
                  { keyPath: "lastName", name: "Efternavn", placeholder: "Efternavn" },
                  { keyPath: "CPR-nummer", name: "cpr", placeholder: "CPR-nummer" },
                  { keyPath: "phoneNumber", name: "phoneNumber", placeholder: "Telefon" }
                ]}
                form={form}
                title="Personlige oplysninger"
                undertitle="Personinformationer omkring medarbejderen"
                onChange={handleSectionOnChange}
              />
              <Section
                fields={[
                  { keyPath: "workerNumber", name: "workerNumber", placeholder: "Medarbejdernummer" },
                  { keyPath: "employmentDate", name: "employmentDate", placeholder: "Ansættelses dato" },
                  { keyPath: "resignationDate", name: "resignationDate", placeholder: "Fratrædelses dato" },
                  { keyPath: "position", name: "position", placeholder: "Stilling" }
                ]}
                form={form}
                title="Ansættelses oplysninger"
                undertitle="Medarbejders ansættelses oplysninger"
                onChange={handleSectionOnChange}
              />
              <Section
                fields={[
                  { keyPath: "bankRegistrationNumber", name: "bankRegistrationNumber", placeholder: "Reg. nr." },
                  { keyPath: "bankAccountNumber", name: "bankAccountNumber", placeholder: "Kontonummer" },
                ]}
                form={form}
                title="Konto oplysninger"
                undertitle="Medarbejders konto oplysninger"
                onChange={handleSectionOnChange}
              />
              <Section
                fields={[
                  { keyPath: "standardHours", name: "standardHours", placeholder: "Normtimer" },
                  { keyPath: "salary", name: "salary", placeholder: "Gage" },
                ]}
                form={form}
                title="Gage"
                undertitle="Medarbejders Gage"
                onChange={handleSectionOnChange}
              />
              <Section
                fields={[
                  { keyPath: "hourlyWage", name: "hourlyWage", placeholder: "Timeløn" },
                ]}
                form={form}
                title="Timeløn, individuel sats"
                undertitle="Medarbejder timeløn"
                onChange={handleSectionOnChange}
              />
              <Section
                fields={[
                  { keyPath: "ATP", name: "ATP", placeholder: "ATP-Ordning" },
                ]}
                form={form}
                title="Løn oplysninger"
                undertitle="Medarbejders løn oplysninger"
                onChange={handleSectionOnChange}
              />
              <Section
                fields={[
                  { keyPath: "vacation.scheme", name: "vacationScheme", placeholder: "Ferieordning" },
                  { keyPath: "vacation.recipient", name: "vacationRecipient", placeholder: "Feriepengemodtager" },
                  { keyPath: "vacation.eachYear", name: "vacationEachYear", placeholder: "Ferie pr. år" }
                ]}
                form={form}
                title="Ferie"
                undertitle="Medarbejders ferie oplysninger"
                onChange={handleSectionOnChange}
              />
              <Section
                fields={[
                  { keyPath: "pension.type", name: "Pension", placeholder: "Pension" },
                  { keyPath: "pension.ownContributionPercentage", name: "pensionOwnContributionPercentage", placeholder: "Eget bidrag %" },
                  { keyPath: "pension.ownAmount", name: "pensionOwnAmount", placeholder: "Eget beløb" },
                  { keyPath: "pension.companyContributionPercentage", name: "companyContribution", placeholder: "Firma bidrag %" },
                  { keyPath: "pension.companyAmount", name: "Firma beløb", placeholder: "Firma beløb" }
                ]}
                form={form}
                title="Almindelig pension"
                undertitle="Medarbejders almindelige pension"
                onChange={handleSectionOnChange}
              />
              <Section
                fields={[
                  { keyPath: "eIncome.enabled", type: "boolean", name: "eIncomeEnabled", placeholder: "Tilkoblet eIndkomst" },
                  { keyPath: "eIncome.productionUnit", name: "eIncomeProductionUnit", placeholder: "Produktionsenhed" },
                  { keyPath: "eIncome.incomeType", name: "eIncomeIncometype", placeholder: "Indkomsttype" }
                ]}
                form={form}
                title="eIndkomst"
                undertitle="Tilkoblet eIndkomst"
                onChange={handleSectionOnChange}
              />
              <Section
                fields={[
                  { keyPath: "workplacePension.institute", type: "dropdown", name: "pensionInstitute", placeholder: "Pensionsinstitut" },
                  { keyPath: "workplacePension.agreementCode", name: "pensionAgreementCode", placeholder: "Overenskomstkode" },
                  { keyPath: "workplacePension.ownContributionPercentage", name: "workplacePensionOwnContributionPercentage", placeholder: "Eget bidrag %" },
                  { keyPath: "workplacePension.ownAmount", name: "workplacePensionOwnAmount", placeholder: "Eget beløb" },
                  { keyPath: "workplacePension.companyContributionPercentage", name: "workplacePensionCompanyContribution", placeholder: "Firma bidrag %" },
                  { keyPath: "workplacePension.companyAmount", name: "workplacePensionCompanyAmount", placeholder: "Firma beløb" }
                ]}
                form={form}
                title="Arbejdsmarkeds pension"
                undertitle="Medarbejders anden pension"
                onChange={handleSectionOnChange}
              />

              {form.organizationRole === "user" && <>

              </>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewCoworker
