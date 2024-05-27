import TranImage from "../assets/images/jonas1.png"
import DataTable from "../components/elements/DataTable"
import ContentContainer from "../components/globals/ContentContainer"
import Header from "../components/globals/Header"

const coworkersData = {
    headers: ["ID #", "Billede", "Navn", "Stilling", "Email", "Løn"],
    rows: [
        {
            "ID #": 1,
            Billede: TranImage,
            Navn: "Tobias Thien Tran",
            Stilling: "IT Support Elev",
            Email: "ttt@flc.dk",
            Løn: "18.057",
        },
        {
            "ID #": 2,
            Billede: TranImage,
            Navn: "Tobias Thien Tran",
            Stilling: "IT Support Elev",
            Email: "ttt@flc.dk",
            Løn: "18.057",
        },
        {
            "ID #": 3,
            Billede: TranImage,
            Navn: "Tobias Thien Tran",
            Stilling: "IT Support Elev",
            Email: "ttt@flc.dk",
            Løn: "18.057",
        },
        {
            "ID #": 4,
            Billede: TranImage,
            Navn: "Tobias Thien Tran",
            Stilling: "IT Support Elev",
            Email: "ttt@flc.dk",
            Løn: "18.057",
        },
        {
            "ID #": 5,
            Billede: TranImage,
            Navn: "Tobias Thien Tran",
            Stilling: "IT Support Elev",
            Email: "ttt@flc.dk",
            Løn: "18.057",
        },
        {
            "ID #": 6,
            Billede: TranImage,
            Navn: "Tobias Thien Tran",
            Stilling: "IT Support Elev",
            Email: "ttt@flc.dk",
            Løn: "18.057",
        },
        {
            "ID #": 7,
            Billede: TranImage,
            Navn: "Tobias Thien Tran",
            Stilling: "IT Support Elev",
            Email: "ttt@flc.dk",
            Løn: "18.057",
        },
        {
            "ID #": 8,
            Billede: TranImage,
            Navn: "Tobias Thien Tran",
            Stilling: "IT Support Elev",
            Email: "ttt@flc.dk",
            Løn: "18.057",
        },
    ],
}

const Coworkers = () => {
    return (
        <ContentContainer>
            <div className="">
                <Header title="Dine medarbejdere" />
            </div>
            <div className="">
                <DataTable title="Medarbejdere" actions tableData={coworkersData} button="/ny-medarbejder" />
            </div>
        </ContentContainer>
    )
}

export default Coworkers
