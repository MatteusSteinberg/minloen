import TranImage from "../assets/images/jonas1.png"
import DataTable from "../components/elements/DataTable"
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
        <div className="relative flex max-w-full rounded-none grow bg-secondarySupport md:rounded-3xl dark:bg-white">
            <div className="relative flex flex-col max-w-full grow">
                <div className="px-6 pt-6 pb-10 md:p-12 2xl:px-10">
                    <div className="">
                        <Header title="Dine medarbejdere" />
                    </div>
                    <div className="">
                        <DataTable title="Medarbejdere" actions tableData={coworkersData} button="/ny-medarbejder" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coworkers
