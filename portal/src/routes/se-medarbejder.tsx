import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { IUser } from "../../../interfaces/user.interface"
import DataTable from "../components/elements/DataTable"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"
import Card from "../components/layouts/se-medarbejder/Card"
import Options from "../components/layouts/se-medarbejder/Options"
import SalaryTable from "../components/tables/SalaryTable"
import { useAPI } from "../hooks/use-api"
import { workplacePensionInstitues } from "./ny-medarbejder"

interface IAgreements {
  type: string
  icon: React.ReactNode
  title: string
  description: string
}

const coworkersData = {
  headers: ["ID #", "Dato", "Til udbetaling"],
  rows: [
    {
      "ID #": 1,
      Dato: "15/01/2024",
      "Til udbetaling": "18.057",
    },
    {
      "ID #": 2,
      Dato: "15/01/2024",
      "Til udbetaling": "18.057",
    },
    {
      "ID #": 3,
      Dato: "15/01/2024",
      "Til udbetaling": "18.057",
    },
    {
      "ID #": 4,
      Dato: "15/01/2024",
      "Til udbetaling": "18.057",
    },
    {
      "ID #": 5,
      Dato: "15/01/2024",
      "Til udbetaling": "18.057",
    },
    {
      "ID #": 6,
      Dato: "15/01/2024",
      "Til udbetaling": "18.057",
    },
  ],
}

const WarningIcon = <ExclamationTriangleIcon className="w-5 h-5 text-[#FD9A52]" />
const SuccessIcon = <CheckIcon className="w-5 h-5 text-[#3D8545]" />

const SeeCoworker = () => {
  const { id } = useParams()

  const { data } = useAPI<IUser>({ url: "/user", id })

  const agreements = useMemo(() => {
    const agreementDictionaries = {
      salaryType: {
        hourly: {
          title: "Personen er timelønnet",
          description: "Denne medarbejder er oprettet som timelønnet",
        },
        salary: {
          title: "Personen er fastlønnet",
          description: "Denne medarbejder er oprettet til at modtage gage",
        },
      } as any,
      workplacePension: {} as any,
      vacation: {
        vacationSavings: {
          title: `${data?.name} har ferie opsparing`,
          description: "Denne medarbejder er sat til at modtage ferie opsparing",
        },
        vacationWithPay: {
          title: `${data?.name} har ferie med løn`,
          description: "Denne medarbejder er sat at få modtage ferie med løn",
        },
      } as any,
      paymentArrangement: {
        ahead: {
          title: `${data?.name} får løn måneden forud`,
          description: `Betales måneden forud`,
        },
        behind: {
          title: `${data?.name} får løn måneden bagud`,
          description: `Betales måneden bagud`,
        },
      } as any,
    }

    return [
      {
        type: data?.salaryType ? "approved" : "warning",
        icon: data?.salaryType ? SuccessIcon : WarningIcon,
        title: data?.salaryType ? agreementDictionaries.salaryType[data.salaryType].title : `${data?.name} modtager ikke løn`,
        description: data?.salaryType ? agreementDictionaries.salaryType[data.salaryType].description : `Denne medarbejder ikke sat til at modtage løn`,
      },
      {
        type: !!data?.vacation?.scheme ? "approved" : "warning",
        icon: !!data?.vacation?.scheme ? SuccessIcon : WarningIcon,
        title: !!data?.vacation?.scheme ? agreementDictionaries.vacation[data?.vacation?.scheme].title : "Personen får ikke betalt ferie",
        description: !!data?.vacation?.scheme ? agreementDictionaries.vacation[data?.vacation?.scheme].description : "Denne medarbejder er ikke sat til at modtage betalt ferie",
      },
      {
        type: !!data?.workplacePension?.institute ? "approved" : "warning",
        icon: !!data?.workplacePension?.institute ? SuccessIcon : WarningIcon,
        title: !!data?.workplacePension?.institute ? "Personen får pension" : "Personen får ikke pension",
        description: !!data?.workplacePension?.institute ? `Denne medarbejder modtager pension fra ${workplacePensionInstitues.find((x) => x.value === data?.workplacePension?.institute)?.label ?? `Ukendt ${data?.workplacePension?.institute}`}` : "Denne medarbejder modtager ikke pension",
      },
      {
        type: !!data?.paymentArrangement ? "approved" : "warning",
        icon: !!data?.paymentArrangement ? SuccessIcon : WarningIcon,
        title: !!data?.paymentArrangement ? agreementDictionaries.paymentArrangement[data?.paymentArrangement].title : "Personen mangler en betalingsordning",
        description: !!data?.paymentArrangement ? agreementDictionaries.paymentArrangement[data?.paymentArrangement].description : "Denne medarbejder har ikke fået opsat en betalingsordning til sin løn",
      },
    ]
  }, [data])

  return (
    <ContentContainer>
      <div>
        <Header title={data?.name ?? ""} history="/medarbejdere" />
      </div>
      <Options canCreatePayroll={!!data?.salaryType} />
      <div className="flex flex-col items-start justify-between gap-4 xxl:gap-0 xxl:flex-row">
        <div className="flex flex-col items-start w-full">
          <p className="text-text dark:text-white font-large-semibold">Aftaler</p>
          <p className="text-text dark:text-white opacity-30">Tilpassede medarbejder aftaler</p>
        </div>
        <div className="flex flex-col w-full gap-3">
          {agreements.map((agreement: IAgreements, index: number) => (
            <Card userId={id} key={index} {...agreement} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 mt-16">
        <SalaryTable userId={id} withAction />
        <DataTable title="Kørsel" tableData={coworkersData} />
      </div>
    </ContentContainer>
  )
}

export default SeeCoworker
