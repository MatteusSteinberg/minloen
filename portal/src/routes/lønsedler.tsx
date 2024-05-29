import DataTable from "../components/elements/DataTable"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"

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

const PaymentDocuments = () => {
    return (
        <ContentContainer>
            <div>
                <Header title="Lønsedler" />
            </div>
            <div className="">
                <DataTable title="Lønsedler" tableData={paycheckData} />
            </div>
        </ContentContainer>
    )
}

export default PaymentDocuments
