import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import DataTable from "../components/elements/DataTable"
import Header from "../components/globals/Header"
import Card from "../components/layouts/se-medarbejder/Card"

interface IAgreements {
    type: string
    icon: React.ReactNode
    title: string
    description: string
}

const agreementsData = [
    {
        type: "warning",
        icon: <ExclamationTriangleIcon className="w-5 h-5 text-[#FD9A52]" />,
        title: "Personen er timelønnet",
        description: "Denne medarbejder er oprettet som timelønnet",
    },
    {
        type: "approved",
        icon: <CheckIcon className="w-5 h-5 text-[#3D8545]" />,
        title: "Personen får ikke betalt ferie",
        description: "Denne medarbejder er ikke sat til at modtage betalt ferie",
    },
    {
        type: "approved",
        icon: <CheckIcon className="w-5 h-5 text-[#3D8545]" />,
        title: "Personen får pension",
        description: "Denne medarbejder modtager pension fra Velliv",
    },
]

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

const SeeCoworker = () => {
    return (
        <div className="relative flex max-w-full rounded-none grow bg-secondarySupport md:rounded-3xl dark:bg-white">
            <div className="relative flex flex-col max-w-full grow">
                <div className="px-6 pt-6 pb-10 md:p-12 2xl:px-10">
                    <div>
                        <Header title="Tobias Thien Tran" history />
                    </div>
                    <div className="flex items-center justify-between pb-3 mb-16 border-b border-solid border-border">
                        <div className="flex items-center justify-center gap-4">
                            <p className="text-white font-small-normal">Profil</p>
                            <p className="text-primaryLight font-small-normal">Medarbejder</p>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <button className="text-white font-small-normal">Opret fast lønseddel</button>
                            <button className="text-primaryLight font-small-normal">Opret tilpasset for kommende måned</button>
                        </div>
                    </div>
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col items-start w-full">
                            <p className="text-white font-large-semibold">Aftaler</p>
                            <p className="text-white opacity-30">Tilpassede medarbejder aftaler</p>
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            {agreementsData.map((agreement: IAgreements, index: number) => (
                                <Card key={index} {...agreement} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-between gap-4 mt-16">
                        <DataTable tableData={coworkersData} />
                        <DataTable tableData={coworkersData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeeCoworker
