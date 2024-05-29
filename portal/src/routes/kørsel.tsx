import DataTable from "../components/elements/DataTable"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"

const drivingData = {
    headers: ["ID #", "Dato", "Til", "Fra", "Km"],
    rows: [
        {
            "ID #": 1,
            Dato: "01-01-2021",
            Til: "Aarhus C",
            Fra: "Odder",
            Km: "31 KM",
        },
        {
            "ID #": 2,
            Dato: "01-01-2021",
            Til: "Aarhus C",
            Fra: "Odder",
            Km: "31 KM",
        },
        {
            "ID #": 3,
            Dato: "01-01-2021",
            Til: "Aarhus C",
            Fra: "Odder",
            Km: "31 KM",
        },
        {
            "ID #": 4,
            Dato: "01-01-2021",
            Til: "Aarhus C",
            Fra: "Odder",
            Km: "31 KM",
        },
    ],
}

const Drivingcompensation = () => {
    return (
        <ContentContainer>
            <div>
                <Header title="Din kørsel" />
            </div>
            <div className="">
                <DataTable title="Kørsel" tableData={drivingData} />
            </div>
        </ContentContainer>
    )
}

export default Drivingcompensation
