import DataTable from "../components/elements/DataTable"
import Box from "../components/globals/Box"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"
import CurrentPaycheck from "../components/layouts/overview/CurrentPaycheck"

const boxData = [
    {
        title: "Løn i alt",
        value: "127.812,34 DKK",
    },
    {
        title: "Sygedage / Fravær",
        value: "12",
    },
    {
        title: "Kørselsfradrag",
        value: "26",
    },
]

const paycheckData = {
    headers: ["ID #", "Dato", "Løn"],
    rows: [
        {
            "ID #": 1,
            Dato: "01-01-2021",
            Løn: "18.057",
        },
        {
            "ID #": 2,
            Dato: "01-01-2021",
            Løn: "18.057",
        },
        {
            "ID #": 3,
            Dato: "01-01-2021",
            Løn: "18.057",
        },
        {
            "ID #": 4,
            Dato: "01-01-2021",
            Løn: "18.057",
        },
    ],
}

const graphData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [65, 59, 72, 75, 52, 55],
}

const overview = () => {
    return (
        <ContentContainer>
            <div className="">
                <Header title="Hejsa Tobias!" />
            </div>
            <div>
                <p className="mb-2 text-text dark:text-white font-large-normal">Statistikker</p>
                <div className="grid grid-cols-3 grid-rows-1 gap-4 mb-12">
                    {boxData.map((data, index) => (
                        <Box graph title={data.title} graphData={graphData} value={data.value} />
                    ))}
                </div>
            </div>
            <div className="mt-12">
                <DataTable title="Lønsedler" tableData={paycheckData} />
            </div>
            <div className="mt-12">
                <p className="mb-2 text-text dark:text-white font-large-normal">Din seneste lønseddel</p>
                <CurrentPaycheck />
            </div>
        </ContentContainer>
    )
}

export default overview
